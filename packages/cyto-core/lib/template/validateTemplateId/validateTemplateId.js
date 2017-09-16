/* @flow */
/**
 * validateTemplateId.js
 * Written by: Connor Taylor
 */
import types from '../../utils/types';
import evalRequire from '../../utils/evalRequire';

/**
 * Takes a string and ensures that it's a valid templateId by checking that the
 * package is present in the user's node_modules folder. Returns the package
 * name to load for the template
 *
 * @param {string} templateId - The string to format
 */
export default function validateTemplateId(templateId) {
  if (!types.isString(templateId)) {
    throw new Error(`${templateId} is not a string`);
  }

  const packageName = `cyto-template-${templateId}`;

  try {
    evalRequire(packageName); // eslint-disable-line

    return packageName;
  } catch (e) {
    throw new Error(`Could not find template ${packageName} in node_modules`);
  }
}
