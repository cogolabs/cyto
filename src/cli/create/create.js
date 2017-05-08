/* @flow */
/**
 * create.js
 * Written by: Connor Taylor
 */
import log from '../../utils/log';

import generateTemplate from '../../template/generateTemplate';
import writeTemplate from '../../template/writeTemplate';
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

      try {
        const generatedTemplate = await generateTemplate({
          templateId: 'cyto/template',
          args: { id, author },
          outputRoot: '',
        });

        writeTemplate(generatedTemplate, outputRoot);
      } catch (e) {
        log.info(e);
      }
    });
}
