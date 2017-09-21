/* @flow */
/**
 * mergeCytoConfigs.js
 * Written by: Connor Taylor
 */
import mergeArgs from '../../args/mergeArgs';
import mergeDependencies from '../../dependencies/mergeDependencies';

/**
 * Given 2 configs, merges their sets of args and dependencies and returns
 * a new config object. Prefers `config` in the case of any duplicates
 *
 * @param {Object} config - The new config to merge in
 * @param {Object} baseConfig - The config to inherit from
 *
 * @returns {object} The merged config
 */
export default function mergeCytoConfigs(config, baseConfig) {
  return {
    ...config,
    dependencies: mergeDependencies(
      config.dependencies,
      baseConfig.dependencies,
    ),
    args: mergeArgs(config.args, baseConfig.args),
  };
}
