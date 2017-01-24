/* @flow */
/**
 * index.js
 * Written by: Connor Taylor
 * Sets up a commander program using all of the commands available in this
 * directory
 */
import cli from 'commander';

import config from './config';
import create from './create';
import gen from './gen';

cli
  .version('');

const commands = [
  config,
  create,
  gen,
];

commands.forEach((addCommand) => addCommand(cli));

export default cli;
