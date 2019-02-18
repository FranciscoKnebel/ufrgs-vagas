import { Command, Option } from './model';
import { readFile, writeFile } from 'fs';
import htmlParser from 'node-html-parser';

function validColumnIndex(index) {
  // Colunas 0, 3, 4, 5, 6, 7:
    // atividade; 
    // Oferecidas Veteranos;
    // Oferecidas Calouros;
    // Vagas Ampliadas;
    // Ocupadas Veteranos
    // Ocupadas Calouros;

  return [0, 3, 4, 5, 6, 7].includes(index);
}

const parse = new Command(
  'parse <path>',
  'Parse HTML file in <path>.',
  (path, program) => {
    readFile(path, 'UTF-8', (err, data) => {
      if (err)
        throw err;

      const lines = htmlParser.parse(data).querySelectorAll("#Horarios tbody tr").slice(1);

      const dict = new Map();
      let current = undefined;

      lines.forEach(line => {
        const el = line.childNodes
          .filter(node => node.childNodes.length > 0) // empty node
          .filter((node, index) => validColumnIndex(index)) // only allow columns with data that will be used
          .map(node => node.childNodes[0].rawText.trim());

        const vaga = {
          atividade: el[0],
          oferecidas: {
            veteranos: Number(el[1]),
            calouros: Number(el[2])
          },
          ampliadas: Number(el[3]),
          ocupadas: {
            veteranos: Number(el[4]),
            calouros: Number(el[5])
          }
        };

        if (vaga.atividade === '&nbsp;') {
          // Linha contém a mesma disciplina da linha anterior,
          // logo incrementa o número total de vagas daquela disciplina.
          const temp = dict.get(current);
          
          vaga.atividade = current;
          vaga.oferecidas.veteranos += temp.oferecidas.veteranos;
          vaga.oferecidas.calouros += temp.oferecidas.calouros;
          vaga.ampliadas += temp.ampliadas;
          vaga.ocupadas.veteranos += temp.ocupadas.veteranos;
          vaga.ocupadas.calouros += temp.ocupadas.calouros;
        } else {
          current = vaga.atividade;
        }

        dict.set(current, vaga);
      });

      const results = {
        sobrando: [],
        total: []
      };

      for (const key of dict.keys()) {
        const vaga = dict.get(key);

        const oferecidas = vaga.oferecidas.veteranos + vaga.oferecidas.calouros + vaga.ampliadas;
        const ocupadas = vaga.ocupadas.veteranos + vaga.ocupadas.calouros;
        let totalSobrando = oferecidas - ocupadas;
        totalSobrando = totalSobrando <= 0 ? 0 : totalSobrando;        

        const str = `${vaga.atividade} - ${ocupadas}/${oferecidas} - Sobrando: ${totalSobrando}`;
        if (ocupadas < oferecidas) {
          results.sobrando.push(str);
        }
        results.total.push(str);
      }

      // DONE!
      if (program.filled) {
        console.log(results.total);
      } else {
        console.log(results.sobrando);
      }
    });
  },
  [
    new Option('-F, --no-filled', 'Mostrar apenas disciplinas que possuem vagas.')
  ],
);

export { parse };