/* @flow */
/**
 * fileSystemError.js
 * Written by: Connor Taylor
 */

/**
 * Description of fileSystemError
 *
 */

export default function fileSystemError(err, msg: string = '') {
  console.log(`${err.toString() || 'Error'}: ${msg}`);
  process.exit(1);
}
