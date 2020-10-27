module.exports = {
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'prettier/@typescript-eslint',
      'plugin:prettier/recommended',
    ],
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.ts'],
          paths: ["packages"]
        },
      },
    },
    env: {
      browser: true,
      node: true,
      es6: true,
    },
    plugins: ['@typescript-eslint', 'import'],
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
      sourceType: 'module', // Allows for the use of imports
    },
  }