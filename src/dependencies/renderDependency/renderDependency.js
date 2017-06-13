/* @flow */
/**
 * renderDependency.js
 * Written by: Connor Taylor
 */
import path from 'path';

import mustache from '../../utils/mustache';
import loadTemplate from '../../template/loadTemplate';
import renderPartial from '../../partials/renderPartial';

/**
 * Loads the file contents referred to by dep and renders them. Returns an
 * object where the key is content output path and the value is the rendered
 * contents.
 *
 * @param {Object} options - Render options with 5 keys:
 *    @param {Array} dep - The dependency to render
 *    @param {string} outputRoot - Where to write the rendered content
 *    @param {Object} args - Args for the renderer to use
 *    @param {Object} options - The cyto config options
 *    @param {Function} generateTemplate - generateTemplate. This is passed as
 *      a parameter to avoid a circular dependency
 */
const renderDependency = async ({
  dependency,
  outputRoot,
  args,
  options,
  generateTemplate,
}) => {
  const [name, templateId, isRuntimeDep] = dependency;

  const partialHandler = renderPartial(generateTemplate);
  const outputPath = isRuntimeDep && options.skipRuntimeRendering
   ? path.join(outputRoot, name)
   : await mustache.render(
      path.join(outputRoot, name),
      args,
      partialHandler,
    );

  const template = loadTemplate(templateId);
  const contents = template[name]
    ? await mustache.render(template[name], args, partialHandler)
    : '';

  return { [outputPath]: contents };
};

export default renderDependency;
