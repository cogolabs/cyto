/* @flow */
/**
 * loadDependencies.js
 * Written by: Connor Taylor
 */
import types from '../../utils/types';

/**
 * Description of loadDependencies
 *
 */
export default function loadDependencies(cytoConfig, args) {
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
