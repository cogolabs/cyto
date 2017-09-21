/**
 * loadUTF8FileSafe.js
 * Written by: Connor Taylor
 */
import memoize from 'mem';
import loadUTF8File from '../loadUTF8File';

/**
 * Safe version of loadUTF8File, this catches any errors and returns an empty
 * string. Otherwise, returns the files contents
 *
 * @param {string} p - The path to the file
 * @returns {string} The files contents, or '' if there was an error
 */
const loadUTF8FileSafe = (p) => {
  try {
    return loadUTF8File(p);
  } catch (e) {
    return '';
  }
};

export default memoize(loadUTF8FileSafe);

