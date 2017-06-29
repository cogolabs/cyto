/* @flow */
/**
 * writeTemplate.test.js
 * Written by: Connor Taylor
 */
import fs from 'fs';
import mock from 'mock-fs';

import writeTemplate from './writeTemplate';

describe('writeTemplate', () => {
  afterEach(() => {
    mock.restore();
  })

  it('adds outputRoot to the beginning of each file', () => {
    mock({});
    const generatedTemplate = {
      'foo/bar': 'baz'
    };
    const outputRoot = '/test'

    writeTemplate(generatedTemplate, outputRoot);
    const file = fs.readFileSync('/test/foo/bar', { encoding: 'utf8' });

    expect(file).toEqual('baz');

  });
});
