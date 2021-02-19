module.exports = {
  root: true,
  extends: [
    'prettier-standard',
  ],
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 6
  },
  env: {
    browser: true
  },
  rules: {
    semi: ['error', 'never']
  }
}
