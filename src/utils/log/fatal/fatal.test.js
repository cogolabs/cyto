/* @flow */
/**
 * fatal.test.js
 * Written by: Connor Taylor
 */
 import fatal from './fatal';

describe('fatal', () => {
  const mockError = jest.fn();
  const mockQuit = jest.fn();
  console.error = mockError;
  process.exit = mockQuit;

  afterEach(() => {
    mockError.mockClear();
    mockQuit.mockClear();
  })

  it('calls console.error and process.exit', () => {
    fatal('Test');
    expect(mockError).toBeCalled();
    expect(mockQuit).toBeCalled();
  });

  it('supports different prefixes', () => {
    fatal('Test', 'custom-prefix')
    console.log(mockError.mock.calls);
    expect(mockError.mock.calls[0][0].includes('custom-prefix')).toBe(true);
  });
});
