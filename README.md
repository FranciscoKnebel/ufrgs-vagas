# ufrgs-vagas

- Efetua o parsing da página de vagas por grupo de matrícula, afim de descobrir disciplinas com vagas sobrando para efetuar o ajuste de matrícula.
- Descobrir quantas vagas estão sobrando por disciplina
- Mostrar apenas disciplinas cujo número de vagas sobrando seja maior do que zero.

# Requirements

- Node.js 
  - for dev: ^11.0.0
  - for user: not yet defined.

# Como usar

- Acesse a página "Horários e Vagas por Grupo de Matrícula".
- Selecione o grupo de matrícula e período letivo.
- Salve o HTML da página.
  - Firefox: botão direito, Save Page As...
  - Chrome: botão direito, Save As... (atalho CTRL+S)
- Execute o programa
  - `ufrgs-vagas parse <input_path> [output_path]`

# Opções
```
Usage: ufrgs-vagas [options] [command]

Options:
  -v, --version                               output the version number
  -h, --help                                  output usage information

Commands:
  parse [options] <input_path> [output_path]
  Parse HTML file in <input_path>. If [output_path] is defined, will write data to file.
    -F, --no-filled  Mostrar apenas disciplinas que possuem vagas.

```

# License

MIT
