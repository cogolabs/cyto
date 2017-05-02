/* @flow */
/**
 * parseListArg.js
 * Written by: Connor Taylor
 */

/**
 * Parses the input of a list argument provided by the user into a form that
 * is usable by Cyto. Does nothing if the input is already an array
 * @param {string} list - The CSV list
 *
 * @returns {Array} The parsed argument
 */
export default function parseListArg(list) {
  return list
    .split(',')
    .filter((x) => x.trim())
    .map((x) => ({ id: x.trim() }));
}
