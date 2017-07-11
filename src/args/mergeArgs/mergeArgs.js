/* @flow */
/**
 * mergeArgs.js
 * Written by: Connor Taylor
 */
import uniqBy from 'lodash/uniqBy';

/**
 * Given 2 cyto configs, creates a new list of arguments by deduping args with
 * the same id. Prefers the args in `config` over `baseConfig`
 *
 * @param {Object} config - The config to prioritize
 * @param {Object} baseConfig - The config to get the initial set of args from
 */
export default function mergeArgs(args, baseArgs) {
  return uniqBy([...args, ...baseArgs], 'id');
}
