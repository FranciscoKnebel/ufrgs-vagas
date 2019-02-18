import { parse } from './parse';

const commands = [ parse ];

export default function commandsBuilder(program) {
  commands.forEach(cmd => cmd.implementIn(program));
}