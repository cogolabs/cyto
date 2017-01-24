/* @flow */
/**
 * config.js
 * Written by: Connor Taylor
 */

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
