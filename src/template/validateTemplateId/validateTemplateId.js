/* @flow */
/**
 * validateTemplateId.js
 * Written by: Connor Taylor
 */
import errors from '../../utils/errors';

/**
 * Takes a string and ensures that it's a valid templateId. Valid templateIds
 * are of the form: "<group>/<name>". Throws an error if the templateId is not
 * valid
 *
 * @param {string} templateId - The string to format
 */
export default function validateTemplateId(templateId) {
  const tokens = templateId.split('/');

  if (tokens.length !== 2) {
    errors.invalidTemplateString(templateId);
  }

  return templateId;
}
