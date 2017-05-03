/* @flow */
/**
 * parseArgsFromDependencies.js
 * Written by: Connor Taylor
 */
import mustache from 'mustache';
import uniqBy from 'lodash/uniqBy';

import types from '../../utils/types';

import loadDependency from '../../dependencies/loadDependency';

/**
 * Takes a set of dependencies, reads the files associated with them, and
 * extracts the args required for each.
 *
 * @param {Array} dependencies - The dependencies to read from
 * @returns {Array} The collection of argument objects extracted from each file
 */
export default function parseArgsFromDependencies(dependencies) {
  return dependencies
    .filter((dep) => types.isArray(dep))
    .reduce((accum, dep) => {
      const contents = loadDependency(dep);
      const tokens = mustache.parse(contents)
        .filter((x) => x[0] !== 'text')
        .map((x) => ({ id: x[1] }))
        .filter((x) => x.id !== 'author' && x.id !== 'id'); // Provided by cyto

      return [
        ...accum.filter((x) => !tokens.includes(x)),
        ...uniqBy(tokens, 'id'),
      ];
    }, []);
}
