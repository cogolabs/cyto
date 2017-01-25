/* @flow */
/**
 * noGlobalConfig.js
 * Written by: Connor Taylor
 */
import getUserHomeDir from '../../file/getUserHomeDir';
import log from '../../log';

/**
 * Logs an error message for when no global config is present.
 */
export default function noGlobalConfig() {
  log.fatal(
    `No config.json could be found at ${getUserHomeDir()}/.cyto
    Please run 'cyto config' to generate one`
  );
}
