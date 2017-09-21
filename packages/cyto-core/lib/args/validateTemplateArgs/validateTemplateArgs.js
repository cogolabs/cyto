/* @flow */
/**
 * validateTemplateArgs.js
 * Written by: Connor Taylor
 */
import has from 'lodash/has';

import types from '../../utils/types';

/**
 * Given a set of arguments in a cyto.config.js `args` Array, checks that each
 * arg is valid. This assures 2 things:
 *  1. Every arg is an Object
 *  2. Every arg has an `id` key
 *  3. If an arg has a `type`, ensure that it's valid
 *
 * @param { Array } args - The arguments to validate
 */
export default function validateTemplateArgs(args) {
  args.forEach((arg) => {
    if (!types.isObject(arg)) {
      throw new Error(
        'Invalid argument. All args in a cyto config must be objects',
      );
    }

    if (!has(arg, 'id')) {
      throw new Error(
        `${JSON.stringify(arg)} has no id. All arguments must have an id`,
      );
    }

    const validTypes = ['string', 'boolean', 'function', 'list'];
    if (arg.type && !validTypes.includes(arg.type)) {
      throw new Error(`Argument ${arg.id} has an invalid type ${arg.type}
Valid types are 'list', 'boolean', 'function', or 'string' (default is string)`);
    }
  });
}
