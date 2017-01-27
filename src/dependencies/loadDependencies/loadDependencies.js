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
  const runtimeDeps = cytoConfig.dependencies
    .filter((dep) => types.isFunction(dep))
    .reduce((accum, func) => {
      const result = func(args);
      return Array.isArray(result)
        ? [...accum, ...result]
        : [...accum, result];
    }, []);

  return [
    ...cytoConfig.dependencies.filter((d) => !types.isFunction(d)),
    ...runtimeDeps,
  ];
}
