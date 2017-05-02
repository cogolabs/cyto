/* @flow */
/**
 * getRuntimeDependencies.js
 * Written by: Connor Taylor
 */
import mergeDependencies from '../mergeDependencies';
import validateDependencies from '../validateDependencies';
import types from '../../utils/types';

/**
 * Generates a new set of dependencies after applying each dependency that's a
 * function.
 *
 * @param {Object} cytoConfig - The config file with the dependencies
 * @param {Object} args - The arguments to pass to each functional dependency
 */
export default function getRuntimeDependencies(cytoConfig, args) {
  const { templateId, dependencies } = cytoConfig;
  const formatDep = (dep) => {
    return types.isString(dep)
      ? [dep, templateId]
      : dep;
  };

  const runtimeDeps = dependencies
    .filter((dep) => types.isFunction(dep))
    .reduce((accum, func) => {
      const result = func(args);

      if (types.isArray(result)) {
        validateDependencies(result);
        return mergeDependencies(result.map(formatDep), accum);
      }

      validateDependencies([result]);

      return mergeDependencies([formatDep(result)], accum);
    }, []);

  return mergeDependencies(
    runtimeDeps,
    dependencies.filter((d) => !types.isFunction(d)),
  );
}
