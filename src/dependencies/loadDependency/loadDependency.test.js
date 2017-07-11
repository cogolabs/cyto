/* @flow */
/**
 * loadDependency.test.js
 * Written by: Connor Taylor
 */
import mock from 'mock-fs';
import file from '../../utils/file';

import loadDependency from './loadDependency';

const mockFs = {
  [`${file.getUserHomeDir()}/.cyto/config.json`]: `{
    "libraryPath": "/library"
  }`,
  "/library/foo/bar/item.js": '{{id}} is a dependency',
}

describe('loadDependency', () => {
  afterEach(() => mock.restore());

  it('loads the unrendered dependency file', () => {
    mock(mockFs);

    const dep = loadDependency(['item.js', 'foo/bar']);
    expect(dep).toEqual('{{id}} is a dependency');
  });

  it('returns the empty string if a dependency is not found', () => {
    mock(mockFs);

    const dep = loadDependency(['foo.js', 'foo/bar']);
    expect(dep).toEqual('');
  });
});
