#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { program } = require('commander');

// Define command line parameters
program
	.option('--src <path>', 'Source path containing NestJS entity files')
	.option('--to <path>', 'Destination path for generated entity files')
	.parse(process.argv);

const options = program.opts();

// Check if required parameters are provided
if (!options.src || !options.to) {
	console.error('Error: Both --src and --to parameters are required');
	process.exit(1);
}

// Resolve paths
const srcPath = path.resolve(process.cwd(), options.src);
const destPath = path.resolve(process.cwd(), options.to);

// Ensure destination directory exists
if (!fs.existsSync(destPath)) {
	fs.mkdirSync(destPath, { recursive: true });
}

// Find all entity files in the source directory recursively
function findEntityFiles(dir) {
	let results = [];

	const files = fs.readdirSync(dir, { withFileTypes: true });

	for (const file of files) {
		const fullPath = path.join(dir, file.name);

		if (file.isDirectory()) {
			results = results.concat(findEntityFiles(fullPath));
		} else if (file.name.endsWith('.entity.ts')) {
			results.push(fullPath);
		}
	}

	return results;
}

// Extract interfaces ending with *Entity and class-validator decorators
function processEntityFile(filePath) {
	const content = fs.readFileSync(filePath, 'utf8');
	const fileName = path.basename(filePath);

	// Regular expression to find interfaces ending with Entity
	const interfaceRegex = /export\s+interface\s+(\w+Entity)\s*{([^}]*)}/gs;
	const interfaceMatches = Array.from(content.matchAll(interfaceRegex));

	const results = [];

	for (const match of interfaceMatches) {
		const interfaceName = match[1];
		const interfaceContent = match[2];

		// Create a new file with only the interface and class-validator imports
		let newContent = `import { ${getClassValidatorImports(content)} } from 'class-validator';\n\n`;
		newContent += `export interface ${interfaceName} {\n${extractPropertiesWithDecorators(interfaceContent, content)}\n}`;

		results.push({
			name: interfaceName,
			content: newContent
		});
	}

	return results;
}

// Extract class-validator imports from the original file
function getClassValidatorImports(content) {
	const importRegex = /import\s+{([^}]*?)}\s+from\s+['"]class-validator['"]/;
	const match = content.match(importRegex);

	if (match && match[1]) {
		return match[1].split(',')
			.map(imp => imp.trim())
			.filter(imp => imp !== '')
			.join(', ');
	}

	return '';
}

// Extract properties with class-validator decorators
function extractPropertiesWithDecorators(interfaceContent, fullContent) {
	const lines = interfaceContent.split('\n');
	let result = '';

	for (const line of lines) {
		const propertyMatch = line.match(/^\s*(\w+)[\?:].*$/);

		if (propertyMatch) {
			const propName = propertyMatch[1];
			const decoratorRegex = new RegExp(`@\\w+\\([^)]*\\)\\s*${propName}`, 'g');
			const decoratorMatches = Array.from(fullContent.matchAll(decoratorRegex));

			// Add all decorators for this property
			if (decoratorMatches.length > 0) {
				for (const dMatch of decoratorMatches) {
					const decorator = dMatch[0].split(propName)[0].trim();
					result += `  ${decorator}\n`;
				}
			}

			result += `  ${line.trim()}\n\n`;
		}
	}

	return result;
}

// Main function
function main() {
	try {
		console.log(`Searching for entity files in ${srcPath}...`);
		const entityFiles = findEntityFiles(srcPath);

		console.log(`Found ${entityFiles.length} entity files.`);

		for (const file of entityFiles) {
			console.log(`Processing ${file}...`);
			const entities = processEntityFile(file);

			for (const entity of entities) {
				const outputPath = path.join(destPath, `${entity.name}.ts`);
				fs.writeFileSync(outputPath, entity.content);
				console.log(`Generated ${outputPath}`);
			}
		}

		console.log('Done!');
	} catch (error) {
		console.error('Error:', error.message);
		process.exit(1);
	}
}

main();
