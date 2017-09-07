/* @flow */
/**
 * error.js
 * Written by: Connor Taylor
 */
import chalk from 'chalk';

/**
 * Logs an error to the console
 *
 * @param {string} msg - The message to log
 * @param {string} prefix - A prefix to add to the message. Default is `Error: `
 */
export default function error(msg: string, prefix: string = 'Error: ') {
  console.error(`${chalk.red(prefix)}${msg}`);
}
