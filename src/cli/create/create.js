/* @flow */
/**
 * create.js
 * Written by: Connor Taylor
 */

/**
 * `create`. Does x when envoked. The arguments listed below are meant to be
 * passed via the command line.
 *
 */

export default function create(program: Object) {
  program
    .command('create  ')
    .action(() => {
      console.log('hello');
    });
}
