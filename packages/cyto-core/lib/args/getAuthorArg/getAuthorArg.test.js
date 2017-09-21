import mock from 'mock-fs';

import getAuthorArg from './getAuthorArg';
import * as getUserHomeDir from '../../utils/file/getUserHomeDir';

const fakeConfig = `
[user]
  name = Connor Taylor
  email = foo@bar.com

[filter "spabs"]
    clean = expand -t 4
    smudge = expand -t 4
    required
[merge]
    renormalize = true
[color]
  ui = always
[log]
  abbrevCommit = true
[status]
  short = true
  branch = true
`;

// // Do this to prevent memoization from screwing with the test
// getUserHomeDir
//   .mockReturnValueOnce('/a')
//   .mockReturnValueOnce('/b');

describe('getAuthorArg', () => {
  it('returns the author when a config is present', () => {
    getUserHomeDir.default = () => '/a';
    console.log(getUserHomeDir.default);
    mock({
      '/a/.gitconfig': fakeConfig,
    });

    const contents = getAuthorArg();
    expect(contents).toBe('Connor Taylor');

    mock.restore();
  });

  it('loads a file if it exists', () => {
    getUserHomeDir.default = () => '/b';
    mock({});

    const contents = getAuthorArg();
    expect(contents).toBe('');

    mock.restore();
  });
});
