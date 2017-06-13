/**
 * renderPartial.js
 * Written by: Connor Taylor
 */
import loadGlobalConfig from '../../configs/loadGlobalConfig';
import mustache from '../../utils/mustache';
import errors from '../../utils/errors';
import loadCytoConfig from '../../configs/loadCytoConfig';
import isValidPartialTemplate from '../isValidPartialTemplate';

/* Handles rendering a partial inside of a dependency file. Checks to make sure
 * it's valid, then calls generateTemplate to get the generated contents.
 *
 */
const renderPartial = (generateTemplate) => {
  return async (partialString, context) => {
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

    const [rawId, id] = tokens;
    const templateId = await mustache.render(rawId, context, renderPartial);
    const cytoConfig = loadCytoConfig(templateId);

    if (!isValidPartialTemplate(cytoConfig)) {
      errors.invalidPartial(partialString, `${templateId} is not a partial!`);
    }

    const generatedPartial = await generateTemplate({
      templateId,
      args: { ...context, id, author: loadGlobalConfig().author },
      outputRoot: '',
    });

    return Object.keys(generatedPartial).reduce((s, k) => {
      return `${s}${generatedPartial[k]}`;
    }, '');
  };
};

export default renderPartial;
