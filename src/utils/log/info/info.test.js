/* @flow */
/**
 * info.test.js
 * Written by: Connor Taylor
 */
import info from './info';

describe('info', () => {
  const mockInfo = jest.fn();
  console.info = mockInfo;

  afterEach(() => {
    mockInfo.mockClear();
  })

  it('calls console.info', () => {
    info('Test');
    expect(mockInfo).toBeCalled();
  });

  it('supports different prefixes', () => {
    info('Test', 'custom-prefix')
    expect(mockInfo.mock.calls[0][0].includes('custom-prefix')).toBe(true);
  });
});
