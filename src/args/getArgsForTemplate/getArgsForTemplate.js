/* @flow */
/**
 * getArgsForTemplate.js
 * Written by: Connor Taylor
 */
// import promptForArg from '../promptForArg';
// import errors from '../../utils/errors';

/**
 * Description of getArgsForTemplate
 *
 */
export default function getArgsForTemplate(cytoConfig, args) {
  return cytoConfig.args.reduce((accum, arg) => { //eslint-disable-line
    const value = args[arg.id]
      ? args[arg.id]
      : arg.default;

    return Object.assign(accum, { [arg.id]: value });
  }, {
    id: args.id,
    author: args.author,
  });
}
