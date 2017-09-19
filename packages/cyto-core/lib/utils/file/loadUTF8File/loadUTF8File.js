/**
 * loadUTF8File.js
 * Written by: Connor Taylor
 */
import fs from 'fs';
import memoize from 'mem';

/**
 * Reads a UTF8 file and returns its contents. Memoizes the result for future
 * reads
 */
const loadUTF8File = (p) => fs.readFileSync(p, { encoding: 'utf8' });

export default memoize(loadUTF8File);
