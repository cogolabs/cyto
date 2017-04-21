/* @flow */
/**
 * create.js
 * Written by: Connor Taylor
 */
import fs from 'fs';
import path from 'path';
import mkdirp from 'mkdirp';

import generateTemplate from '../../template/generateTemplate';
import loadGlobalConfig from '../../configs/loadGlobalConfig';

/**
 * `create`. Does x when envoked. The arguments listed below are meant to be
 * passed via the command line.
 *
 */
export default function create(program: Object) {
  program
    .command('create <id>')
    .description('Create a new cyto template')
    .action(async (id) => {
      const { libraryPath: outputRoot, author } = loadGlobalConfig();

      const generatedTemplate = await generateTemplate({
        templateString: 'cyto/template',
        args: { id, author },
        outputRoot: '',
        skipRendering: true,
      });

      Object.keys(generatedTemplate).forEach((filePath) => {
        const outputPath = path.join(outputRoot, filePath);
        const contents = generatedTemplate[filePath];

        mkdirp.sync(path.dirname(outputPath));
        fs.writeFileSync(outputPath, contents);
      });
    });
}
