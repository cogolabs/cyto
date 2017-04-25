/* @flow */
/**
 * isPartial.js
 * Written by: Connor Taylor
 */
import isArray from '../isArray';

/**
 * Checks if a given cyto config can be used as a partial. A partial must have
 * exactly one string dependency and cannot have the createDirectory flag set
 * @param {  } cytoConfig -
 *
 */
export default function isPartial(cytoConfig) {
  if (cytoConfig.dependencies.length !== 1) {
    return false;
  } else if (!isArray(cytoConfig.dependencies[0])) {
    return false;
  }

  return true;
}
