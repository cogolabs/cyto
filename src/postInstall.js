/**
 * index.js
 * Written by: Connor Taylor
 * Script that runs directly after the user installs cyto.
 */
import path from 'path';
import mkdirp from 'mkdirp';
import ncp from 'ncp';

import getUserHomeDir from './utils/file/getUserHomeDir';

/* Creates a .cyto directory in the user's home directory. This stores the
 * config.json created by `cyto init` and the template examples to be copied
 * into the user's GTL.
 */
const createCytoDir = () => {
  const dir = path.join(getUserHomeDir(), '.cyto');

  mkdirp(dir, (err) => {
    if (err) {
      throw err;
    }

    const templatePath = path.join(process.cwd(), 'templates');
    const outputPath = path.join(dir, 'examples');
    mkdirp(outputPath, (templatePathErr) => {
      if (templatePathErr) {
        throw templatePathErr;
      }

      ncp(templatePath, outputPath, (copyErr) => {
        if (copyErr) {
          throw copyErr;
        }
      });
    });
  });
};

createCytoDir();
