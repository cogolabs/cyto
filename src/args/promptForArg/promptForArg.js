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
export default function promptForArg(arg, templateId, id) {
  return inquirer.prompt([
    {
      name: arg.id,
      message: `${templateId}: ${id} -- ${arg.id}`,
      default: arg.default || undefined,
    },
  ]);
}
