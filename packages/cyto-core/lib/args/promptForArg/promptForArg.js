/* @flow */
/**
 * promptForArg.js
 * Written by: Connor Taylor
 */
import inquirer from 'inquirer';

/**
 * Given an arg object, prompts the user for a value for the arg. Currently done
 * through inquirer.js.
 *
 * @param { Object } arg - The arg object to prompt for
 *
 * @returns { Promise } A promise that resolves with the value once the user has
 *  provided one.
 */
export default function promptForArg(arg) {
  const type = arg.type && arg.type === 'boolean'
    ? 'confirm'
    : 'input';

  return inquirer.prompt([
    {
      name: arg.id,
      message: `${arg.id}: `,
      default: arg.default,
      type,
    },
  ]);
}
