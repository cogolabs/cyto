/**
 * getRuntimeArgs.js
 * Written by: Connor Taylor
 *
 * Gets the runtime argument values
 */
import isRuntimeArg from '../isRuntimeArg';

/**
 * Given a cyto config and the set of arguments supplied thus far, returns a new
 * set of arguments after generating the value for each runtime argument.
 */
const getRuntimeArgs = (cytoConfig, suppliedArgs) => {
  return cytoConfig
    .args
    .filter(isRuntimeArg)
    .reduce((accum, a) => {
      return {
        ...accum,
        [a.id]: a.default(suppliedArgs),
      };
    }, suppliedArgs);
};

export default getRuntimeArgs;
