/* @flow */
/**
 * mergeCytoConfigs.js
 * Written by: Connor Taylor
 */
import loadCytoConfig from '../loadCytoConfig';

import parseArgsFromDependencies from '../../args/parseArgsFromDependencies';
import mergeDependencies from '../../dependencies/mergeDependencies';

/**
 * Description of mergeCytoConfigs
 * @param {Object} config - The new config to merge in
 * @param {Object} baseConfig - The config to inherit from
 *
 * @returns {object} The merged config
 */
export default function mergeCytoConfigs(config, baseConfig) {
  // If the base has a base, we need to recurse further down before proceeding
  const newBase = baseConfig.base
    ? mergeCytoConfigs(baseConfig, loadCytoConfig(baseConfig.base))
    : baseConfig;

  // Create the new set of dependencies and args
  const dependencies = mergeDependencies(config, newBase);
  const args = parseArgsFromDependencies(dependencies);

  return Object.assign(config, {
    dependencies,
    args,
  });
}
