module.exports = {
  preset: 'ts-jest',
  globals: {},
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['src/**/*.ts', 'commands/**/*.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  rootDir: __dirname,
  testMatch: ['<rootDir>/__tests__/**/*spec.[jt]s?(x)']
}
