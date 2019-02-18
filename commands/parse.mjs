import { Command } from './model';
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

const parse = new Command('parse <path>', 'Parse HTML file in <path>.', (path) => {
  readFile(path, 'UTF-8', (err, data) => {
    if (err)
      throw err;

    const lines = htmlParser.parse(data).querySelectorAll("#Horarios tbody tr").slice(1);

    const vagas = lines.map(line => {
      const el = line.childNodes
        .filter(node => node.childNodes.length > 0) // empty node
        .filter((node, index) => validColumnIndex(index)) // only allow columns with data that will be used
        .map(node => node.childNodes[0].rawText.trim());

      return {
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
    });

    // writeFile('outputfile', vagas.map(e => 
    //   `atividade: ${e.atividade} - oferecidas: ${e.oferecidas.veteranos} ${e.oferecidas.calouros} - ampliadas: ${e.ampliadas} - ocupadas: ${e.ocupadas.veteranos} ${e.ocupadas.calouros}`), () => {
    //   console.log('done');
    // });

    // const totalOcupadas = ocupadasVeteranos + ocupadasCalouros;
    // const totalOferecidas = oferecidasVeteranos + oferecidasCalouros + vagasAmpliadas;
    // const sobrando = totalOcupadas - totalOferecidas;    
  });
});

export { parse };