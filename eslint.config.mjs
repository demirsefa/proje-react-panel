import { defineConfig } from 'eslint/config';
import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import globals from 'globals';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  tseslint.configs.stylistic,
  [
    {
      languageOptions: {
        globals: {
          ...globals.browser,
          ...globals.nodeBuiltin,
        },
      },
      extends: fixupConfigRules(
        compat.extends(
          'plugin:react/recommended',
          'plugin:react-hooks/recommended'
        )
      ),

      plugins: {
        react: fixupPluginRules(react),
        'react-hooks': fixupPluginRules(reactHooks),
      },

      settings: {
        react: {
          version: 'detect',
        },
      },

      rules: {
        'react/function-component-definition': ['error'],
        'import/prefer-default-export': 'off',
        'react/prefer-stateless-function': 'error',
        'react/no-this-in-sfc': 'error',
        'react-hooks/exhaustive-deps': 'warn',
      },
    },
  ]
);
