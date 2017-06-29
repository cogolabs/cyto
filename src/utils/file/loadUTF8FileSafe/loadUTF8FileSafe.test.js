/* @flow */
/**
 * loadUTF8FileSafe.test.js
 * Written by: Connor Taylor
 */
import mock from 'mock-fs';

import loadUTF8File from '../loadUTF8File';
import loadUTF8FileSafe from '../loadUTF8FileSafe';

describe('loadUTF8FileSafe', () => {
  it('returns the empty string on an error', () => {
    mock({});

    const contents = loadUTF8FileSafe('/fake/path');

    expect(contents).toBe('');

    mock.restore();
  });

  it('loads a file if it exists', () => {
    mock({
      '/fake/path': 'foobar'
    });

    const contents = loadUTF8FileSafe('/fake/path');

    expect(contents).toBe('foobar');

    mock.restore();
  })
});
