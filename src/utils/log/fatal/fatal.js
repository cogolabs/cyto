/* @flow */
/**
 * fatal.js
 * Written by: Connor Taylor
 */

/**
 * Throws an Error with the specified prefix and message
 *
 * @param {string} msg - The message to log
 * @param {string} prefix - A prefix for the message. Default is `Error: `
 */
export default function fatal(msg) {
  throw new Error(`${msg}`);
}
