/* @flow */
/**
 * config.js
 * Written by: Connor Taylor
 */
import log from '../../utils/log';

/**
 * `config`. Does x when envoked. The arguments listed below are meant to be
 * passed via the command line.
 *
 */

export default function config(program: Object) {
  program
    .command('config  ')
    .action((options) => {
      console.log('config');
    });
}
