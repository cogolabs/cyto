/* @flow */
/**
 * renderDependency.js
 * Written by: Connor Taylor
 */
import path from 'path';

import loadTemplate from '../../template/loadTemplate';

import renderString from '../../utils/render/renderString';

/**
 * Loads the file contents referred to by dep and renders them. Returns an
 * object where the key is content output path and the value is the rendered
 * contents.
 *
 * @param {Array} dep - The dependency to render
 * @param {string} outputRoot - Where to write the rendered content
 * @param {Object} args - Args for the renderer to use
 */
export default async function renderDependency(dep, outputRoot, args, options) {
  const [name, templateId, isRuntimeDep] = dep;
  const outputPath = isRuntimeDep && options.skipRuntimeRendering
   ? path.join(outputRoot, name)
   : await renderString(
      path.join(outputRoot, name),
      args,
    );

  const template = loadTemplate(templateId);

  const contents = template[name]
    ? await renderString(template[name], args)
    : '';

  return { [outputPath]: contents };
}
