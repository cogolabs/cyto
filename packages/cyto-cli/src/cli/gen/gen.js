/**
 * gen.js
 * Written by: Connor Taylor
 */

import path from 'path';

import {
  generateTemplate,
  writeTemplate,
  getAuthorArg,
  log,
} from 'cyto-core';

export default function gen(program: Object) {
  program
    .command('gen <templateId> <id>')
    .alias('generate')
    .description('Generate a cyto template')
    .option('-o, --output [val]', 'Where to output the template')
    .action(async (templateId, id, options) => {
      const author = getAuthorArg();

      try {
        // Returns an object where the keys are filepaths and the values are
        // the rendered dependencies that should be written to those filepaths
        const generatedTemplate = await generateTemplate({
          templateId,
          args: { id, author, isPartial: false },
          outputRoot: '',
        });
        const outputRoot = path.join(process.cwd(), options.output || '');

        writeTemplate(generatedTemplate, outputRoot);
      } catch (e) {
        log.info(e.stack);
      }
    });
}
