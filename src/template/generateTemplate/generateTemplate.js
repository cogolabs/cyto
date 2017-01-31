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

import loadDependencies from '../../dependencies/loadDependencies';
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
  log.info(`Generating ${chalk.green(options.templateString)}
  - id ${chalk.green(options.args.id)}`);

  const { templateString, args } = options;
  const templateId: string = formatTemplateString(templateString); // 1
  const cytoConfig = loadCytoConfig(templateId); // 2
  const templateArgs = await getArgsForTemplate(cytoConfig, args); // 3
  const outputRoot: string = cytoConfig.createDirectory  // 4
    ? path.join(options.outputRoot, args.id)
    : options.outputRoot;
  mkdirp.sync(outputRoot);

  const dependencies = loadDependencies(cytoConfig, templateArgs); // 5
  const handleDeps = ([dep, ...rest]) => {
    if (!dep) {
      return;
    }
    if (types.isObject(dep)) { // 6a
      generateTemplate({
        templateString: dep.templateId,
        args: Object.assign(args, { id: dep.id }),
        outputRoot,
      });
      handleDeps(rest);
    } else { // 6b
      renderDependency(dep, outputRoot, templateArgs);
      handleDeps(rest);
    }
  };

  handleDeps(dependencies); // 6
}
