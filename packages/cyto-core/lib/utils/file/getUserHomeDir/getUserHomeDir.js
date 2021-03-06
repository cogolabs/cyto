/* @flow */
/**
 * getUserHomeDir.js
 * Written by: Connor Taylor
 */

/**
 * Gets the path to the home directory for the current user. Returns the empty
 * string if process.env[$<VAR>] returns a falsey value
 *
 * @returns {string} The path to the home directory
 */
export default function getUserHomeDir() {
  const envVariable = (process.platform === 'win32') ? 'USERPROFILE' : 'HOME';

  return process.env[envVariable] || '';
}
