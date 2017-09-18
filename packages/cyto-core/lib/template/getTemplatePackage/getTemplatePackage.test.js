/* @flow */
/**
 * getTemplatePackage.test.js
 * Written by: Connor Taylor
 */
import getTemplatePackage from './getTemplatePackage';

const VALID_ID = 'foo-bar';
const INVALID_IDS = [
  1,
];


describe('getTemplatePackage', () => {
  it('succeeds if given a valid templateId', () => {
    getTemplatePackage(VALID_ID);
  });

  it('fails for each invalid id', () => {
    INVALID_IDS.forEach((id) => {
      expect(() => getTemplatePackage(id)).toThrow();
    });
  })
});
