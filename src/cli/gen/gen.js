/* @flow */
/**
 * gen.js
 * Written by: Connor Taylor
 */

/**
 * `gen`. Does x when envoked. The arguments listed below are meant to be
 * passed via the command line.
 *
 */

export default function gen(program: Object) {
  program
    .command('gen  ')
    .action((options) => {
      console.log('gen');
    });
}
