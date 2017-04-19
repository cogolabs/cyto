/* @flow */
/**
 * loadTemplate.js
 * Written by: Connor Taylor
 */
import path from 'path';

import file from '../../utils/file';
import errors from '../../utils/errors';
import types from '../../utils/types';
import validate from '../../utils/validate';
import loadCytoConfig from '../../configs/loadCytoConfig';
import loadGlobalConfig from '../../configs/loadGlobalConfig';

/**
 * Reads the contents of a template. Returns an object that maps file names
 * to their contents for use in the generation of the template. File contents
 * are NOT rendered and must be done later
 *
 * @param {string} templateId - The template to load
 * @returns {object} The mapping of names to contents
 */
export default function loadTemplate(templateId: string): Object {
  if (!validate.templateExists(templateId)) {
    errors.templateNotFound(templateId);
  }

  const { libraryPath } = loadGlobalConfig();
  const cytoConfig: Object = loadCytoConfig(templateId);

  return cytoConfig.dependencies.reduce((accum: Object, dep: any) => {
    if (types.isArray(dep)) {
      const [name, depTemplateId] = dep;

      return {
        ...accum,
        [name]: file.loadUTF8FileSafe(
          path.join(libraryPath, depTemplateId, name),
        ),
      };
    }

    return accum;
  }, {});
}
