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

  const renderPartial = async (templateString, context) => {
    const cytoConfig = loadCytoConfig(templateString);

    if (!types.isPartial(cytoConfig)) {
      log.fatal(`${templateString} is not a partial!`);
    }

    const generatedPartial = await generateTemplate({
      templateString,
      args: context,
      outputRoot: '',
    });


    return Object.keys(generatedPartial).reduce((s, k) => {
      const contents = generatedPartial[k];

      return `${s}${contents}`;
    }, '');
  };

  return mustache.render(str, args, renderPartial);
}
