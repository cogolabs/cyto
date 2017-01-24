/* @flow */
/**
 * error.test.js
 * Written by: Connor Taylor
 */
import error from './error';

describe('error', () => {
  const mockError = jest.fn();
  console.error = mockError;

  afterEach(() => {
    mockError.mockClear();
  })

  it('calls console.error', () => {
    error('Test');
    expect(mockError).toBeCalled();
  });

  it('supports different prefixes', () => {
    error('Test', 'custom-prefix')
    expect(mockError.mock.calls[0][0].includes('custom-prefix')).toBe(true);
  });
});
