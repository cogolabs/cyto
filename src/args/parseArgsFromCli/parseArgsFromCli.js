/* @flow */
/**
 * parseArgsFromCli.js
 * Written by: Connor Taylor
 */
import loadGlobalConfig from '../../configs/loadGlobalConfig';

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
      // if (tokens.length !== 2) {
      //   log.error(`Invalid argument ${a}`);
      //   log.info('Valid args are in the form: key=value');
      //   process.exit();
      // }

      if (tokens[1].includes(',')) {
        const listArgs = tokens[1].split(',').filter((x) => x);
        return [
          tokens[0],
          listArgs.map((a) => ({ id: a })),
        ];
      }

      return tokens;
    })
    .reduce((accum, [key, val]) => Object.assign(accum, { [key]: val }), {
      author,
      id,
    });
}
