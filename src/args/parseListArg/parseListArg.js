/* @flow */
/**
 * parseListArg.js
 * Written by: Connor Taylor
 */
import types from '../../utils/types';

/**
 * Parses the input of a list argument provided by the user into a form that
 * is usable by Cyto.
 * @param {string} listArg - The CSV list
 *
 * @returns {Array} The parsed argument
 */
export default function parseListArg(listArg) {
  if (types.isArray(listArg)) {
    return listArg.map((item) => {
      if (!types.isObject(item)) {
        return { id: item };
      }
      return item;
    });
  }

  return listArg
    .split(',')
    .filter((x) => x.trim())
    .map((x) => ({ id: x.trim() }));
}
