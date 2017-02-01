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
import parseArgsFromCli from '../../args/parseArgsFromCli';

export default function gen(program: Object) {
  program
    .command('gen <templateId> <id> [args...]')
    .alias('generate')
    .description('Generate a cyto template')
    .option('-o, --output [val]', 'Where to output the template')
    .action((templateString, id, args, options) => {
      generateTemplate({
        templateString,
        args: parseArgsFromCli(args, id),
        outputRoot: path.join(process.cwd(), options.output || ''),
        initialRoot: path.join(process.cwd(), options.output || ''),
      });
    });
}
