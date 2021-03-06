/* @flow */
/**
 * loadTemplate.js
 * Written by: Connor Taylor
 */
import path from 'path';
import memoize from 'mem';

import loadCytoConfig from '../../configs/loadCytoConfig';
import getTemplatePackage from '../getTemplatePackage';

import file from '../../utils/file';
import types from '../../utils/types';
import evalRequire from '../../utils/evalRequire';

/**
 * Reads the contents of a template. Returns an object that maps file names
 * to their contents for use in the generation of the template. File contents
 * are NOT rendered and must be done later
 *
 * @param {string} templateId - The template to load
 * @returns {object} The mapping of names to contents
 */
const loadTemplate = (templateId) => loadCytoConfig(templateId)
  .dependencies
  .filter((dep) => types.isArray(dep))
  .reduce((accum, [name, depTemplateId]) => {
    const templatePackage = getTemplatePackage(depTemplateId);
    // require.resolve gives us the path to the cyto.config.js file, not the
    // template directory (which is one level up)
    const templatePath = path.dirname(evalRequire.resolve(templatePackage));

    return {
      ...accum,
      [name]: file.loadUTF8FileSafe(path.join(templatePath, name)),
    };
  }, {});

export default memoize(loadTemplate);
