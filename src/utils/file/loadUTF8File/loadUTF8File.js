/* @flow */
/**
 * loadUTF8File.js
 * Written by: Connor Taylor
 */
import fs from 'fs';

/**
 * Reads a UTF8 file and returns its contents. Purely for convenience
 *
 */
export default function loadUTF8File(p) {
  return fs.readFileSync(p, { encoding: 'utf8' });
}
