/* @flow */
/**
 * mergeArgs.js
 * Written by: Connor Taylor
 */

/**
 * Given 2 cyto configs, creates a new list of arguments by deduping args with
 * the same id. Prefers the args in `config` over `baseConfig`
 *
 * @param {Object} config - The config to prioritize
 * @param {Object} baseConfig - The config to get the initial set of args from
 *
 */
export default function mergeArgs(args, baseArgs) {
  return args.reduce((accum, arg) => {
    const existingArg = accum.find((a) => a.id === arg.id);

    if (existingArg) {
      return [...accum.filter((a) => a.id !== arg.id), arg];
    }

    return [...accum, arg];
  }, baseArgs);
}
