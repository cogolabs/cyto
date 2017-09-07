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
import {
  generateTemplate,
  writeTemplate,
} from 'cyto-core/lib/template';
import { loadGlobalConfig } from 'cyto-core/lib/configs';

import log from '../../utils/log';

export default function gen(program: Object) {
  program
    .command('gen <templateId> <id>')
    .alias('generate')
    .description('Generate a cyto template')
    .option('-o, --output [val]', 'Where to output the template')
    .action(async (templateId, id, options) => {
      const { author } = loadGlobalConfig();

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
