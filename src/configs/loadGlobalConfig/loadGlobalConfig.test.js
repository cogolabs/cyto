/* @flow */
/**
 * loadGlobalConfig.test.js
 * Written by: Connor Taylor
 */
import mock from 'mock-fs';

import loadGlobalConfig from './loadGlobalConfig';
import getUserHomeDir from '../../utils/file/getUserHomeDir';
import file from '../../utils/file';

describe('loadGlobalConfig', () => {
  it('searches for the global config in the users home directory', () => {
    mock({
      [`${file.getUserHomeDir()}/.cyto/config.json`]: '{}'
    });

    const config = loadGlobalConfig();

    expect(JSON.stringify(config)).toBe('{}');

    mock.restore();
  });

  it('throws an error if the config file does not exist', () => {
    mock({});

    expect(() => loadGlobalConfig()).toThrow();

    mock.restore();
  });
});
