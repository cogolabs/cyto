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
export default function getArgsForTemplate(cytoConfig, args) {
  const templateArgs = cytoConfig.args.reduce((accum, arg) => {
    return args[arg.id]
      ? Object.assign(accum, { [arg.id]: args[arg.id] })
      : arg.default && arg.dontPrompt
        ? Object.assign(accum, { [arg.id]: arg.default })
        : accum;
  }, { id: args.id, author: args.author });

  const promptArgs = cytoConfig.args
    .filter((arg) => !Object.keys(templateArgs).includes(arg.id));

  return new Promise((resolve) => {
    const synchronousPrompt = ([arg, ...rest]) => {
      if (!arg) {
        resolve(templateArgs);
        return;
      }

      promptForArg(arg).then((result) => {
        templateArgs[arg.id] = arg.type === 'list'
          ? parseListArg(result[arg.id])
          : result[arg.id];

        synchronousPrompt(rest);
      });
    };

    synchronousPrompt(promptArgs);
  });
}
