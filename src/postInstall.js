/**
 * index.js
 * Written by: Connor Taylor
 * Script that runs directly after the user installs cyto.
 */
// import fs from 'fs';
import path from 'path';
import mkdirp from 'mkdirp';
// import ncp from 'ncp';

import getUserHomeDir from './utils/file/getUserHomeDir';

const createCytoDir = () => {
  const dir = path.join(getUserHomeDir(), '.cyto');
  console.log(dir);

  mkdirp(dir, (err) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    console.log(process.cwd());

    const templatePath = path.join(process.cwd(), 'templates');
    console.log(templatePath);
  });
};

createCytoDir();
