/* @flow */
/**
 * loadCytoConfig.js
 * Written by: Connor Taylor
 */
import memoize from 'mem';

import mergeCytoConfigs from '../mergeCytoConfigs';
import validateTemplate from '../../template/validateTemplate';
import getTemplatePackage from '../../template/getTemplatePackage';

import types from '../../utils/types';
import evalRequire from '../../utils/evalRequire';

/**
 * Loads the cyto.config.js file for the given template and returns it. If the
 * template has a base, it will recursively load the base template's config
 * and return a merged version of the 2 configs.
 *
 * Whe Cyto configs are loaded, all string dependencies are converted to
 * arrays with 3 values:
 *   1. fileName - The original string with the file
 *   2. templateId - The template that the file comes from
 *   3. isRuntimeDep - Was this dependency created at runtime?
 * We do this to ensure we load the correct dependency files when configs are
 * merged. We can allow also store more information in the future if needed
 *
 * @param {string} templateId - The template to load
 * @returns {Object} The loaded cyto.config.js object
 */
const loadCytoConfig = (templateId) => {
  const templatePackage = getTemplatePackage(templateId);
  const rawConfig = evalRequire(templatePackage);

  // Make sure the config is valid before processing further
  validateTemplate(rawConfig, templatePackage);

  const formattedConfig = {
    ...rawConfig,
    dependencies: [
      ...rawConfig.dependencies.filter((d) => !types.isString(d)),
      ...rawConfig.dependencies
        .filter((d) => types.isString(d))
        .map((d) => [d, rawConfig.templateId, false]),
    ],
  };

  return rawConfig.base
    ? mergeCytoConfigs(
        formattedConfig,
        loadCytoConfig(formattedConfig.base.templateId),
      )
    : formattedConfig;
};

export default memoize(loadCytoConfig);
