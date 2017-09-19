/**
 * getAuthorArg.js
 * Written by: Connor Taylor
 */
import path from 'path';
import ini from 'ini';

import getUserHomeDir from '../../utils/file/getUserHomeDir';
import loadUTF8FileSafe from '../../utils/file/loadUTF8FileSafe';

/*
 * Gets the git user name for the current user to be supplied for the author
 * arg. Will eventually support more methods for getting the users name.
 * Currently returns the empty string due to config issues
 */
const getAuthorArg = () => {
  const configPath = path.resolve(getUserHomeDir(), '.gitconfig');
  const fileContents = loadUTF8FileSafe(configPath);


  return fileContents
    ? ini.parse(fileContents).user.name
    : fileContents;
};

export default getAuthorArg;
