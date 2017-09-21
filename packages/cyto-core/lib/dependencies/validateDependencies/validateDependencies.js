/* @flow */
/**
 * validateDependencies.js
 * Written by: Connor Taylor
 */
import has from 'lodash/has';

import types from '../../utils/types';

/**
 * Ensures that a set of dependencies is valid. Performs the following checks:
 *  1. Each dependency must be a string, object, or function
    2. Object dependencies must have 2 keys, `templateId` and `args`. `args`
         must have the `id` key
 *
 * This is meant to run before string dependencies are converted to arrays
 *
 * @param { Array } deps - The dependencies to validate
 */
export default function validateDependencies(dependencies) {
  dependencies.forEach((dep) => {
    const invalidType = !types.isString(dep)
      && !types.isFunction(dep)
      && !types.isObject(dep);

    if (invalidType) {
      throw new Error(`${dep} must be a string, object, or function`);
    }

    if (types.isObject(dep)) {
      ['templateId', 'args'].forEach((key) => {
        if (!has(dep, key)) {
          throw new Error(
            `${JSON.stringify(dep)} is missing required key ${key}`,
          );
        }
      });

      if (!has(dep, 'args.id')) {
        throw new Error(
          `${JSON.stringify(dep)} is missing an id in it's args object`,
        );
      }
    }
  });
}
