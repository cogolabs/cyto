/* @flow */
/**
 * loadGlobalConfig.js
 * Written by: Connor Taylor
 */
import fs from 'fs';
import path from 'path';

import file from '../../utils/file';

/**
 * Loads the `config.json` file stored in the user's ~/.cyto directory
 */
export default function loadGlobalConfig() {
  const configPath = path.resolve(file.getUserHomeDir(), '.cyto/config.json');

  if (!fs.existsSync(configPath)) {
    throw new Error('No global config found. Please run `cyto init`');
  }

  return JSON.parse(file.loadUTF8File(configPath));
}