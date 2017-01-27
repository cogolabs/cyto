/* @flow */
/**
 * loadUTF8File.js
 * Written by: Connor Taylor
 */
import fs from 'fs';

// The local cache that is used to store previously read files
const cache = {};

/**
 * Reads a UTF8 file and returns its contents. Memoizes the result for future
 * reads
 */
export default function loadUTF8File(p) {
  if (cache[p]) {
    return cache[p];
  }

  const contents = fs.readFileSync(p, { encoding: 'utf8' });
  cache[p] = contents;

  return contents;
}
