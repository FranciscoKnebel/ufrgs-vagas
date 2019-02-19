import program from 'commander';
import pkg from './package.json';
import commands from './commands/index.mjs';

program
  .version(pkg.version, '-v, --version');

commands(program);

program
  .parse(process.argv);
