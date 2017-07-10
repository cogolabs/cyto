/* @flow */
/**
 * getArgsForTemplate.js
 * Written by: Connor Taylor
 */
import pick from 'lodash/pick';

import types from '../../utils/types';

import promptForArg from '../promptForArg';
import parseListArg from '../parseListArg';
import getRuntimeArgs from '../getRuntimeArgs';

import types from '../../utils/types';
import synchReduce from '../../utils/func/synchReduce';

/**
 * Gets the set of arguments that a template needs to render itself. Prompts
 * for any arguments that were not provided initially.
 */
export default async function getArgsForTemplate(cytoConfig, args) {
  const getArg = async (accum, arg) => {
    // Runtime args are handled later. The user should not be prompted for them.
    const isRuntimeArg = arg.type !== 'function' && types.isFunction(arg.default);

    console.log(arg);
    console.log(isRuntimeArg);

    const value = accum[arg.id] !== undefined // Was a value already set?
      ? { [arg.id]: accum[arg.id] }
      : arg.dontPrompt || isRuntimeArg // Should we stick with the default?
        ? { [arg.id]: arg.default }
        : await promptForArg(arg);

    const parsedValue = arg.type === 'list' && !types.isArray(value[arg.id])
      ? { [arg.id]: parseListArg(value[arg.id]) }
      : value;

    return { ...accum, ...parsedValue };
  };

  const baseArgs = cytoConfig.base && cytoConfig.base.args
    ? cytoConfig.base.args
    : {};
  const cytoArgs = pick(args, ['id', 'author', 'isPartial']);

  const promptedArgs = synchReduce(cytoConfig.args, getArg, {
    ...baseArgs,
    ...args,
    ...cytoArgs,
  });

  return getRuntimeArgs(cytoConfig, promptedArgs);
}
