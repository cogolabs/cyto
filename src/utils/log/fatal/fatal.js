/* @flow */
/**
 * fatal.js
 * Written by: Connor Taylor
 */
import error from '../error';

/**
 * Logs an error to the console and quits afterwards
 *
 * @param {string} msg - The message to log
 * @param {string} prefix - A prefix to add to the message. Default is `Error: `
 */
export default function fatal(msg, prefix = 'Error: ') {
  error(msg, prefix);
  process.exit(1);
}
