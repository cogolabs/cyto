import parsePartialString from './parsePartialString';


const INVALID_PARTIAL_STRING_1 = 'react-component baz bux';
const INVALID_PARTIAL_STRING_2 = 'react-component';

describe('parsePartialString', () => {
  it('throws an error when there are more than 2 items in a partial tag', () => {
    expect.assertions(1);
    parsePartialString(INVALID_PARTIAL_STRING_1, {}).catch((e) => {
      expect(e instanceof Error).toBe(true);
    });
  });

  it('throws an error when no id is provided by the string or context', () => {
    expect.assertions(1);
    parsePartialString(INVALID_PARTIAL_STRING_2, {}).catch((e) => {
      expect(e instanceof Error).toBe(true);
    });
  })
});
