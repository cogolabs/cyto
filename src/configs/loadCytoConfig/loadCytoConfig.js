/* @flow */
/**
 * loadCytoConfig.js
 * Written by: Connor Taylor
 */
import path from 'path';

import loadGlobalConfig from '../loadGlobalConfig';
import errors from '../../utils/errors';

/**
 * Loads the cyto.config.js file for the given template
 *
 * @param {string} templateId - The template to load
 * @returns {Object} The loaded cyto.config.js object
 */
export default function loadCytoConfig(templateId: string): Object {
  const { libraryPath } = loadGlobalConfig();
  const templatePath: string = path.join(libraryPath, templateId);

  try {
    const configPath: string = path.join(templatePath, 'cyto.config');

    // We have to use eval here to make sure that webpack doesn't try and
    // process this require statement :/
    // Open to other ideas on how to fix this
    return eval('require')(configPath); // eslint-disable-line
  } catch (e) {
    console.log(e);
    errors.noCytoConfig(templateId);
  }
}
