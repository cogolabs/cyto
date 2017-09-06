/**
 * index.js
 * Written by: Connor Taylor
 * Runs a fully initialized commander program
 */

import cli from './cli';

cli.parse(process.argv);

// If nothing was supplied
if (!process.argv.slice(2).length) {
  cli.outputHelp();
}
