/* @flow */
/**
 * validCytoConfig.js
 * Written by: Connor Taylor
 */
import _ from 'lodash';
import chalk from 'chalk';

import errors from '../../utils/errors';
import types from '../../utils/types';

/**
 * Checks if a cyto.config.js file that was loaded is valid. Valid cyto configs
 * meet the following conditions:
 *  1. Has `templateId`, `args`, `dependencies`, and `options` keys
 *  2. `templateId` must match the provided id
 *  3. No invalid dependencies
      a. `dependencies` must be an array
      b. Each dependency must be a string, object, or function
      c. Object dependencies must have 2 keys, `templateId` and `args`. `args`
         must have the `id` key
 *  4. No invalid args
 *    a. `args` must be an array
 *    b. Each arg must have an id
 *  5. `options` must be an object
 */
export default function validCytoConfig(providedId, config) {
  const { templateId, dependencies, args, options } = config;
  // 1
  ['templateId', 'dependencies', 'args', 'options'].forEach((key) => {
    const hasProperty = _.has(config, key);
    if (!hasProperty) {
      errors.invalidCytoConfig(providedId, `Missing key: ${chalk.green(key)}`);
    }
  });

  // 2
  if (templateId !== providedId) {
    errors.invalidCytoConfig(providedId, `Config for template at ${chalk.green(providedId)} has templateId ${chalk.red(templateId)}. They must match`);
  }

  // 3
  if (!types.isArray(dependencies)) {
    errors.invalidCytoConfig(providedId, `${chalk.green('dependencies')} must be an Array`);
  }
  dependencies.forEach((dep) => {
    const invalidType = !types.isString(dep)
      && !types.isFunction(dep)
      && !types.isObject(dep);

    if (invalidType) {
      errors.invalidCytoConfig(providedId, `Found invalid dependency: ${chalk.green(dep)}`);
    }
  });

  // 4
  if (!types.isArray(args)) {
    errors.invalidCytoConfig(providedId, `${chalk.green('args')} must be an Array`);
  }

  return true;
}
