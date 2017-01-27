/* @flow */
/**
 * mergeCytoConfigs.js
 * Written by: Connor Taylor
 */
import _ from 'lodash';

import mergeArgs from '../../args/mergeArgs';
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
  const dependencies = mergeDependencies(config, baseConfig);

  const allArgs = mergeArgs(config, baseConfig);
  const requiredArgs = parseArgsFromDependencies(dependencies);
  const args = _.intersectionBy(allArgs, requiredArgs, 'id');

  return Object.assign(config, {
    dependencies,
    args,
  });
}
