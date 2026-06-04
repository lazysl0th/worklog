import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import boundariesPlugin from 'eslint-plugin-boundaries';
import eslintCommentsPlugin from 'eslint-plugin-eslint-comments';
import prettierPlugin from 'eslint-plugin-prettier';
import configPrettier from 'eslint-config-prettier';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import js from '@eslint/js';
import perfectionist from 'eslint-plugin-perfectionist';

export default [
  {
    ignores: ['node_modules/**', '**/dist/**', '**/build/**', '.cache/**', 'package-lock.json'],
  },

  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      boundaries: boundariesPlugin,
      'eslint-comments': eslintCommentsPlugin,
      prettier: prettierPlugin,
      perfectionist,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      ...configPrettier.rules,
      'prettier/prettier': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/consistent-type-assertions': [
        'error',
        {
          assertionStyle: 'never',
        },
      ],
      '@typescript-eslint/no-unnecessary-type-assertion': 'error',
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
      'eslint-comments/no-unused-disable': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'perfectionist/sort-imports': 'error',
    },
  },

  {
    files: ['backend/**/*.ts'],
    languageOptions: {
      parserOptions: {
        projectService: { allowDefaultProject: ['*.config.ts', 'backend/*.config.ts'] },
      },
    },
  },

  {
    files: ['frontend/**/*.{ts,tsx}'],

    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        projectService: true,
      },
    },

    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },

    rules: {
      ...reactHooks.configs.flat.recommended.rules,

      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      '@typescript-eslint/ban-ts-comment': [
        'error',
        {
          'ts-ignore': true,
          'ts-expect-error': true,
          'ts-nocheck': true,
          'ts-check': false,
        },
      ],

      'no-restricted-syntax': [
        'error',
        {
          selector: 'TSNonNullExpression',
        },
      ],
    },
  },

  {
    files: ['frontend/src/**/*'],
    settings: {
      'boundaries/elements': [
        { type: 'app', pattern: 'frontend/src/app/*' },
        { type: 'processes', pattern: 'frontend/src/processes/*' },
        { type: 'pages', pattern: 'frontend/src/pages/*' },
        { type: 'widgets', pattern: 'frontend/src/widgets/*' },
        { type: 'features', pattern: 'frontend/src/features/*' },
        { type: 'entities', pattern: 'frontend/src/entities/*' },
        { type: 'shared', pattern: 'frontend/src/shared/*' },
      ],
    },
    rules: {
      'boundaries/dependencies': [
        'error',
        {
          default: 'disallow', // Запрещено всё, что не разрешено явно
          rules: [
            {
              from: { type: 'app' },
              allow: {
                to: {
                  type: ['processes', 'pages', 'widgets', 'features', 'entities', 'shared', 'app'],
                },
              },
            },
            {
              from: { type: 'processes' },
              allow: {
                to: { type: ['pages', 'widgets', 'features', 'entities', 'shared', 'processes'] },
              },
            },
            {
              from: { type: 'pages' },
              allow: { to: { type: ['widgets', 'features', 'entities', 'shared', 'pages'] } },
            },
            {
              from: { type: 'widgets' },
              allow: { to: { type: ['features', 'entities', 'shared', 'widgets'] } },
            },
            {
              from: { type: 'features' },
              allow: { to: { type: ['entities', 'shared', 'features'] } },
            },
            {
              from: { type: 'entities' },
              allow: { to: { type: ['shared', 'entities'] } },
            },
            {
              from: { type: 'shared' },
              allow: { to: { type: ['shared'] } },
            },
          ],
        },
      ],
    },
  },
];
