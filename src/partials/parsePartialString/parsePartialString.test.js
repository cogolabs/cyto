import parsePartialString from './parsePartialString';

const INVALID_PARTIAL_STRING_1 = 'foo/bar baz bux';
const INVALID_PARTIAL_STRING_2 = 'foo/bar';

describe('parsePartialString', () => {
  it('throws an error when there are more than 2 items in a partial tag', () => {
    expect(parsePartialString(INVALID_PARTIAL_STRING_1, {})).toThrow();
  });

  it('throws an error when no id is provided by the string or context', () => {
    expect(parsePartialString(INVALID_PARTIAL_STRING_2, {})).toThrow();
  })
});
