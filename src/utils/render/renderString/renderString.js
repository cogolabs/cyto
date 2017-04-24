/* @flow */
/**
 * renderString.js
 * Written by: Connor Taylor
 */
import mustache from '../../mustache';

import loadCytoConfig from '../../../configs/loadCytoConfig';
import generateTemplate from '../../../template/generateTemplate';
import types from '../../types';
import log from '../../log';

/**
 * Description of renderString
 *
 */
export default function renderString(str, args) {
  mustache.escape = (text) => text; // Don't escape html

  const renderPartial = async (partialString, context) => {
    const tokens = partialString.split(' ').filter((s) => s.trim());
    if (tokens.length > 2 || tokens.length === 0) {
      log.fatal('Partial string is invalid');
    } else if (tokens.length === 1) {
      if (context.id) {
        tokens.push(context.id);
      } else {
        log.fatal('Partial string is invalid');
      }
    }

    const [templateId, id] = tokens;
    const cytoConfig = loadCytoConfig(templateId);

    if (!types.isPartial(cytoConfig)) {
      log.fatal(`${templateId} is not a partial!`);
    }

    const generatedPartial = await generateTemplate({
      templateId,
      args: { ...context, id },
      outputRoot: '',
    });

    return Object.keys(generatedPartial).reduce((s, k) => {
      return `${s}${generatedPartial[k]}`;
    }, '');
  };

  return mustache.render(str, args, renderPartial);
}
