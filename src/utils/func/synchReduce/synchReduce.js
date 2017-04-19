/* @flow */
/**
 * synchReduce.js
 * Written by: Connor Taylor
 *
 *
 */

/**
 * This is functionally equivalent to Array.prototype.reduce in that it
 * synchronously reduces an array, but the callback is assumed to be async
 *
 * @param { Array } items - The items to synchronously reduce over
 * @param { Function } cb - The asynchronous callback
 * @param { Any } init - The initial reduction value
 *
 * @returns { Any } The reduced value
 */
export default async function synchReduce(items, cb, init) {
  const iterator = async (accum, [head, ...tail]) => {
    if (!head) {
      return accum;
    }

    const result = await cb(accum, head);

    return iterator(result, tail);
  };

  const reducedItems = await iterator(init, items);

  return reducedItems;
}
