/* @flow */
/**
 * getTemplatePackage.test.js
 * Written by: Connor Taylor
 */
import getTemplatePackage from './getTemplatePackage';

import * as evalRequire from '../../utils/evalRequire';

const GLOBAL_SCOPE_ID = 'foo-bar';
const SCOPED_ID = '@taylorc93/foo-bar';
const INVALID_IDS = [
  1,
  {},
  true,
  () => {},
];


describe('getTemplatePackage', () => {
  it('handles global scope packages', () => {
    evalRequire.default = jest.fn();
    const pkgString = getTemplatePackage(GLOBAL_SCOPE_ID);

    expect(pkgString).toEqual('cyto-template-foo-bar');
  });

  it('handles scoped packages', () => {
    evalRequire.default = jest.fn();
    const pkgString = getTemplatePackage(SCOPED_ID);

    expect(pkgString).toEqual('@taylorc93/cyto-template-foo-bar');
  });

  it('fails if templateId is not a string', () => {
    INVALID_IDS.forEach((id) => {
      expect(() => getTemplatePackage(id)).toThrow();
    });
  })
});
