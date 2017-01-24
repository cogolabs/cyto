/* @flow */
/**
 * info.js
 * Written by: Connor Taylor
 */

/**
 * Logs an informational message to the console
 *
 * @param {string} msg - The message to log
 * @param {string} prefix - A prefix to add to the message. Default is `Error: `
 */
export default function (msg, prefix = '') {
  console.info(`${prefix}${msg}`);
}
