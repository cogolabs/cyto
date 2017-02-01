/* @flow */
/**
 * renderDependency.js
 * Written by: Connor Taylor
 */
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

import loadTemplate from '../../template/loadTemplate';

import renderString from '../../utils/render/renderString';
import log from '../../utils/log';

/**
 * Renders the file that a dependency refers to and write it to the desired
 * output path.
 *
 * @param {Array} dep - The dependency to render
 * @param {string} outputRoot - Where to write the rendered content
 * @param {Object} args - Args for the renderer to use
 */
export default function renderDependency(dep, outputRoot, args, initialRoot) {
  const [name, templateId] = dep;
  const outputPath = renderString(
    path.join(outputRoot, name),
    args,
  );

  const relativePath = outputPath.replace(`${initialRoot}/`, '');
  log.info(`Writing ${chalk.green(relativePath)}`);

  const template = loadTemplate(templateId);

  const contents = template[name]
    ? renderString(template[name], args)
    : '';

  fs.writeFileSync(outputPath, contents);
}
