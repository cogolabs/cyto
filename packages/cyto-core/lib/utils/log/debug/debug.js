/* @flow */
/**
 * debug.js
 * Written by: Connor Taylor
 */

/**
 * Logs a debug message to the console. This will only print if the verbosity is
 * increased by the user
 *
 * @param {string} msg - The message to log
 * @param {string} prefix - A prefix to add to the message. Default is `Error: `
 */
export default function debug(msg: string, prefix: string = 'Debug: ') {
  console.info(`${prefix}${msg}`);
}
