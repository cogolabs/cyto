/* @flow */
/**
 * isFunction.js
 * Written by: Connor Taylor
 */
import lodashIsFunction from 'lodash/isFunction';

/**
 * Description of isFunction
 * @param {any} x - The value to test
 *
 */

export default function isFunction(x) {
  return lodashIsFunction(x);
}
