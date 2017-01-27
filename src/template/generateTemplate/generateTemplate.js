/* @flow */
/**
 * generateTemplate.js
 * Written by: Connor Taylor
 */
import fs from 'fs';
import path from 'path';
import mkdirp from 'mkdirp';
import chalk from 'chalk';

import formatTemplateString from '../formatTemplateString';
import loadTemplate from '../loadTemplate';

import getArgsForTemplate from '../../args/getArgsForTemplate';

import loadDependencies from '../../dependencies/loadDependencies';
import mergeDependencies from '../../dependencies/mergeDependencies';

import loadCytoConfig from '../../configs/loadCytoConfig';
import mergeCytoConfigs from '../../configs/mergeCytoConfigs';

import renderString from '../../utils/render/renderString';
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
 *  2. Load the template contents (cyto.config.js + static files)
 *  3. If a template has a base, we must recursively merge all subsequent base
 *     cyto configs into the raw config to get the correct set of args and
 *     dependencies.
 *  4. Get the args for the template, prompting if necessary
 *  5. Create the output directory synchronously
 *  6. Get the set of dependencies after applying any function dependencies
 *  7. For each dependency:
 *    a. Recursive call generateTemplate if it's an object (template).
 *    b. Render and write to the filesystem if it's a string
 *
 * @param {object} options - Options to tweak the template generation
 * @returns {Promise} A promise that resolves once the template is generated
 */
export default function generateTemplate(options: GenerateOptions) {
  log.info(
`Generating ${chalk.green(options.templateString)}
  - id ${chalk.green(options.args.id)}`);

  const { templateString, args } = options;
  const templateId: string = formatTemplateString(templateString); // 1
  const template: Object = loadTemplate(templateId); // 2
  const rawConfig = template['cyto.config.js'];

  const cytoConfig: Object = rawConfig.base // 3
    ? mergeCytoConfigs(rawConfig, loadCytoConfig(rawConfig.base))
    : Object.assign(
      rawConfig,
      // This converts string deps to arrays, probably a cleaner way to do this
      { dependencies: mergeDependencies(rawConfig, rawConfig) },
    );

  const outputRoot: string = cytoConfig.createDirectory // 4
    ? path.join(options.outputRoot, args.id)
    : options.outputRoot;

  return new Promise((resolve) => {
    getArgsForTemplate(cytoConfig, args) // 4
      .then((templateArgs) => {
        mkdirp.sync(outputRoot); // 5

        const dependencies = loadDependencies(cytoConfig, templateArgs); // 6
        const handleDeps = ([dep, ...rest]) => {
          if (!dep) {
            resolve();
            return;
          }
          if (types.isObject(dep)) { // 7a
            generateTemplate({
              templateString: dep.templateId,
              args: Object.assign(args, { id: dep.id }),
              outputRoot,
            }).then(() => {
              handleDeps(rest);
            });
          } else { // 7b
            const [name, depTemplateId] = dep;
            const outputPath = renderString(
              path.join(outputRoot, name),
              templateArgs,
            );
            const contents = templateId !== depTemplateId
              ? renderString(loadTemplate(depTemplateId)[name], templateArgs)
              : renderString(template[name], templateArgs);

            fs.writeFileSync(outputPath, contents);
            handleDeps(rest);
          }
        };

        handleDeps(dependencies); // 7
      });
  });
}
