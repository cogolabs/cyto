/* @flow */
/**
 * invalidCytoConfig.js
 * Written by: Connor Taylor
 */
import log from '../../log';

/**
 * Logs a fatal error when a user tries to load an invalid Cyto config.
 *
 */
export default function invalidCytoConfig(templateId, reason) {
  log.fatal(`Invalid Cyto config for template ${templateId}
${reason}`);
}
