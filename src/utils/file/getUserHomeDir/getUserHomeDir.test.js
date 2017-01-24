/* @flow */
/**
 * getUserHomeDir.test.js
 * Written by: Connor Taylor
 */
import getUserHomeDir from './getUserHomeDir';

describe('getUserHomeDir', () => {
  it('returns $HOME if not windows', () => {
    process.platform = 'darwin';

    const p = getUserHomeDir();
    expect(p).toEqual(process.env['HOME'] || '');
  });

  it('returns $USERPROFILE on windows', () => {
    process.platform = 'win32';

    const p = getUserHomeDir();
    expect(p).toEqual(process.env['USERPROFILE'] || '');
  });

  it('returns an empty string if the env variable is undefined', () => {
    process.env = {};

    const p = getUserHomeDir();
    expect(p).toEqual('');
  })
});
