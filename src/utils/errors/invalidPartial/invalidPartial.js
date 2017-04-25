/* @flow */
/**
 * hello.js
 * Written by: Connor Taylor
 *
 * Logs an error when a partial is invalid
 */
import log from '../../log';

/**
 * Description of invalidPartial
 * @param { string } partial - The invalid partial
 * @param { string } reason - Why the partial was invalid
 */
export default function invalidPartial(partial, reason) {
  log.fatal(`Invalid partial {{> ${partial} }}
${reason}`);
}
