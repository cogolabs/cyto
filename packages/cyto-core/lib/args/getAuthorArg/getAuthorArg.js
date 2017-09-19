/**
 * getAuthorArg.js
 * Written by: Connor Taylor
 */
import path from 'path';
import ini from 'ini';

import getUserHomeDir from '../../utils/file/getUserHomeDir';
import loadUTF8File from '../../utils/file/loadUTF8File';

/*
 * Gets the git user name for the current user to be supplied for the author
 * arg. Will eventually support more methods for getting the users name.
 * Currently returns the empty string due to config issues
 */
const getAuthorArg = () => {
  const configPath = path.resolve(getUserHomeDir(), '.gitconfig');
  const config = ini.parse(loadUTF8File(configPath));

  return config.user.name;
};

export default getAuthorArg;
