module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: { sourceType: 'module', ecmaVersion: 2020 },
  plugins: ['@typescript-eslint'],
  extends: ['eslint:recommended'],
  env: { node: true, es2021: true },
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
  },
  ignorePatterns: ['dist', 'node_modules', '*.js'],
};
