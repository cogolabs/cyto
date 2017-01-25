/* @flow */
/**
 * templateExists.js
 * Written by: Connor Taylor
 */
import fs from 'fs';
import path from 'path';
import loadGlobalConfig from '../../../configs/loadGlobalConfig';

/**
 * Description of templateExists
 * @param {string} templateId - The template to check
 *
 */
export default function templateExists(templateId: string): boolean {
  const { libraryPath } = loadGlobalConfig();

  return fs.existsSync(path.join(libraryPath, templateId));
}
