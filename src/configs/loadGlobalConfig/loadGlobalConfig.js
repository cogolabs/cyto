/* @flow */
/**
 * loadGlobalConfig.js
 * Written by: Connor Taylor
 */
import fs from 'fs';
import path from 'path';

import file from '../../utils/file';
import errors from '../../utils/errors';
/**
 * Description of loadGlobalConfig
 *
 */

export default function loadGlobalConfig() {
  const configPath = path.resolve(file.getUserHomeDir(), '.cyto/config.json');
  if (!fs.existsSync(configPath)) {
    errors.noGlobalConfig();
  }

  return JSON.parse(file.loadUTF8File(configPath));
}
