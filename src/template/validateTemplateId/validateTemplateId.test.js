/* @flow */
/**
 * validateTemplateId.test.js
 * Written by: Connor Taylor
 */
import validateTemplateId from './validateTemplateId';

const VALID_ID = 'foo/bar';
const INVALID_IDS = [
  'foo',
  'foo/bar/baz'
];


describe('validateTemplateId', () => {
  it('succeeds if given a valid templateId', () => {
    validateTemplateId(VALID_ID);
  });

  it('fails for each invalid id', () => {
    INVALID_IDS.forEach((id) => {
      expect(() => validateTemplateId(id)).toThrow();
    })
  })
});
