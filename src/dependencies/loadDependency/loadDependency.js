/* @flow */
/**
 * loadDependency.js
 * Written by: Connor Taylor
 */
import path from 'path';

import loadGlobalConfig from '../../configs/loadGlobalConfig';

import file from '../../utils/file';

/**
 * Loads the raw contents of a single dependency.
 */
export default function loadDependency(dep) {
  const [name, templateId] = dep;
  const { libraryPath } = loadGlobalConfig();

  return file.loadUTF8FileSafe(
    path.join(libraryPath, templateId, name),
  );
}
