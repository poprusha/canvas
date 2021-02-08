module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint/eslint-plugin',
    'prettier',
  ],
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  root: true,
  env: {
    es6: true,
    browser: true,
    node: false,
    jest: true
  },
  rules: {
    'max-len': ['error', { 'code': 120 }],
    '@typescript-eslint/interface-name-prefix': 'off',
    'newline-before-return': 2,
    'quotes': ['error', 'single', { 'allowTemplateLiterals': false }],
    '@typescript-eslint/prefer-readonly': ['error']
  },
};
