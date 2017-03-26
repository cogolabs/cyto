/* @flow */
/**
 * loadCytoConfig.js
 * Written by: Connor Taylor
 */
import path from 'path';

import mergeCytoConfigs from '../mergeCytoConfigs';
import loadGlobalConfig from '../loadGlobalConfig';

import errors from '../../utils/errors';
import types from '../../utils/types';

/**
 * Loads the cyto.config.js file for the given template. Converts all string
 * dependencies to arrays with 2 values:
 *   - fileName - The original string with the file
 *   - templateId - The template that the file comes from
 * We do this to ensure we load the correct file when base templates are used
 *
 * @param {string} templateId - The template to load
 * @returns {Object} The loaded cyto.config.js object
 */
export default function loadCytoConfig(templateId: string): Object {
  const { libraryPath } = loadGlobalConfig();
  const templatePath: string = path.join(libraryPath, templateId);

  try {
    const configPath: string = path.join(templatePath, 'cyto.config');
    // We have to use eval here to make sure that webpack doesn't try and
    // process this require statement :/
    // Open to other ideas on how to implement this
    const rawConfig = eval('require')(configPath); // eslint-disable-line
    const dependencies = [
      ...rawConfig.dependencies.filter((d) => !types.isString(d)),
      ...rawConfig.dependencies
        .filter((d) => types.isString(d))
        .map((d) => [d, rawConfig.templateId]),
    ];

    // We have to ensure that the string dependencies are removed since we
    // may have to merge it with the base config before returning
    const partialConfig = Object.assign(rawConfig, { dependencies });

    return rawConfig.base
      ? mergeCytoConfigs(partialConfig, loadCytoConfig(rawConfig.base))
      : partialConfig;
  } catch (e) {
    console.log(e);
    errors.noCytoConfig(templateId);
  }
}
