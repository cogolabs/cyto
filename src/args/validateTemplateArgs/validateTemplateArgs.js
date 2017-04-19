/* @flow */
/**
 * validateTemplateArgs.js
 * Written by: Connor Taylor
 */
import _ from 'lodash';

import errors from '../../utils/errors';
import types from '../../utils/types';

/**
 * Given a set of arguments in a cyto.config.js `args` Array, checks that each
 * arg is valid. This assures 2 things:
 *  1. Every arg is an Object
 *  2. Every arg has an `id` key
 *
 * @param { Array } args - The arguments to validate
 */
export default function validateTemplateArgs(args) {
  args.forEach((arg) => {
    if (!types.isObject(arg)) {
      errors.invalidTemplateArg(arg, 'Not an object');
    }

    const hasId = _.has(arg, 'id');
    if (!hasId) {
      errors.invalidTemplateArg(arg, 'No id found');
    }
  });
}
