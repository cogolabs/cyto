/* @flow */
/**
 * invalidTemplateString.js
 * Written by: Connor Taylor
 */
import chalk from 'chalk';
import log from '../../log';

/**
 * Logs an error related to an invalid template string
 *
 */
export default function invalidTemplateString(str) {
  log.fatal(
    `Invalid template string ${chalk.green(str)}.
Valid template strings are of the form: '<group>/<name>'.`,
  );
}
