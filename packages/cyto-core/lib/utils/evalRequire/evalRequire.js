/**
 * evalRequire.js
 * Written by: Connor Taylor
 */

/**
 * Requires a file using eval to execute the require call. Does this to prevent
 * webpack from trying to process the require statement. This is necessary for
 * template loading. Open to other ideas for how to get around this.
 */
const evalRequire = (pkg) => {
  return eval('require')(pkg); // eslint-disable-line
};

export default evalRequire;
