/* @flow */
/**
 * warn.js
 * Written by: Connor Taylor
 */
import chalk from 'chalk';

/**
 * Logs a warning to the console
 *
 * @param {string} msg - The message to log
 * @param {string} prefix - A prefix to add to the message. Default is
 * `Warning: `
 */
export default function (msg: string, prefix: string = 'Warning: ') {
  console.warn(`${chalk.yellow(prefix)}${msg}`);
}
