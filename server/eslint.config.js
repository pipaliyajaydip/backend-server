import js from '@eslint/js';
import node from 'eslint-plugin-n';

export default [
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      globals: {
        process: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        console: 'readonly',
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    ignores: [
      'node_modules',
      'dist',
      'build',
      '**/*.test.js',
    ],
    plugins: {
      n: node,
    },
    rules: {
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      indent: ['error', 2],
      'no-trailing-spaces': 'error',
      'eol-last': ['error', 'always'],
      'n/no-missing-import': 'error',
      'n/no-unpublished-import': 'off',
      'no-console': 'off',
      'no-debugger': 'warn',
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-undef': 'error',
      eqeqeq: ['error', 'always'],
      curly: 'error',
    },
  },
];
