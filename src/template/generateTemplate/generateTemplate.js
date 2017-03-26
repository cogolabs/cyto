/* @flow */
/**
 * generateTemplate.js
 * Written by: Connor Taylor
 */
import path from 'path';
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
 *  4. Get the set of dependencies after applying any function dependencies
 *  5. For each dependency:
 *    a. Recursive call generateTemplate if it's an object (template).
 *    b. Render and write to the filesystem if it's a string
 *
 * @param {object} options - Options to tweak the template generation
 * @returns {Promise} A promise that resolves with the generated template
 *    object. This has the filenames as keys and the file contents as values.
 */
export default async function generateTemplate(options: GenerateOptions) {
  const { templateString, args } = options;
  const templateId: string = formatTemplateString(templateString); // 1
  const cytoConfig = loadCytoConfig(templateId); // 2

  const outputRoot: string = cytoConfig.createDirectory
    ? path.join(options.outputRoot, args.id)
    : options.outputRoot;

  if (cytoConfig.createDirectory) {
    log.info(`Generating ${chalk.green(outputRoot)}`);
  }

  const templateArgs = await getArgsForTemplate(cytoConfig, args); // 3
  const dependencies = getRuntimeDependencies(cytoConfig, templateArgs); // 4

  return new Promise((resolve) => {
    // Ensures that each dependency is generated / rendered in a synchronous
    // fashion (one after the other). We have to do this to prevent race
    // conditions when prompting the user for argument values
    const processDependencies = async (accum, [dep, ...rest]) => {
      if (!dep) {
        resolve(accum);
        return accum;
      }
      if (types.isObject(dep)) { // 5a
        const generatedTemplate = await generateTemplate({
          templateString: dep.templateId,
          args: Object.assign(dep.args || {}, {
            id: dep.id,
            author: args.author,
          }),
          outputRoot,
        });

        return processDependencies({ ...accum, ...generatedTemplate }, rest);
      }
      const renderedDep = await renderDependency( // 5b
        dep,
        outputRoot,
        templateArgs,
      );

      return processDependencies({ ...accum, ...renderedDep }, rest);
    };

    return processDependencies({}, dependencies); // 5
  });
}
