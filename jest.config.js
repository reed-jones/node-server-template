module.exports = {
  roots: ['<rootDir>/src'],
  "moduleNameMapper": {
    "^@server/(.+)$": "<rootDir>/src/server/$1"
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
}
