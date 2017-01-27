/* @flow */
/**
 * renderDependency.js
 * Written by: Connor Taylor
 */
import fs from 'fs';
import path from 'path';

import loadTemplate from '../../template/loadTemplate';

import renderString from '../../utils/render/renderString';

/**
 * Renders the file that a dependency refers to and write it to the desired
 * output path.
 *
 * @param {Array} dep - The dependency to render
 * @param {string} outputRoot - Where to write the rendered content
 * @param {Object} args - Args for the renderer to use
 */
export default function renderDependency(dep, outputRoot, args) {
  const [name, templateId] = dep;
  const outputPath = renderString(
    path.join(outputRoot, name),
    args,
  );

  const template = loadTemplate(templateId);
  console.log(template);

  const contents = renderString(template[name], args);

  fs.writeFileSync(outputPath, contents);
}
