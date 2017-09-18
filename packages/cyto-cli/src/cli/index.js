import cli from 'commander';

import create from './create';
import gen from './gen';
import open from './open';

import packageJson from '../../package.json';

cli
  .version(packageJson.version);

const commands = [
  create,
  gen,
  open,
];

commands.forEach((addCommand) => addCommand(cli));

export default cli;
