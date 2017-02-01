/* @flow */
/**
 * generateTemplate.js
 * Written by: Connor Taylor
 */
import path from 'path';
import mkdirp from 'mkdirp';
import chalk from 'chalk';

import formatTemplateString from '../formatTemplateString';

import getArgsForTemplate from '../../args/getArgsForTemplate';

import getRuntimeDependencies from '../../dependencies/getRuntimeDependencies';
import renderDependency from '../../dependencies/renderDependency';

import loadCytoConfig from '../../configs/loadCytoConfig';

import log from '../../utils/log';
import types from '../../utils/types';

type GenerateOptions = {
  templateString: string,
  args: string[],
  outputRoot: string,
};

/**
 * Driver for the template generation algorithm. The algorithm can be broken
 * down into these steps:
 *  1. Format the template string for consistency and error checking
 *  2. Load the cyto.config.js file for the given template
 *  3. Get the args for the template, prompting if necessary
 *  4. Create the output directory synchronously
 *  5. Get the set of dependencies after applying any function dependencies
 *  6. For each dependency:
 *    a. Recursive call generateTemplate if it's an object (template).
 *    b. Render and write to the filesystem if it's a string
 *
 * @param {object} options - Options to tweak the template generation
 * @returns {Promise} A promise that resolves once the template is generated
 */
export default async function generateTemplate(options: GenerateOptions) {
  const { templateString, args, initialRoot } = options;
  const templateId: string = formatTemplateString(templateString); // 1
  const cytoConfig = loadCytoConfig(templateId); // 2

  const outputRoot: string = cytoConfig.createDirectory
    ? path.join(options.outputRoot, args.id)
    : options.outputRoot;

  const relativePath = outputRoot.replace(`${initialRoot}/`, '');
  if (cytoConfig.createDirectory) {
    log.info(`Generating ${chalk.green(relativePath)}`);
  }

  const templateArgs = await getArgsForTemplate(cytoConfig, args); // 3
  mkdirp.sync(outputRoot); // 4

  const dependencies = getRuntimeDependencies(cytoConfig, templateArgs); // 5

  return new Promise((resolve) => {
    // Ensures that each dependency is generated / rendered synchronously
    const processDependencies = async ([dep, ...rest]) => {
      if (!dep) {
        resolve();
        return;
      }
      if (types.isObject(dep)) { // 6a
        await generateTemplate({
          templateString: dep.templateId,
          args: Object.assign(dep.args || {}, {
            id: dep.id,
            author: args.author,
          }),
          outputRoot,
          initialRoot,
        });
        processDependencies(rest);
      } else { // 6b
        renderDependency(dep, outputRoot, templateArgs, initialRoot);
        processDependencies(rest);
      }
    };

    processDependencies(dependencies); // 6
  });
}
