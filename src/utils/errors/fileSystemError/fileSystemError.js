/* @flow */
/**
 * fileSystemError.js
 * Written by: Connor Taylor
 */
import log from '../../log';

/**
 * Description of fileSystemError
 *
 */
export default function fileSystemError(err, msg) {
  log.fatal(`${msg}`);
}
