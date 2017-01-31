/* @flow */
/**
 * getRuntimeDependencies.js
 * Written by: Connor Taylor
 */
import types from '../../utils/types';

/**
 * Generates a new set of dependencies after applying each dependency that's a
 * function.
 *
 * @param {Object} cytoConfig - The config file with the dependencies
 * @param {Object} args - The arguments to pass to each functional dependency
 */
export default function getRuntimeDependencies(cytoConfig, args) {
  const formatDep = (dep) => {
    return types.isString(dep)
      ? [dep, cytoConfig.templateId]
      : dep;
  };

  const runtimeDeps = cytoConfig.dependencies
    .filter((dep) => types.isFunction(dep))
    .reduce((accum, func) => {
      const result = func(args);
      return types.isArray(result)
        ? [...accum, ...result.map(formatDep)]
        : [...accum, formatDep(result)];
    }, []);

  return [
    ...cytoConfig.dependencies.filter((d) => !types.isFunction(d)),
    ...runtimeDeps,
  ];
}
