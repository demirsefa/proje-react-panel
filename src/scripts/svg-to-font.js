import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { SVGIcons2SVGFontStream } from 'svgicons2svgfont';
import { createReadStream, createWriteStream } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure directories exist
const inputDir = path.join(__dirname, '../assets/icons/svg');
const outputDir = path.join(__dirname, '../assets/generated/svgfont');

// Create directories if they don't exist
if (!fs.existsSync(inputDir)) {
  fs.mkdirSync(inputDir, { recursive: true });
  console.log(`Created input directory: ${inputDir}`);
}

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
  console.log(`Created output directory: ${outputDir}`);
}

// Create the font stream
const fontStream = new SVGIcons2SVGFontStream({
  fontName: 'icons',
  fontHeight: 1000,
  normalize: true,
  centerHorizontally: true,
  centerVertically: true,
  log: console.log,
});

// Set up the output file
const outputPath = path.join(outputDir, 'icons.svg');
const outputStream = createWriteStream(outputPath);

// Handle errors
fontStream.on('error', err => {
  console.error('Error creating font:', err);
});

// Handle finish
outputStream.on('finish', () => {
  console.log(`Font successfully created at: ${outputPath}`);
});

// Pipe the font stream to the output file
fontStream.pipe(outputStream);

// Read all SVG files from the input directory
fs.readdir(inputDir, (err, files) => {
  if (err) {
    console.error('Error reading input directory:', err);
    return;
  }

  const svgFiles = files.filter(file => file.endsWith('.svg'));

  if (svgFiles.length === 0) {
    console.log('No SVG files found in the input directory');
    fontStream.end();
    return;
  }

  console.log(`Found ${svgFiles.length} SVG files to process`);

  // Process each SVG file
  svgFiles.forEach((file, index) => {
    const filePath = path.join(inputDir, file);
    const glyph = createReadStream(filePath);

    // Set metadata for the glyph
    glyph.metadata = {
      unicode: [String.fromCharCode(0xea01 + index)], // Start from EA01 and increment
      name: path.parse(file).name,
    };

    fontStream.write(glyph);
  });

  // End the stream after all files are processed
  fontStream.end();
});
