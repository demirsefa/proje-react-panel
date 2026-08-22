import { readdirSync, readFileSync } from 'fs';
import path from 'path';
import { describe, expect, it } from '@jest/globals';
import { transform } from '@svgr/core';

/**
 * Ikonlar bundle'a SVGR + SVGO'dan gecerek gomuluyor ve SVGO'nun varsayilan
 * `removeViewBox` plugin'i, viewBox width/height ile birebir ayniysa onu
 * "gereksiz" sayip siliyor. viewBox'siz bir SVG olceklenemez: tuketici CSS'te
 * `.icon { width: 16px }` verdiginde ikon kucultulmez, KIRPILIR — check/cross
 * bir kez tam bu yuzden gorunmez oldu, dist'e yama atilarak kapatildi, yama
 * baska bir fix'le dusunce geri geldi.
 *
 * Bu yuzden test tek bir ikonu degil ayari kilitliyor: rollup'in okudugu
 * `svgo.icons.json` ile HER ikon gercekten donusturuluyor. Ayar bozulursa —
 * ya da viewBox'i width/height'iyla ayni yeni bir ikon eklenirse — kirmizi yanar.
 */
const repoRoot = path.resolve(__dirname, '../../..');
const iconDir = path.join(repoRoot, 'src/assets/icons/svg');
const svgoConfig = JSON.parse(
  readFileSync(path.join(repoRoot, 'svgo.icons.json'), 'utf8')
);

const icons = readdirSync(iconDir).filter((f) => f.endsWith('.svg'));

const compile = (file: string): Promise<string> =>
  transform(
    readFileSync(path.join(iconDir, file), 'utf8'),
    { plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'], svgoConfig },
    { componentName: 'Icon', filePath: path.join(iconDir, file) }
  );

describe('icon build config', () => {
  it('has icons to check', () => {
    expect(icons.length).toBeGreaterThan(0);
  });

  it.each(icons)('%s keeps its viewBox', async (file) => {
    expect(await compile(file)).toContain('viewBox=');
  });

  // Kirpilma yalnizca viewBox'in varligina degil dogruluguna bagli: yanlis bir
  // viewBox da ayni sonucu verir, o yuzden regresyonun kaynagi olan ikon acikca
  // kendi kutusuyla kilitli.
  it('check.svg keeps the exact box its paths are drawn in', async () => {
    expect(await compile('check.svg')).toContain('viewBox="0 0 24 24"');
  });
});
