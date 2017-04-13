/* @flow */
/**
 * formatTemplateString.js
 * Written by: Connor Taylor
 */
import errors from '../../utils/errors';

/**
 * Takes a string and ensures that it's a valid templateString
 * (<namespace>/<name>). Mainly used to handle the case where a user provided
 * <name>, implying that the template is under their personal org.
 *
 * @param {string} templateString - The string to format
 * @returns {string} The formatted
 */
export default function formatTemplateString(templateString: string): string {
  const tokens = templateString.split('/');

  if (tokens.length !== 2) {
    errors.invalidTemplateString(templateString);
  }

  return templateString;
}
