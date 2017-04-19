/* @flow */
/**
 * mergeDependencies.js
 * Written by: Connor Taylor
 */
import types from '../../utils/types';

/**
 * Given 2 sets of dependencies, merges them into 1. Prefers values from `deps`
 * in the case of a duplicate
 *
 * @param {Object} deps - The dependencies to merge in
 * @param {Object} baseDeps - The pre-existing dependencies
 */
export default function mergeDependencies(deps, baseDeps) {
  return deps.reduce((accum, dep) => {
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
  }, baseDeps);
}
