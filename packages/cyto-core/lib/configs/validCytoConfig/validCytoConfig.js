/**
 * validCytoConfig.js
 * Written by: Connor Taylor
 */
import has from 'lodash/has';

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
export default function validCytoConfig(config, pkgString) {
  if (!types.isObject(config)) { // 1
    throw new Error(
      `The cyto.config.js for ${pkgString} doesn't export an object`,
    );
  }

  [
    ['templateId', types.isString],
    ['dependencies', types.isArray],
    ['args', types.isArray],
    ['options', types.isObject],
  ].forEach(([key, typeTest]) => {
    if (!has(config, key)) { // 2
      throw new Error(
        `Config for ${pkgString} is missing required key ${key}`,
      );
    }

    if (!typeTest(config[key])) { // 3-6
      throw new Error(
        `${key} in the config for ${pkgString} is the wrong type.`,
      );
    }
  });

  if (has(config, 'base')) {
    if (!types.isObject(config.base)) {
      throw new Error(
        `Config for ${pkgString} has an invalid base: Must be an object`,
      );
    }

    if (!has(config.base, 'templateId')) {
      throw new Error(`Config for ${pkgString} has an invalid base: Must have a templateId key`);
    }

    if (!has(config.base, 'args')) {
      throw new Error(
        `Config for ${pkgString} has an invalid base: Must have an args key`,
      );
    }
  }

  if (config.dependencies.length === 0) { // 8
    throw new Error(`${pkgString} has no dependencies, this template will not generate anything`);
  }
}