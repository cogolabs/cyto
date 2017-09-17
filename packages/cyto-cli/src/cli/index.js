import cli from 'commander';

import create from './create';
import gen from './gen';

import packageJson from '../../package.json';

cli
  .version(packageJson.version);

const commands = [
  create,
  gen,
];

commands.forEach((addCommand) => addCommand(cli));

export default cli;
