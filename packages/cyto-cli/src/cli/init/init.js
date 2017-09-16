/**
 * init.js
 * Written by: Connor Taylor
 */
import fs from 'fs';
import path from 'path';
import inquirer from 'inquirer';
import mkdirp from 'mkdirp';

import { file } from 'cyto-core';

/**
 * `cyto init` prompts the user for their full name and the location to create
 * their GTL. It then saves this information in a config.json file in the .cyto
 * directory, creates the GTL, and copies the example templates created during
 * the postinstall script into the GTL.
 */
export default function init(program) {
  program
    .command('init')
    .description('Set required information for cyto')
    .action(() => {
      const cytoDir = path.join(file.getUserHomeDir(), '.cyto');
      mkdirp.sync(cytoDir);

      inquirer.prompt([
        {
          name: 'author',
          message: 'What is your full name (used for the {{author}} variable)?',
        },
      ]).then((result) => {
        fs.writeFileSync(
          path.join(cytoDir, 'config.json'),
          JSON.stringify(result, null, '  '),
        );
      });
    });
}
