const model = class Command {

  constructor(command, description, action) {
    this.command = command;
    this.description = description;
    this.action = action;
  }

  implementIn(program) {
    program
      .command(this.command)
      .description(this.description)
      .action(this.action);
  }

}

export { model as Command };