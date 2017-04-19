/* @flow */
/**
 * validateDependencies.js
 * Written by: Connor Taylor
 */
import chalk from 'chalk';
import _ from 'lodash';

import errors from '../../utils/errors';
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
export default function validateDependencies(deps) {
  deps.forEach((dep) => {
    const invalidType = !types.isString(dep)
      && !types.isFunction(dep)
      && !types.isObject(dep);

    if (invalidType) {
      errors.invalidDependency(dep, 'Invalid type. Must be a string, object, or function');
    }

    if (types.isObject(dep)) {
      ['templateId', 'args'].forEach((key) => {
        const hasProperty = _.has(dep, key);
        if (!hasProperty) {
          errors.invalidDependency(dep, `Missing key: ${chalk.green(key)}`);
        }
      });

      if (!_.has(dep, 'args.id')) {
        errors.invalidDependency(dep, 'Missing id arg');
      }
    }
  });
}
