/* @flow */
/**
 * create.js
 * Written by: Connor Taylor
 */
import path from 'path';

import parseArgsFromCli from '../../args/parseArgsFromCli';
import generateTemplate from '../../template/generateTemplate';
import formatTemplateString from '../../template/formatTemplateString';

/**
 * `create`. Does x when envoked. The arguments listed below are meant to be
 * passed via the command line.
 *
 */
export default function create(program: Object) {
  program
    .command('create <id> [...args]')
    .description('Create a new cyto template')
    .action((id, args) => {
      const formattedId = formatTemplateString(id);
      generateTemplate({
        templateString: 'cyto/template',
        args: parseArgsFromCli(args, formattedId),
        outputRoot: process.cwd(),
      });
    });
}
