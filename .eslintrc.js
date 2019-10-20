module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'plugin:ember/recommended'
  ],
  rules: {
    // ESLint `no-unused-vars` fails when imports are used as type annotations
    'no-unused-vars': 0,
    '@typescript-eslint/no-unused-vars': ['error', { 'vars': 'all', 'args': 'none' }],

    // Allow template literals without interpolated expression. (ex. `foo`)
    // Hand for test case descriptions that have apostrophes in them.
    'quotes': ['error', 'single', { 'allowTemplateLiterals': true }],

    // Allow snake_case variable access using bracket notation.
    'dot-notation': ['error', { 'allowPattern': '^[a-z]+(_[a-z]+)+$' }],

    // Require parens only for multiple arguments for arrow functions.
    // Ex. arg => {...} instead of (arg) => {...}
    'arrow-parens': ['error', 'as-needed', { 'requireForBlockBody': true }]
  }
};
