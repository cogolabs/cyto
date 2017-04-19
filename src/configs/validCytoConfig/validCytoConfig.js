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
 *  3. `dependencies` must be an array
 *  4. `args` must be an array
 *  5. `options` must be an object
 */
export default function validCytoConfig(config, providedId) {
  ['templateId', 'dependencies', 'args', 'options'].forEach((key) => {
    const hasProperty = _.has(config, key);
    if (!hasProperty) {
      errors.invalidCytoConfig(providedId, `Missing key: ${chalk.green(key)}`);
    }
  });

  const { templateId, dependencies, args, options } = config;

  if (templateId !== providedId) {
    errors.templateIdMismatch(providedId, templateId);
  }

  if (!types.isArray(dependencies)) {
    errors.invalidCytoConfig(providedId, `${chalk.green('dependencies')} must be an Array`);
  }

  if (!types.isArray(args)) {
    errors.invalidCytoConfig(providedId, `${chalk.green('args')} must be an Array`);
  }

  if (!types.isObject(options)) {
    errors.invalidCytoConfig(providedId, `${chalk.green('options')} must be an Object`);
  }

  return true;
}
