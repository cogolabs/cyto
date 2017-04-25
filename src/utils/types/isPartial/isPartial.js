/* @flow */
/**
 * isPartial.js
 * Written by: Connor Taylor
 */
import isArray from '../isArray';

/**
 * Checks if a given cyto config can be used as a partial. A partial must have
 * exactly one string dependency and cannot have the createDirectory flag set
 * @param { Object } cytoConfig - The config to validate
 *
 * @returns { bool } True if the cyto config can be used as a partial
 */
export default function isPartial({ dependencies }) {
  return dependencies.length === 1 && isArray(dependencies[0]);
}
