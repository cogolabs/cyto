/* @flow */
/**
 * noCytoConfig.js
 * Written by: Connor Taylor
 */
import log from '../../log';

/**
 * Logs an error when a cyto.config.js file was not found for the given template
 * @param {string} templateId - The template that had no cyto.config.js file
 */
export default function noCytoConfig(templateId) {
  log.fatal(`No cyto.config.js file found for ${templateId}`);
}
