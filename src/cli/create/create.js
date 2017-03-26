/* @flow */
/**
 * create.js
 * Written by: Connor Taylor
 */
import fs from 'fs';
import path from 'path';
import mkdirp from 'mkdirp';

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
    .action(async (id, args) => {
      const formattedId = formatTemplateString(id);
      const generatedTemplate = await generateTemplate({
        templateString: 'cyto/template',
        args: parseArgsFromCli(args, formattedId),
        outputRoot: '',
        skipRendering: true,
      });

      const outputRoot = process.cwd();

      Object.keys(generatedTemplate).forEach((filePath) => {
        const outputPath = path.join(outputRoot, filePath);
        const contents = generatedTemplate[filePath];

        mkdirp.sync(path.dirname(outputPath));
        fs.writeFileSync(outputPath, contents);
      });
    });
}
