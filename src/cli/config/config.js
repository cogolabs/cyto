/* @flow */
/**
 * config.js
 * Written by: Connor Taylor
 */
import fs from 'fs';
import path from 'path';

import inquirer from 'inquirer';
import mkdirp from 'mkdirp';

import errors from '../../utils/errors';
import file from '../../utils/file';

/**
 * `config`. Does x when envoked. The arguments listed below are meant to be
 * passed via the command line.
 *
 */
export default function config(program: Object) {
  program
    .command('config')
    .action(() => {
      const cytoDir: string = path.join(file.getUserHomeDir(), '.cyto');
      mkdirp(cytoDir, (err) => {
        if (err) {
          errors.fileSystemError(err);
        }
        inquirer.prompt([
          {
            name: 'author',
            message: 'What is your name?',
          },
          {
            name: 'org',
            message: 'What namespace do you want your templates to be under?',
          },
          {
            name: 'libraryPath',
            message: 'Where do you want your templates stored?',
            default: `${cytoDir}/templates`,
          },
        ]).then((result) => {
          mkdirp(result.libraryPath, (e) => {
            if (e) {
              errors.fileSystemError(e);
            }
            mkdirp(path.join(result.libraryPath, result.org), () => {
              fs.writeFileSync(
                path.join(cytoDir, 'config.json'),
                JSON.stringify(result, null, '  ')
              );
            });
          });
        });
      });
    });
}
