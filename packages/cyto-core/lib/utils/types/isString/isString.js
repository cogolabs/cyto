/* @flow */
/**
 * isString.js
 * Written by: Connor Taylor
 */

/**
 * Checks if a value is an string.
 * @param {any} x - The variable to check
 * @returns {boolean} true if the value is an string
 */
export default function isString(s) {
  return typeof s === 'string';
}
