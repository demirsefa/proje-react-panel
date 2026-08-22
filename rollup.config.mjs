import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import external from 'rollup-plugin-peer-deps-external';
import typescript from 'rollup-plugin-typescript2';
import svgr from '@svgr/rollup';

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
     * SVGO'nun `removeViewBox` plugin'i, viewBox width/height ile ayni oldugunda
     * (`0 0 24 24` + `width=24`) onu "gereksiz" sayip siliyor. viewBox'siz bir SVG
     * olceklenemez: tuketici CSS'te 16px verdiginde ikon kucultulmez, KIRPILIR --
     * check/cross ikonlari tam bu yuzden yarim gorunuyordu. Kapali kalmali.
     */
    svgr({
      svgoConfig: {
        plugins: [
          { name: 'preset-default', params: { overrides: { removeViewBox: false } } },
          // SVGR'in kendi varsayilaninda var; `svgoConfig` verildiginde varsayilan
          // TAMAMEN degistigi icin elle tasinmali. Ikonlar tek bundle'a gomuluyor,
          // id/class'lar dosya adiyla onekleniyor ve boylece carpismiyorlar.
          'prefixIds',
        ],
      },
    }),
    typescript({ tsconfig: './tsconfig.json', clean: true }),
    terser(),
  ],
  external: ['react', 'react-router'],
};
