/* @flow */
/**
 * validateTemplateId.js
 * Written by: Connor Taylor
 */
import types from '../../utils/types';

/**
 * Takes a string and ensures that it's a valid templateId. Valid templateIds
 * are of the form: "<group>/<name>". Throws an error if the templateId is not
 * valid
 *
 * @param {string} templateId - The string to format
 */
export default function validateTemplateId(templateId) {
  if (!types.isString(templateId)) {
    throw new Error(`${templateId} is not a string`);
  }

  const tokens = templateId.split('/');

  if (tokens.length !== 2) {
    throw new Error(`${templateId} is invalid. A valid templateId is of the form <group>/<name>`);
  }

  return templateId;
}
