/* @flow */
/**
 * isObject.test.js
 * Written by: Connor Taylor
 */
import isObject from './isObject';

describe('isObject', () => {
  it('returns true when object', () => {
    expect(isObject({})).toBe(true);
  });

  it('returns false when not an object', () => {
    expect(isObject(1)).toBe(false);
    expect(isObject('')).toBe(false);
    expect(isObject(() => {})).toBe(false);
    expect(isObject(true)).toBe(false);

    // Since Cyto needs to differentiate between plain objects and arrays,
    // isObject must return false when given an array
    expect(isObject([])).toBe(false);
  });
});
