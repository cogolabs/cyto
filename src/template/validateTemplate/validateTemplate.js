/* @flow */
/**
 * validateTemplate.js
 * Written by: Connor Taylor
 */
import validCytoConfig from '../../configs/validCytoConfig';
import validateDependencies from '../../dependencies/validateDependencies';

/**
 * Driver for validation of a template after it has been loaded. Performs the
 * following checks:
 *
 *  1. Validates the cyto config as a whole
 *  2. Validates the cyto config's dependencies
 *  3. Validates the cyto config's arguments
 *
 * Any problems encountered will cause Cyto to exit. This function should be
 * called after the cyto.config.js file has been loaded but BEFORE its
 * string dependencies have been converted to arrays.
 *
 * @param { Object } config - The config to validate
 * @param { string } providedId - The templateId given by the user on the CLI
 */
export default function validateTemplate(config, providedId) {
  validCytoConfig(config, providedId);
  validateDependencies(config.dependencies);
}
