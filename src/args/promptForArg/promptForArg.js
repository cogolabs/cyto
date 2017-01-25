/* @flow */
/**
 * promptForArg.js
 * Written by: Connor Taylor
 */
import inquirer from 'inquirer';

/**
 * Description of promptForArg
 *
 */
export default function promptForArg(arg, templateId) {
  return inquirer.prompt([
    {
      name: arg.id,
      message: `${arg.id} for ${templateId}`,
    },
  ]);
}
