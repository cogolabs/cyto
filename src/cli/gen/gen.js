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
import fs from 'fs';
import path from 'path';
import mkdirp from 'mkdirp';

import generateTemplate from '../../template/generateTemplate';
import loadGlobalConfig from '../../configs/loadGlobalConfig';

export default function gen(program: Object) {
  program
    .command('gen <templateId> <id>')
    .alias('generate')
    .description('Generate a cyto template')
    .option('-o, --output [val]', 'Where to output the template')
    .action(async (templateId, id, options) => {
      const { author } = loadGlobalConfig();

      // Returns an object where the keys are filepaths and the values are
      // the rendered dependencies that should be written to those filepaths
      const generatedTemplate = await generateTemplate({
        templateId,
        args: { id, author },
        outputRoot: '',
      });

      const outputRoot = path.join(process.cwd(), options.output || '');

      Object.keys(generatedTemplate).forEach((filePath) => {
        const outputPath = path.join(outputRoot, filePath);
        const contents = generatedTemplate[filePath];

        mkdirp.sync(path.dirname(outputPath));
        fs.writeFileSync(outputPath, contents);
      });
    });
}
