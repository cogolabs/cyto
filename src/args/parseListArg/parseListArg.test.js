/* @flow */
/**
 * parseListArg.test.js
 * Written by: Connor Taylor
 */
import parseListArg from './parseListArg';

describe('parseListArg', () => {
  it('handles string input with commas', () => {
    const result = parseListArg('1, 2');

    expect(result).toEqual([{ id: '1' }, { id: '2' }]);
  });

  it('handles string input without commas', () => {
    const result = parseListArg('1 2');

    expect(result).toEqual([{ id: '1 2' }]);
  });

  it('handles unformatted array input', () => {
    const result = parseListArg([1, 2]);

    expect(result).toEqual([{ id: 1 }, { id: 2 }]);
  });

  it('handles formatted array input', () => {
    const result = parseListArg([{ id: 1 }, { id: 2 }]);

    expect(result).toEqual([{ id: 1 }, { id: 2 }]);

  });
});
