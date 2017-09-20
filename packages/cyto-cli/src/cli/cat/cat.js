/**
 * cat.js
 * Written by: Connor Taylor
 */
import {
  validateTemplate,
  getTemplatePackage,
  file,
} from 'cyto-core';

/* `cat` will print the contents of the cyto.config.js file to the terminal */
export default function cat(program) {
  program
    .command('cat <templateId>')
    .action((templateId) => {
      const templatePackage = getTemplatePackage(templateId);
      const configPath = require.resolve(templatePackage);
      const configContents = file.loadUTF8File(configPath);

      console.log(configContents);
    });
}
