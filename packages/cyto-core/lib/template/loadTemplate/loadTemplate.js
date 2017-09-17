/* @flow */
/**
 * loadTemplate.js
 * Written by: Connor Taylor
 */
import path from 'path';

import file from '../../utils/file';
import types from '../../utils/types';
import loadCytoConfig from '../../configs/loadCytoConfig';

// Make sure we don't have to reload the template multiple times
const CACHE = {};

/**
 * Reads the contents of a template. Returns an object that maps file names
 * to their contents for use in the generation of the template. File contents
 * are NOT rendered and must be done later
 *
 * @param {string} templateId - The template to load
 * @returns {object} The mapping of names to contents
 */
export default function loadTemplate(templateId) {
  if (CACHE[templateId]) {
    return CACHE[templateId];
  }

  const cytoConfig = loadCytoConfig(templateId);
  const loadedTemplate = cytoConfig
    .dependencies
    .filter((dep) => types.isArray(dep))
    .reduce((accum, [name, depTemplateId]) => ({
      ...accum,
      [name]: file.loadUTF8FileSafe(
        path.join(libraryPath, depTemplateId, name),
      ),
    }), {});

  CACHE[templateId] = loadedTemplate;

  return loadedTemplate;
}
