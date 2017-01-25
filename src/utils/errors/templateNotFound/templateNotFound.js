/* @flow */
/**
 * templateNotFound.js
 * Written by: Connor Taylor
 */
import log from '../../log';
import loadGlobalConfig from '../../../configs/loadGlobalConfig';

/**
 * Logs an error message for when a template couldn't be found
 *
 * @param {string} templateId - The template that couldn't be found
 */
export default function templateNotFound(templateId) {
  const { libraryPath } = loadGlobalConfig();
  log.fatal(`Couldn't find template ${templateId} in ${libraryPath}.`);
}
