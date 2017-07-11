/**
 * isRuntimeArg.js
 * Written by: Connor Taylor
 *
 * Exports the isRuntimeArg function
 */

import types from '../../utils/types';

/**
 * Checks if an arg is a runtime arg. A runtime arg is an arg in a cyto config
 * file that has a function for it's default argument with a type that isn't
 * `function`
 *
 * @param { Object } arg The argument to check
 * @return {Boolean} True if it is a runtime argument, false otherwise
 */
const isRuntimeArg = (arg) => {
  return arg.type !== 'function' && types.isFunction(arg.default);
};

export default isRuntimeArg;
