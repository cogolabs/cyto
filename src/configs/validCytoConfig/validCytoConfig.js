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
  [
    ['templateId', types.isString],
    ['dependencies', types.isArray],
    ['args', types.isArray],
    ['options', types.isObject],
  ].forEach(([key, typeTest]) => {
    const hasProperty = _.has(config, key);
    if (!hasProperty) {
      errors.invalidCytoConfig(providedId, `Missing key: ${chalk.green(key)}`);
    }

    if (!typeTest(config[key])) {
      errors.invalidCytoConfig(providedId, `${chalk.green(key)} is the wrong type`);
    }
  });

  if (config.templateId !== providedId) {
    errors.templateIdMismatch(providedId, config.templateId);
  }

  if (config.dependencies.length === 0) {
    errors.invalidCytoConfig(providedId, `${chalk.green('dependencies')} is empty, this template will not generate anything`);
  }
}
