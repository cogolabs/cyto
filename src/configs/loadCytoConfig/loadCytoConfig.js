/* @flow */
/**
 * loadCytoConfig.js
 * Written by: Connor Taylor
 */
import path from 'path';
import _ from 'lodash';

import mergeCytoConfigs from '../mergeCytoConfigs';
import loadGlobalConfig from '../loadGlobalConfig';
import validateTemplate from '../../template/validateTemplate';

import errors from '../../utils/errors';
import types from '../../utils/types';

/**
 * Loads the cyto.config.js file for the given template and returns it. If the
 * template has a base, it will recursively load the base template's config
 * and return a merged version of the 2 configs.
 *
 * Whe Cyto configs are loaded, all string dependencies are converted to
 * arrays with 2 values:
 *   1. fileName - The original string with the file
 *   2. templateId - The template that the file comes from
 * We do this to ensure we load the correct dependency files when configs are
 * merged. We can allow also store more information in the future if needed
 *
 * @param {string} templateId - The template to load
 * @returns {Object} The loaded cyto.config.js object
 */
export default function loadCytoConfig(templateId) {
  const { libraryPath } = loadGlobalConfig();
  const templatePath = path.join(libraryPath, templateId);
  const configPath = path.join(templatePath, 'cyto.config');

  let rawConfig;
  try {
    // We have to use eval here to make sure that webpack doesn't try and
    // process this require statement :/
    // Open to other ideas on how to implement this
    // We also deep clone to prevent modifying the original config later on
    rawConfig = _.cloneDeep(eval('require')(configPath)); // eslint-disable-line
  } catch (e) {
    errors.noCytoConfig(templateId);
  }

  // Make sure the config is valid before processing further
  validateTemplate(rawConfig, templateId);

  rawConfig.dependencies = [
    ...rawConfig.dependencies.filter((d) => !types.isString(d)),
    ...rawConfig.dependencies
      .filter((d) => types.isString(d))
      .map((d) => [d, rawConfig.templateId]),
  ];

  return rawConfig.base
    ? mergeCytoConfigs(rawConfig, loadCytoConfig(rawConfig.base))
    : rawConfig;
}
