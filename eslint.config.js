import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import boundariesPlugin from 'eslint-plugin-boundaries';
import importPlugin from 'eslint-plugin-import';
import eslintCommentsPlugin from 'eslint-plugin-eslint-comments';
import prettierPlugin from 'eslint-plugin-prettier';
import configPrettier from 'eslint-config-prettier';

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
      import: importPlugin,
      boundaries: boundariesPlugin,
      'eslint-comments': eslintCommentsPlugin,
      prettier: prettierPlugin,
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
      'import/no-duplicates': 'error',
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
    },
  },

  {
    files: ['backend/**/*.ts'],
    languageOptions: {
      parserOptions: {
        projectService: { allowDefaultProject: ['backend/prisma.config.ts'] },
      },
    },
  },

  {
    files: ['frontend/**/*.ts', 'frontend/**/*.tsx'],
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
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
      'boundaries/element-types': [
        'error',
        {
          default: 'allow',
          rules: [
            {
              from: 'shared',
              disallow: ['app', 'processes', 'pages', 'widgets', 'features', 'entities'],
            },
            { from: 'entities', disallow: ['app', 'processes', 'pages', 'widgets', 'features'] },
            { from: 'features', disallow: ['app', 'processes', 'pages', 'widgets'] },
            { from: 'widgets', disallow: ['app', 'processes', 'pages'] },
            { from: 'pages', disallow: ['app', 'processes'] },
            { from: 'processes', disallow: ['app'] },
          ],
        },
      ],
    },
  },
];
