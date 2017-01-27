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
    if (types.isString(dep)) {
      // Convert strings to arrays, storing the template that it came from so
      // that we know which template to load the file's contents from
      return [
        ...accum.filter((d) => !types.isArray(d) || dep !== d[0]),
        [dep, config.templateId],
      ];
    } else if (types.isObject(dep)) {
      return [
        ...accum.filter((d) => !types.isObject(d) || dep.id !== d.id),
        dep,
      ];
    }
    // Dep must be a function and those will be uniqued later, so just add it
    return [...accum, dep];
  }, baseConfig.dependencies.map((dep) => {
    if (types.isString(dep)) {
      return [dep, baseConfig.templateId];
    }

    return dep;
  }));
}
