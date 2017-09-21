/**
 * create.js
 * Written by: Connor Taylor
 */
import path from 'path';
import mkdirp from 'mkdirp';
import {
  generateTemplate,
  writeTemplate,
  getAuthorArg,
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
      const author = getAuthorArg();
      const [name, group] = id.split('-');

      mkdirp.sync(path.resolve(process.cwd(), name, group));

      try {
        const generatedTemplate = await generateTemplate({
          templateId: 'cyto-template',
          args: { id, author, isPartial: false },
          outputRoot: '',
        });

        writeTemplate(generatedTemplate, '');
      } catch (e) {
        log.info(e.stack);
      }
    });
}
