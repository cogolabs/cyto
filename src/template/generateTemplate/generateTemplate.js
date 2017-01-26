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

import loadCytoConfig from '../../configs/loadCytoConfig';
import mergeCytoConfigs from '../../configs/mergeCytoConfigs';

import renderString from '../../utils/render/renderString';

type GenerateOptions = {
  templateString: string,
  args: string[],
  outputRoot: string,
};

/**
 * Driver for the template generation algorithm. The algorithm can be broken
 * down into these steps:
 *  1. Format the template string
 *  2. Load the template contents (cyto.config.js + static files)
 *  3. Get the args for the template
 *  4. Get the set of dependencies after applying any function dependencies
 *  5. For each dependency:
 *    - Write to the filesystem if it's a string
 *    - Recursive call generateTemplate if it's an object.
 *
 * @param {object} options - Options to tweak the template generation
 */
export default function generateTemplate(options: GenerateOptions) {
  console.log(`Generating ${chalk.green(options.templateString)} with id ${chalk.green(options.args.id)}`);
  const { templateString, args } = options;
  const templateId: string = formatTemplateString(templateString);
  const template: Object = loadTemplate(templateId);
  const cytoConfig: Object = template['cyto.config.js'];
  const outputRoot: string = cytoConfig.createDirectory
    ? path.join(options.outputRoot, args.id)
    : options.outputRoot;
  mkdirp.sync(outputRoot);

  if (cytoConfig.base) {
    mergeCytoConfigs(
      cytoConfig,
      loadCytoConfig(cytoConfig.base)
    );
  }

  // return new Promise((resolve) => {
  //   getArgsForTemplate(cytoConfig, args)
  //     .then((templateArgs) => {
  //       const handleDeps = ([dep, ...rest]) => {
  //         if (!dep) {
  //           resolve();
  //           return;
  //         }
  //         if (typeof dep === 'object') {
  //           generateTemplate({
  //             templateString: dep.templateId,
  //             args: Object.assign(args, { id: dep.id }),
  //             outputRoot,
  //           }).then(() => {
  //             handleDeps(rest);
  //           });
  //         } else {
  //           const outputPath = renderString(path.join(outputRoot, dep), templateArgs);
  //           const contents = renderString(template[dep], templateArgs);

  //           fs.writeFileSync(outputPath, contents);
  //           handleDeps(rest);
  //         }
  //       };

  //       handleDeps(loadDependencies(cytoConfig, templateArgs));
  //     });
  // });
}
