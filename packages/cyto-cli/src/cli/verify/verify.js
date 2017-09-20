/**
 * verify.js
 * Written by: Connor Taylor
 */
import {
  validateTemplate,
  getTemplatePackage,
} from 'cyto-core';

/* `verify` will verify the contents of a template for the user for inspection */
export default function verify(program) {
  program
    .command('verify <templateId>')
    .action((templateId) => {
      const templatePackage = getTemplatePackage(templateId);
      const config = require(templatePackage);

      try {
        validateTemplate(config, templateId);
      } catch (e) {
        console.log(e.stack);
      }

      console.log(`Template ${templateId} is valid :)`);
    });
}
