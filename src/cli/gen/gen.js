/* @flow */
/**
 * gen.js
 * Written by: Connor Taylor
 */

/**
 * `gen`. Does x when envoked. The arguments listed below are meant to be
 * passed via the command line.
 *
 */
import path from 'path';
import generateTemplate from '../../template/generateTemplate';

export default function gen(program: Object) {
  program
    .command('gen <templateId> <id> [args...]')
    .description('Generate a template and all of its dependencies using the provided args')
    .option('-o, --output [val]', 'Where to output the template')
    .action((templateString, id, args, options) => {
      generateTemplate({
        templateString,
        args: Object.assign(args, { id }),
        outputRoot: path.join(process.cwd(), options.output || ''),
      });
    });
}
