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
import synchReduce from '../../utils/func/synchReduce';

type GenerateOptions = {
  templateId: string,
  args: string[],
  outputRoot: string,
};

/**
 * Driver for the entire template generation algorithm. The algorithm can be
 * broken down into these steps:
 *  1. Validate the given templateId
 *  2. Load the cyto.config.js file for the given template
 *  3. Get the args for the template, prompting if necessary
 *  4. Get the set of dependencies after applying any function dependencies
 *  5. For each dependency:
 *    a. Recursively call generateTemplate if it's an object (template).
 *    b. Render the dependency if it's an array
 *  6. Return the result of synchronously reducing all of a template's
 *     dependencies
 *
 * @param {object} options - Options to tweak the template generation
 * @returns {Promise} A promise that resolves with the generated template
 *    object. This has the filenames as keys and the file contents as values.
 */
export default async function generateTemplate(options: GenerateOptions) {
  const { templateId, args } = options;
  formatTemplateString(templateId); // 1
  const cytoConfig = loadCytoConfig(templateId); // 2

  const outputRoot = cytoConfig.options.createDirectory
    ? path.join(options.outputRoot, args.id)
    : options.outputRoot;

  log.info(`Generating ${chalk.green(templateId)} with id ${chalk.green(options.args.id)}`);

  const templateArgs = await getArgsForTemplate(cytoConfig, options.args); // 3
  const dependencies = getRuntimeDependencies(cytoConfig, templateArgs); // 4

  const processDependency = async (accum, dep) => { // 5
    if (types.isObject(dep)) { // 5a
      const generatedTemplate = await generateTemplate({
        templateId: dep.templateId,
        args: Object.assign(dep.args || {}, {
          author: templateArgs.author,
        }),
        outputRoot,
      });

      return { ...accum, ...generatedTemplate };
    }

    const renderedDep = await renderDependency( // 5b
      dep,
      outputRoot,
      templateArgs,
    );

    return { ...accum, ...renderedDep };
  };

  return synchReduce(dependencies, processDependency, {}); // 6
}
