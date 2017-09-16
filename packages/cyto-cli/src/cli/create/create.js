/* @flow */
/**
 * create.js
 * Written by: Connor Taylor
 */

import {
  generateTemplate,
  writeTemplate,
  loadGlobalConfig,
  log,
} from 'cyto-core';

/**
 * `cyto create` creates a new template inside of the user's GTL. It does this
 * through generating the `cyto/template` template
 */
export default function create(program) {
  program
    .command('create <id>')
    .description('Create a new cyto template')
    .action(async (id) => {
      const { author } = loadGlobalConfig();

      try {
        const generatedTemplate = await generateTemplate({
          templateId: 'cyto-template',
          args: { id, author, isPartial: false },
          outputRoot: '',
        });

        writeTemplate(generatedTemplate, './');
      } catch (e) {
        log.info(e.stack);
      }
    });
}
