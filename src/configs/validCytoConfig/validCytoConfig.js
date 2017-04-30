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
 *  1. The config is an Object
 *  2. Config has `templateId`, `args`, `dependencies`, and `options` keys
 *  3. `templateId` must be a string
 *  4. `dependencies` must be an array
 *  5. `args` must be an array
 *  6. `options` must be an object`
 *  7. `templateId` must match the provided id
 *  8. `dependencies` has at least 1 element
 */
export default function validCytoConfig(config, providedId) {
  if (!types.isObject(config)) { // 1
    errors.invalidCytoConfig(
      providedId,
      "cyto.config.js doesn't export an Object",
    );
  }

  [
    ['templateId', types.isString],
    ['dependencies', types.isArray],
    ['args', types.isArray],
    ['options', types.isObject],
  ].forEach(([key, typeTest]) => {
    const hasProperty = _.has(config, key);
    if (!hasProperty) { // 2
      errors.invalidCytoConfig(
        providedId,
        `Missing key: ${chalk.green(key)}`,
      );
    }

    if (!typeTest(config[key])) { // 3-6
      errors.invalidCytoConfig(
        providedId,
        `${chalk.green(key)} is the wrong type`,
      );
    }
  });

  if (config.templateId !== providedId) { // 7
    errors.templateIdMismatch(providedId, config.templateId);
  }

  if (config.dependencies.length === 0) { // 8
    errors.invalidCytoConfig(
      providedId,
      `${chalk.green('dependencies')} is empty, this template will not generate anything`,
    );
  }
}
