/* @flow */
/**
 * generateTemplate.js
 * Written by: Connor Taylor
 */
import path from 'path';

import getArgsForTemplate from '../../args/getArgsForTemplate';

import getRuntimeDependencies from '../../dependencies/getRuntimeDependencies';
import renderDependency from '../../dependencies/renderDependency';

import loadCytoConfig from '../../configs/loadCytoConfig';

import log from '../../utils/log';
import types from '../../utils/types';
import synchReduce from '../../utils/func/synchReduce';

/**
 * Driver for the entire template generation algorithm. The algorithm can be
 * broken down into these steps:
 *  1. Load the cyto.config.js file for the given template
 *  2. Get the args for the template, prompting if necessary
 *  3. Get the set of dependencies after applying any function dependencies
 *  4. For each dependency:
 *    a. Recursively call generateTemplate if it's an object (template).
 *    b. Render the dependency if it's an array
 *  5. Return the result of synchronously reducing all of a template's
 *     dependencies
 *
 * @param {object} options - Options to tweak the template generation
 * @returns {Promise} A promise that resolves with the generated template
 *    object. This has the filenames as keys and the file contents as values.
 */
export default async function generateTemplate(options) {
  const { templateId, args } = options;
  const cytoConfig = loadCytoConfig(templateId); // 1
  const outputRoot = cytoConfig.options.createDirectory
    ? path.join(options.outputRoot, args.id)
    : options.outputRoot;

  log.info(`Generating ${templateId} with id ${args.id}`);

  const templateArgs = await getArgsForTemplate(cytoConfig, args); // 2
  const dependencies = getRuntimeDependencies(cytoConfig, templateArgs); // 3

  const processDependency = async (accum, dependency) => { // 4
    if (types.isObject(dependency)) { // a
      const generatedTemplate = await generateTemplate({
        templateId: dependency.templateId,
        args: {
          ...dependency.args,
          author: templateArgs.author,
          isPartial: args.isPartial || false,
        },
        outputRoot,
      });

      return { ...accum, ...generatedTemplate };
    }

    const renderedDep = await renderDependency({ // b
      dependency,
      outputRoot,
      // we have to pass generateTemplate here to avoid a circular dependency
      generateTemplate,
      cytoConfig,
      args: templateArgs,
    });

    return { ...accum, ...renderedDep };
  };

  return synchReduce(dependencies, processDependency, {}); // 5
}
