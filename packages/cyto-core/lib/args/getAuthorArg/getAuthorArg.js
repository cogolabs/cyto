/**
 * getAuthorArg.js
 * Written by: Connor Taylor
 */
import getUsername from 'git-user-name';

/*
 * Gets the git user name for the current user to be supplied for the author
 * arg. Will eventually support more methods for getting the users name.
 */
const getAuthorArg = () => getUsername();

export default getAuthorArg;
