const model = class Command {
  constructor(command, description, action, options = []) {
    this.command = command;
    this.description = description;
    this.action = action;
    this.options = options;
  }

  implementIn(program) {
    const cmd = program
      .command(this.command);

    this.options.reduce(
      (acc, curr) => acc.option(curr.flag, curr.description), cmd
    )
      .description(this.description)
      .action(this.action);
  }
}

const option = class Option {
  constructor(flag, description) {
    this.flag = flag;
    this.description = description;
  }
}

export { model as Command, option as Option };
