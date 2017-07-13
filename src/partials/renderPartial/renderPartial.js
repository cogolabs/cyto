/**
 * renderPartial.js
 * Written by: Connor Taylor
 */
import loadGlobalConfig from '../../configs/loadGlobalConfig';
import loadCytoConfig from '../../configs/loadCytoConfig';
import isValidPartialTemplate from '../isValidPartialTemplate';
import parsePartialString from '../parsePartialString';

/* Handles rendering a partial inside of a dependency file. Checks to make sure
 * it's valid, then calls generateTemplate to get the generated contents.
 *
 */
const renderPartial = (generateTemplate) => {
  return async (partialString, context) => {
    const [templateId, id] = await parsePartialString(partialString, context);
    const cytoConfig = loadCytoConfig(templateId);

    if (!isValidPartialTemplate(cytoConfig)) {
      throw new Error(`${templateId} is not a valid partial. Valid partials must have exactly one string dependency`);
    }

    const generatedPartial = await generateTemplate({
      templateId,
      args: {
        ...context,
        author: loadGlobalConfig().author,
        isPartial: true,
        id,
      },
      outputRoot: '',
    });

    return Object.keys(generatedPartial).reduce((s, k) => {
      return `${s}${generatedPartial[k]}`;
    }, '');
  };
};

export default renderPartial;
