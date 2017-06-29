/* @flow */
/**
 * loadUTF8File.test.js
 * Written by: Connor Taylor
 */
import mock from 'mock-fs';

import loadUTF8File from './loadUTF8File';

describe('loadUTF8File', () => {
  afterEach(() => {
    mock.restore();
  });

  it('throws an error if a file is not found', () => {
    mock({});
    expect(() => loadUTF8File('/fake/path')).toThrow();
  });

  it('loads a file successfully', () => {
    mock({
      '/fake/path': 'foobar'
    });

    const contents = loadUTF8File('/fake/path');
    expect(contents).toBe('foobar');
  });
});
