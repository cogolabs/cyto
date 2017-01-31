/* @flow */
/**
 * getArgsForTemplate.js
 * Written by: Connor Taylor
 */
import types from '../../utils/types';

import promptForArg from '../promptForArg';
import parseListArg from '../parseListArg';

/**
 * Gets the set of arguments that a template needs to render itself. Prompts
 * for any arguments that were not provided initially.
 */
export default async function getArgsForTemplate(cytoConfig, args) {
  const synchronousPrompt = async ([arg, ...rest], templateArgs) => {
    // Base case, return once we've processed all arguments
    if (!arg) {
      return templateArgs;
    }

    const value = args[arg.id] // Was a value already set?
      ? { [arg.id]: args[arg.id] }
      : arg.dontPrompt // Should we avoid prompting and use the default?
        ? { [arg.id]: arg.default }
        : await promptForArg(arg);

    const parsedValue = arg.type === 'list' && !types.isArray(value)
      ? { [arg.id]: parseListArg(value[arg.id]) }
      : value;

    return synchronousPrompt(rest, Object.assign(templateArgs, parsedValue));
  };

  return synchronousPrompt(cytoConfig.args, {
    id: args.id,
    author: args.author,
  });
}
