import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import external from 'rollup-plugin-peer-deps-external';
import typescript from 'rollup-plugin-typescript2';
import svgr from '@svgr/rollup';
import { readFileSync } from 'node:fs';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.cjs.js',
      format: 'cjs',
      sourcemap: false,
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: false,
    },
  ],
  plugins: [
    external(),
    resolve(),
    commonjs(),
    /**
     * Ikonlarin SVGO ayari `svgo.icons.json`'da, rollup'in icinde degil: ayni
     * dosyayi `svgoViewBox.test.ts` de okuyup her ikonu gercekten donusturuyor,
     * yani ayar bozulursa test kirmiziya doner. Ayarin kendisi neden var:
     * SVGO'nun `removeViewBox` plugin'i, viewBox width/height ile ayni oldugunda
     * (`0 0 24 24` + `width=24`) onu "gereksiz" sayip siliyor. viewBox'siz bir SVG
     * olceklenemez -- tuketici CSS'te 16px verdiginde ikon kucultulmez, KIRPILIR.
     * `prefixIds` SVGR'in varsayilanindan elle tasindi: `svgoConfig` verildiginde
     * varsayilan tamamen degisiyor ve id/class carpismalarini o onluyor.
     */
    svgr({ svgoConfig: JSON.parse(readFileSync('./svgo.icons.json', 'utf8')) }),
    typescript({ tsconfig: './tsconfig.json', clean: true }),
    terser(),
  ],
  external: ['react', 'react-router'],
};
