module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 2020, sourceType: 'module' },
  plugins: ['@typescript-eslint', 'jest'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jest/recommended',
  ],
  env: {
    node: true,
    jest: true,
  },
  rules: {
    '@typescript-eslint/unbound-method': 'off', // برای Jest و controller spec
    '@typescript-eslint/no-unsafe-return': 'off', // mock ها safe هستند
    '@typescript-eslint/require-await': 'off', // mock async بدون await
    '@typescript-eslint/restrict-template-expressions': [
      'warn',
      { allowNumber: true, allowBoolean: true, allowAny: true },
    ], // logger فقط warn
  },
};
