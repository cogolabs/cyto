/* @flow */
/**
 * getArgsForTemplate.js
 * Written by: Connor Taylor
 */
import pick from 'lodash/pick';

import promptForArg from '../promptForArg';
import parseListArg from '../parseListArg';

import synchReduce from '../../utils/func/synchReduce';

/**
 * Gets the set of arguments that a template needs to render itself. Prompts
 * for any arguments that were not provided initially.
 */
export default async function getArgsForTemplate(cytoConfig, args) {
  const getArg = async (accum, arg) => {
    const value = accum[arg.id] !== undefined // Was a value already set?
      ? { [arg.id]: accum[arg.id] }
      : arg.dontPrompt // Should we avoid prompting and use the default?
        ? { [arg.id]: arg.default }
        : await promptForArg(arg);

    const parsedValue = arg.type === 'list'
      ? { [arg.id]: parseListArg(value[arg.id]) }
      : value;

    return { ...accum, ...parsedValue };
  };

  const baseArgs = cytoConfig.base && cytoConfig.base.args
    ? cytoConfig.base.args
    : {};
  const cytoArgs = pick(args, ['id', 'author', 'isPartial']);

  return synchReduce(cytoConfig.args, getArg, {
    ...baseArgs,
    ...args,
    ...cytoArgs,
  });
}
