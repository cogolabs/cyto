/* @flow */
/**
 * invalidTemplateString.js
 * Written by: Connor Taylor
 */
import log from '../../log';

/**
 * Logs an error related to an invalid template string
 *
 */
export default function invalidTemplateString(str) {
  log.fatal(
    `Invalid template string ${str}.
Valid template strings are in the form: '<org>/<name>'.
<org> may be omitted if you intend to load the template from the org in
your config.json file created by 'cyto config'`,
  );
}
