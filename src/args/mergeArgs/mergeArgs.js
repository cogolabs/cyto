/* @flow */
/**
 * mergeArgs.js
 * Written by: Connor Taylor
 */
import _ from 'lodash';

import parseArgsFromDependencies from '../parseArgsFromDependencies';

/**
 * Description of mergeArgs
 * @param {  } config -
 * @param {  } baseConfig -
 *
 */
export default function mergeArgs(config, baseConfig) {
  return config.args.reduce((accum, arg) => {
    if (_.find(accum, ['id', arg.id])) {
      return [
        ...accum.filter((a) => a.id !== arg.id),
        arg,
      ];
    }

    return [...accum, arg];
  }, baseConfig.args);
}
