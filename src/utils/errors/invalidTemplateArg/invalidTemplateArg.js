/* @flow */
/**
 * invalidTemplateArg.js
 * Written by: Connor Taylor
 */
import log from '../../log';

/**
 * Logs an error when an argument listed in a cyto config is invalid
 *
 * @param { Object } arg - The invalid arg
 * @param { string } reason - The reason why the arg was invalid
 */
export default function invalidTemplateArg(arg, reason) {
  log.fatal(`Invalid template arg ${JSON.stringify(arg)}
${reason}`);
}
