/* @flow */
/**
 * isObject.js
 * Written by: Connor Taylor
 */

/**
 * Checks if a value is an object. Returns false for arrays and functions.
 * @param {any} x - The variable to check
 * @returns {boolean} true if the value is an object
 */
export default function isObject(val) {
  if (val === null) { return false; }
  return typeof val === 'object' && !Array.isArray(val);
}
