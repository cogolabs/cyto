/* @flow */
/**
 * error.js
 * Written by: Connor Taylor
 */
import colors from 'colors/safe';

/**
 * Logs an error to the console
 *
 * @param {string} msg - The message to log
 * @param {string} prefix - A prefix to add to the message. Default is `Error: `
 */
export default function error(msg, prefix = 'Error: ') {
  console.error(`${colors.red(prefix)}${msg}`);
}
