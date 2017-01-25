/* @flow */
/**
 * missingRequiredArg.js
 * Written by: Connor Taylor
 */
import log from '../../log';

/**
 * Description of missingRequiredArg
 * @param {object} arg - The argument that's missing
 * @param {string} templateId - The template the arg is part of
 *
 */
export default function missingRequiredArg(arg, templateId) {
  log.fatal(`Missing required arg ${arg.id} for ${templateId}`);
}
