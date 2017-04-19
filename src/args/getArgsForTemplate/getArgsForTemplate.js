/* @flow */
/**
 * getArgsForTemplate.js
 * Written by: Connor Taylor
 */
import types from '../../utils/types';

import promptForArg from '../promptForArg';
import parseListArg from '../parseListArg';

import synchReduce from '../../utils/func/synchReduce';

/**
 * Gets the set of arguments that a template needs to render itself. Prompts
 * for any arguments that were not provided initially.
 */
export default async function getArgsForTemplate(cytoConfig, args) {
  const getArg = async (accum, arg) => {
    const value = accum[arg.id] // Was a value already set?
      ? { [arg.id]: accum[arg.id] }
      : arg.dontPrompt // Should we avoid prompting and use the default?
        ? { [arg.id]: arg.default }
        : await promptForArg(arg);

    const parsedValue = arg.type === 'list' && !types.isArray(value)
      ? { [arg.id]: parseListArg(value[arg.id]) }
      : value;

    return { ...accum, ...parsedValue };
  };

  return synchReduce(cytoConfig.args, getArg, {
    ...args,
    id: args.id,
    author: args.author,
  });
}
