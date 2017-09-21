/**
 * validateTemplateArgs.test.js
 * Written by: Connor Taylor
 */
import validateTemplateArgs from './validateTemplateArgs';
import mocks from './mocks';

describe('validateTemplateArgs', () => {
  it('throws if an argument is not an object', () => {
    expect(() => validateTemplateArgs(mocks.NOT_OBJECT)).toThrow();
  });

  it('throws if an argument does not have an id', () => {
    expect(() => validateTemplateArgs(mocks.MISSING_ID)).toThrow();
  });

  it('throws if an argument has an invalid type string', () => {
    expect(() => validateTemplateArgs(mocks.INVALID_TYPE)).toThrow();
  });
});
