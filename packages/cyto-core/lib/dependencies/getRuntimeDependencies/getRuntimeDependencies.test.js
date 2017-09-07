/* @flow */
/**
 * getRuntimeDependencies.test.js
 * Written by: Connor Taylor
 */
import getRuntimeDependencies from './getRuntimeDependencies';

import types from '../../utils/types';

import mocks from './mocks';

describe('getRuntimeDependencies', () => {
  it('transforms string dependencies into arrays', () => {
    const deps = getRuntimeDependencies(mocks.VALID_CONFIG, mocks.ARGS);

    deps.forEach((d) => expect(types.isString(d)).toBe(false));
  });

  it('uniques output of function dependencies', () => {
    const deps = getRuntimeDependencies(mocks.VALID_CONFIG, mocks.ARGS);

    // Store a hash about whether we have encountered a dep before
    const uniqueDeps = {
      object: {},
      array: {}
    };

    deps.forEach((d) => {
      if (types.isArray(d)) {
        expect(uniqueDeps.array[d[0]]).toBe(undefined);
        uniqueDeps.array[d[0]] = true;
      } else {
        expect(uniqueDeps.object[d.args.id]).toBe(undefined);
        uniqueDeps.object[d.args.id] = true;
      }
    });
  });

  it('removes functions from the set of dependencies', () => {
    const deps = getRuntimeDependencies(mocks.VALID_CONFIG, mocks.ARGS);

    deps.forEach((d) => expect(types.isFunction(d)).toBe(false));
  });
});
