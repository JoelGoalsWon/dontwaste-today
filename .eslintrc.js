module.exports = {
  env: {
    es2021: true,
    browser: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'prettier'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'prettier'],
  rules: {
    'linebreak-style': 0,
    'import/extensions': 0,
    'react/jsx-filename-extension': 0,
    'no-console': 1,
    'no-alert': 1,
    'no-nested-ternary': 0,
  },
};
