/* @flow */
/**
 * index.js
 * Written by: Connor Taylor
 * Sets up a commander program using all of the commands available in this
 * directory
 */
import cli from 'commander';

import init from './init';
import create from './create';
import gen from './gen';

cli
  .version('');

const commands = [
  init,
  create,
  gen,
];

commands.forEach((addCommand) => addCommand(cli));

export default cli;
