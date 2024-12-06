import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';

export default [
  {
    ignores: ['dist'], // Ignorar pasta de build
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'], // Aplicar a arquivos JS, JSX, TS e TSX
    languageOptions: {
      ecmaVersion: 2020, // ES2020 como padrão
      globals: globals.browser, // Globais do navegador
      parser: typescriptParser, // Parser para TypeScript
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true }, // Ativar JSX
        sourceType: 'module', // Suporte para import/export
      },
    },
    settings: {
      react: { version: 'detect' }, // Detecta a versão do React automaticamente
    },
    plugins: {
      react, // Plugin do React
      'react-hooks': reactHooks, // Plugin de hooks do React
      'react-refresh': reactRefresh, // Plugin para react-refresh
      '@typescript-eslint': typescriptEslint, // Plugin TypeScript
    },
    rules: {
      // Regras recomendadas do JS
      ...js.configs.recommended.rules,

      // Regras recomendadas do React
      ...react.configs.recommended.rules,

      // Regras para JSX runtime (React 17+)
      ...react.configs['jsx-runtime'].rules,

      // Regras recomendadas para React Hooks
      ...reactHooks.configs.recommended.rules,

      // Regras recomendadas para TypeScript
      ...typescriptEslint.configs.recommended.rules,

      // Regras específicas do projeto
      'react/jsx-no-target-blank': 'off', // Desativa verificação de target="_blank"
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ], // React Refresh: exportação constante permitida

      // Ignorar erros de tipo específicos, incluindo TS2769
      '@typescript-eslint/ban-ts-comment': [
        'error',
        {
          'ts-ignore': 'allow-with-description', // Permite `@ts-ignore` com uma descrição
        },
      ],
    },
  },
];
