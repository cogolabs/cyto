/* @flow */
/**
 * mergeArgs.test.js
 * Written by: Connor Taylor
 */
import mergeArgs from './mergeArgs';

describe('mergeArgs', () => {
  it('returns the union of the two args objects', () => {
    const args = [
      { id: 'foo' }
    ];
    const baseArgs = [
      { id: 'bar' }
    ];
    const newArgs = mergeArgs(args, baseArgs);

    expect(newArgs).toEqual([
      { id: 'foo' },
      { id: 'bar' },
    ]);
  });

  it('uniques each arg based on the id key, preferring new args', () => {
    const args = [
      { id: 'foo', type: 'list' },

    ];
    const baseArgs = [
      { id: 'foo', type: 'string' }
    ];
    const newArgs = mergeArgs(args, baseArgs);

    expect(newArgs).toEqual([
      { id: 'foo', type: 'list' }
    ]);
  });
});
