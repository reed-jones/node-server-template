module.exports = {
  defaultSeverity: 'error',
  extends: [
    'tslint:latest',
    "tslint-config-prettier"
  ],
  jsRules: {},
  rules: {
    semicolon: [true, 'never'],
    quotemark: [true, 'single', 'backtick'],
    'no-submodule-imports': {
      options: [true, '@server'],
    },
    'no-implicit-dependencies': [true, ['@', '@server', '@client']],
  },
  rulesDirectory: [],
  linterOptions: {
    exclude: ['**/node_modules/**'],
  },
}
