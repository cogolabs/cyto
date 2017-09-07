/* @flow */
/**
 * create.js
 * Written by: Connor Taylor
 */

import {
  generateTemplate,
  writeTemplate,
} from 'cyto-core/lib/template';

import { loadGlobalConfig } from 'cyto-core/lib/configs';

import log from '../../utils/log';

/**
 * `cyto create` creates a new template inside of the user's GTL. It does this
 * through generating the `cyto/template` template
 */
export default function create(program) {
  program
    .command('create <id>')
    .description('Create a new cyto template')
    .action(async (id) => {
      const { libraryPath: outputRoot, author } = loadGlobalConfig();

      try {
        const generatedTemplate = await generateTemplate({
          templateId: 'cyto/template',
          args: { id, author, isPartial: false },
          outputRoot: '',
        });

        writeTemplate(generatedTemplate, outputRoot);
      } catch (e) {
        log.info(e.stack);
      }
    });
}
