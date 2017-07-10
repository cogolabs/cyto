/**
 * getRuntimeArgs.js
 * Written by: Connor Taylor
 *
 * Gets the runtime argument values
 */
import types from '../../utils/types';

/**
 * Given a cyto config and the set of arguments supplied thus far, returns a new
 * set of arguments after generating the value for each runtime argument.
 */
const getRuntimeArgs = (cytoConfig, suppliedArgs) => {
  const runtimeArgs = cytoConfig.args.filter((a) => {
    return a.type !== 'function' && types.isFunction(a.default);
  });

  return runtimeArgs.reduce((accum, a) => {
    return {
      ...accum,
      [a.id]: a.default(suppliedArgs),
    };
  }, suppliedArgs);
};

export default getRuntimeArgs;
