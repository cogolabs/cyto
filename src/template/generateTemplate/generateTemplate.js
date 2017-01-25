/* @flow */
/**
 * generateTemplate.js
 * Written by: Connor Taylor
 */
import fs from 'fs';
import path from 'path';
import mkdirp from 'mkdirp';

import formatTemplateString from '../formatTemplateString';
import loadTemplate from '../loadTemplate';
import getArgsForTemplate from '../../args/getArgsForTemplate';
import loadDependencies from '../../dependencies/loadDependencies';
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
  const {
    templateString,
    args,
  } = options;

  const templateId: string = formatTemplateString(templateString);
  const template: Object = loadTemplate(templateId);
  const cytoConfig: Object = template['cyto.config.js'];
  const templateArgs = getArgsForTemplate(cytoConfig, args);
  const dependencies = loadDependencies(cytoConfig, templateArgs);

  const outputRoot = cytoConfig.createDirectory
    ? path.join(options.outputRoot, templateArgs.id)
    : options.outputRoot;

  mkdirp.sync(outputRoot);

  dependencies.forEach((dep) => {
    if (typeof dep === 'object') {
      console.log(dep);
      generateTemplate({
        templateString: dep.templateId,
        args: Object.assign(args, { id: dep.id }),
        outputRoot,
      });
    } else {
      const outputPath = renderString(path.join(outputRoot, dep), templateArgs);
      const contents = renderString(template[dep], templateArgs);

      fs.writeFileSync(outputPath, contents);
    }
  });
}
