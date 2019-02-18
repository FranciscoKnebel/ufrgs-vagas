import program from 'commander';
import pkg from './package.json';
import commands from './commands';

program
  .version(pkg.version, '-v, --version');
  // .options()

commands(program);

program
  .parse(process.argv);
