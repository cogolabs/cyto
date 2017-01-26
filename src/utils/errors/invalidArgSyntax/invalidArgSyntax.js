/* @flow */
/**
 * invalidArgSyntax.js
 * Written by: Connor Taylor
 */
import log from '../../log';

/**
 * Description of invalidArgSyntax
 * @param {string} arg - The argument with the invalid syntax
 *
 */
export default function invalidArgSyntax(arg) {
  log.fatal(
  `Invalid argument ${arg}
Valid args are provided in the form: key=value`,
  );
}
