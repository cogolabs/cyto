/* @flow */
/**
 * debug.test.js
 * Written by: Connor Taylor
 */
import debug from './debug';

describe('debug', () => {
  const mockInfo = jest.fn();
  console.info = mockInfo;

  afterEach(() => {
    mockInfo.mockClear();
  })

  it('calls console.info', () => {
    debug('Test');
    expect(mockInfo).toBeCalled();
  });

  it('supports different prefixes', () => {
    debug('Test', 'custom-prefix')
    expect(mockInfo.mock.calls[0][0].includes('custom-prefix')).toBe(true);
  });
});
