/* @flow */
/**
 * getTemplatePackage.test.js
 * Written by: Connor Taylor
 */
import getTemplatePackage from './getTemplatePackage';

import * as evalRequire from '../../utils/evalRequire';

const VALID_ID = 'foo-bar';
const INVALID_IDS = [
  1,
  {},
  true,
  () => {},
];


describe('getTemplatePackage', () => {
  it('succeeds if given a valid templateId', () => {
    evalRequire.default = jest.fn();
    getTemplatePackage(VALID_ID);
  });

  it('fails for each invalid id', () => {
    INVALID_IDS.forEach((id) => {
      expect(() => getTemplatePackage(id)).toThrow();
    });
  })
});
