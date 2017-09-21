/* @flow */
/**
 * isString.test.js
 * Written by: Connor Taylor
 */
import isString from './isString';

describe('isString', () => {
  it('returns true when string', () => {
    expect(isString('')).toBe(true);
  });

  it('returns false when string', () => {
    expect(isString(1)).toBe(false);
    expect(isString([])).toBe(false);
    expect(isString({})).toBe(false);
    expect(isString(() => {})).toBe(false);
    expect(isString(true)).toBe(false);
  });

});
