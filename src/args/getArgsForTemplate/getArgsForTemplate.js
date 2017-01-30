/* @flow */
/**
 * getArgsForTemplate.js
 * Written by: Connor Taylor
 */
import promptForArg from '../promptForArg';
import parseListArg from '../parseListArg';

/**
 * Gets the set of arguments that a template needs to render itself. Prompts for
 * any arguments that were not provided initially.
 */
export default async function getArgsForTemplate(cytoConfig, args) {
  const synchronousPrompt = async ([arg, ...rest], templateArgs) => {
    if (!arg) {
      return templateArgs;
    }

    let value = args[arg.id] ? args[arg.id] : undefined;
    if (!value) {
      value = arg.dontPrompt
        ? { [arg.id]: arg.default }
        : await promptForArg(arg);
    }

    const parsedValue = arg.type === 'list'
      ? { [arg.id]: parseListArg(value[arg.id]) }
      : value;

    return synchronousPrompt(rest, Object.assign(templateArgs, parsedValue));
  };

  return synchronousPrompt(cytoConfig.args, {
    id: args.id,
    author: args.author,
  });
}
