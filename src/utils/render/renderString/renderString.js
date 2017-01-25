/* @flow */
/**
 * renderString.js
 * Written by: Connor Taylor
 */
import mustache from 'mustache';

/**
 * Description of renderString
 *
 */
export default function renderString(str, args) {
  mustache.escape = (text) => text;

  return mustache.render(str, args);
}
