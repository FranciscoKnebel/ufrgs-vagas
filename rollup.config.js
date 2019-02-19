// rollup.config.js
import json from 'rollup-plugin-json';
import executable from 'rollup-plugin-executable';
import banner from 'rollup-plugin-banner';
import { terser } from "rollup-plugin-terser";

import { join } from 'path';

export default {
  input: 'index.mjs',
  output: {
    file: 'dist/ufrgs-vagas',
    format: 'cjs'
  },
  plugins: [
    json({
      preferConst: true,
      indent: '  ',
      compact: true,
      namedExports: true
    }),
    terser(),
    banner({
      file: join(__dirname, 'LICENSE.md')
    }),
    executable()
  ]
};