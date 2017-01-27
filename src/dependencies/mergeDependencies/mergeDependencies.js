/* @flow */
/**
 * mergeDependencies.js
 * Written by: Connor Taylor
 */
import types from '../../utils/types';

/**
 * Description of mergeDependencies
 * @param {Object} config - The new config to merge in
 * @param {Object} baseConfig - The config to inherit from
 */
export default function mergeDependencies(config, baseConfig) {
  return config.dependencies.reduce((accum, dep) => {
    if (types.isArray(dep)) {
      return [
        ...accum.filter((d) => !types.isArray(d) || dep[0] !== d[0]),
        dep,
      ];
    } else if (types.isObject(dep)) {
      return [
        ...accum.filter((d) => !types.isObject(d) || dep.id !== d.id),
        dep,
      ];
    }
    // Dep must be a function and those will be uniqued later, so just add it
    return [...accum, dep];
  }, baseConfig.dependencies);
}
