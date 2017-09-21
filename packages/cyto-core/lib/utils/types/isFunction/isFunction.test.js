/* @flow */
/**
 * isFunction.test.js
 * Written by: Connor Taylor
 */
import isFunction from './isFunction';

describe('isFunction', () => {
  it('returns true when function', () => {
    expect(isFunction(() => {})).toBe(true);
  });

  it('returns false when not a function', () => {
    expect(isFunction(1)).toBe(false);
    expect(isFunction('')).toBe(false);
    expect(isFunction({})).toBe(false);
    expect(isFunction([])).toBe(false);
    expect(isFunction(true)).toBe(false);
  })
});
