/* @flow */
/**
 * warn.test.js
 * Written by: Connor Taylor
 */
import warn from './warn';

describe('warn', () => {
  const mockWarn = jest.fn();
  console.warn = mockWarn;

  afterEach(() => {
    mockWarn.mockClear();
  })

  it('calls console.warn', () => {
    warn('Test');
    expect(mockWarn).toBeCalled();
  });

  it('supports different prefixes', () => {
    warn('Test', 'custom-prefix')
    expect(mockWarn.mock.calls[0][0].includes('custom-prefix')).toBe(true);
  });
});
