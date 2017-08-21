/* @flow */
/**
 * mergeDependencies.js
 * Written by: Connor Taylor
 */
import types from '../../utils/types';

/**
 * Given 2 sets of dependencies, merges them into 1. Prefers values from `deps`
 * in the case of a duplicate. There are 2 main cases to handle here:
 *
 *  1. If the dependency is an array, we just need to check that it's first
 *     value is not equal to the first value of any other array dependency
 *  2. If the dependency is an object, we need to make sure that it has a
 *     unique id for all other object dependencies with the same templateId
 *
 * These cases can be seen more clearly in the tests.
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
        ...accum.filter((d) => {
          if (!types.isObject(d)) {
            return true;
          }

          const differentTemplate = dep.templateId !== d.templateId;
          const differentId = dep.args.id !== d.args.id;

          return differentTemplate || differentId;
        }),
        dep,
      ];
    }
    // Dep must be a function and those will be uniqued later, so just add it
    return [...accum, dep];
  }, baseDeps);
}
