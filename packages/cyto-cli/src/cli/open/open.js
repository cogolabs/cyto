/**
 * open.js
 * Written by: Connor Taylor
 */
import nodeOpen from 'open';
import {
  getTemplatePackage,
} from 'cyto-core';

/* `open` will open the contents of a template for the user for inspection */
export default function open(program) {
  program
    .command('open <templateId>')
    .action((templateId, options) => {
      const templatePackage = getTemplatePackage(templateId);
      const templatePath = require.resolve(templatePackage);

      nodeOpen(templatePath);
    });
}
