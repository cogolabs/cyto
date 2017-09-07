/* @flow */
/**
 * fatal.test.js
 * Written by: Connor Taylor
 */
 import fatal from './fatal';

describe('fatal', () => {
  it('throws an error when called', () => {
    expect(() => fatal('Test')).toThrow();
  });
});
