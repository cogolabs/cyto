/**
 * open.js
 * Written by: Connor Taylor
 */
import path from 'path';
import nodeOpen from 'open';
import {
  getTemplatePackage,
} from 'cyto-core';

/* `open` will open the contents of a template for the user for inspection */
export default function open(program) {
  program
    .command('open <templateId>')
    .description('Opens the contents for the specified template')
    .action((templateId, options) => {
      const templatePackage = getTemplatePackage(templateId);
      const templatePath = path.dirname(require.resolve(templatePackage));

      nodeOpen(templatePath);
    });
}
