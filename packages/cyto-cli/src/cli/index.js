import cli from 'commander';

import init from './init';
import create from './create';
import gen from './gen';

import packageJson from '../../package.json';

cli
  .version(packageJson.version);

const commands = [
  init,
  create,
  gen,
];

commands.forEach((addCommand) => addCommand(cli));

export default cli;
