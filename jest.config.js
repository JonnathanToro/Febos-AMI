module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  // "jest": {
  // ...
  // support the same @ -> src alias mapping in source code
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  collectCoverage: true,
  collectCoverageFrom: ['**/*.{js,vue}', '!**/node_modules/**'],
  coverageReporters: ['html', 'text-summary']
  // }
};
