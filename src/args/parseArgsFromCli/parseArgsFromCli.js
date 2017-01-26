/* @flow */
/**
 * parseArgsFromCli.js
 * Written by: Connor Taylor
 */
import parseListArg from '../parseListArg';
import loadGlobalConfig from '../../configs/loadGlobalConfig';
import errors from '../../utils/errors';
/**
 * Parses the arguments passed on the command line
 *
 * @param {Array} args - The raw list of args from the command line
 * @returns {Object} The parsed arg object
 */
export default function parseArgsFromCli(args, id) {
  const { author } = loadGlobalConfig();
  return args
    .map((arg) => {
      const tokens = arg.split('=');
      if (tokens.length !== 2) {
        errors.invalidArgSyntax(arg);
      }

      const [key, value] = tokens;
      if (value.includes(',')) {
        return [key, parseListArg(value)];
      }

      return tokens;
    })
    .reduce((accum, [key, val]) => Object.assign(accum, { [key]: val }), {
      author,
      id,
    });
}
