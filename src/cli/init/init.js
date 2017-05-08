/* @flow */
/**
 * init.js
 * Written by: Connor Taylor
 */
import fs from 'fs';
import path from 'path';

import inquirer from 'inquirer';
import mkdirp from 'mkdirp';

import errors from '../../utils/errors';
import file from '../../utils/file';

/**
 * `init`. Does x when envoked. The arguments listed below are meant to be
 * passed via the command line.
 *
 */
export default function init(program: Object) {
  program
    .command('init')
    .description('Set required information for cyto')
    .action(() => {
      const cytoDir = path.join(file.getUserHomeDir(), '.cyto');
      mkdirp(cytoDir, (err) => {
        if (err) {
          errors.fileSystemError(err);
        }

        inquirer.prompt([
          {
            name: 'author',
            message: 'What is your full name (used for the {{author}} variable)?',
          },
          {
            name: 'libraryPath',
            message: 'Where do you want your Global Template Library to be created?',
            default: `${cytoDir}/templates`,
          },
        ]).then((result) => {
          mkdirp(result.libraryPath, (e) => {
            if (e) {
              errors.fileSystemError(e);
            }
            fs.writeFileSync(
              path.join(cytoDir, 'config.json'),
              JSON.stringify(result, null, '  '),
            );
          });
        });
      });
    });
}
