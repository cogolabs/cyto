/* @flow */
/**
 * renderString.js
 * Written by: Connor Taylor
 */
import mustache from '../../mustache';

import loadCytoConfig from '../../../configs/loadCytoConfig';
import generateTemplate from '../../../template/generateTemplate';
import types from '../../types';
import errors from '../../errors';

/**
 * Description of renderString
 *
 */
export default function renderString(str, args) {
  mustache.escape = (text) => text; // Don't escape html

  const renderPartial = async (partialString, context) => {
    const tokens = partialString.split(' ').filter((s) => s.trim());
    if (!tokens.length || tokens.length > 2) {
      errors.invalidPartial(partialString, '');
    } else if (tokens.length === 1) {
      if (context.id) {
        tokens.push(context.id);
      } else {
        errors.invalidPartial(partialString);
      }
    }

    const [templateId, id] = tokens;
    const cytoConfig = loadCytoConfig(templateId);

    if (!types.isPartial(cytoConfig)) {
      errors.invalidPartial(partialString, `${templateId} is not a partial!`);
    }

    const generatedPartial = await generateTemplate({
      templateId,
      args: { ...context, id, author: args.author },
      outputRoot: '',
    });

    return Object.keys(generatedPartial).reduce((s, k) => {
      return `${s}${generatedPartial[k]}`;
    }, '');
  };

  return mustache.render(str, args, renderPartial);
}
