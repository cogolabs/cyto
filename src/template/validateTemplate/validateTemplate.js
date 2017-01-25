/* @flow */
/**
 * validateTemplate.js
 * Written by: Connor Taylor
 */
import errors from '../../utils/errors';
import validate from '../../utils/validate';

/**
 * Ensures that the given templateString corresponds to a valid template. This
 * involves checking 2 things:
 *
 *  1. The template referred to by the templateString exists
 *  2. The template contains a valid cyto.config.js
 *
 * This is not meant to return anything, any problems with the above are fatal
 * errors that will trigger a process.exit(1) call. The templateString is
 * expected to be valid (<namespace>/<name>)
 *
 * @param {string} templateId - The template to validate
 */
export default function validateTemplate(templateId) {
  if (!validate.templateExists(templateId)) {
    errors.templateNotFound(templateId);
  }
}
