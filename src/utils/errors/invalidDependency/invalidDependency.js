/* @flow */
/**
 * invalidDependency.js
 * Written by: Connor Taylor
 *
 * Fires an error with a message related to an invalid dependency
 */
import log from '../../log';

/**
 * Logs a fatal error with a message about why the dependency was invalid
 * @param { string } dep - The invalid dependency
 * @param { string } reason - A human readable explantion of why the dependency is invalid
 */
export default function invalidDependency(dep, reason) {
  log.fatal(`Invalid dependency ${JSON.stringify(dep)}
${reason}`);
}
