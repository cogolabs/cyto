/* @flow */
/**
 * parseListArg.js
 * Written by: Connor Taylor
 */
import types from '../../utils/types';

/**
 * Description of parseListArg
 * @param {string} list - The CSV list
 *
 */

export default function parseListArg(list) {
  if (types.isArray(list)) { return list; }

  return list
    .split(',')
    .filter((x) => x.trim())
    .map((x) => ({ id: x.trim() }));
}
