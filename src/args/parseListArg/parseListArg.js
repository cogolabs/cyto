/* @flow */
/**
 * parseListArg.js
 * Written by: Connor Taylor
 */

/**
 * Description of parseListArg
 * @param {string} list - The CSV list
 *
 */

export default function parseListArg(list) {
  const listArgs = list.split(',').filter((x) => x.trim());

  return listArgs.map((a) => ({ id: a }));
}
