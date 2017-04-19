/* @flow */
/**
 * templateIdMismatch.js
 * Written by: Connor Taylor
 */
import chalk from 'chalk';
import log from '../../log';

/**
 * Fires when there is a difference in the path to a template in the GTL and
 * the templateId in it's cyto.config.js file
 *
 * @param { string } correctId - What the templateId should be
 * @param { string }  givenId - What the templateId in the cyto config is set to
 */
export default function templateIdMismatch(correctId, givenId) {
  log.fatal(`Config for template at ${chalk.green(correctId)} has templateId ${chalk.red(givenId)}.
These must match, please edit the templateId in the cyto.config.js file for ${chalk.green(correctId)}`);
}
