// jest.config.js
module.exports = {
  testEnvironment: "node", // Use Node.js environment for backend testing
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
  testMatch: ["<rootDir>/tests/**/*.test.js"], // Where Jest should look for test files
  clearMocks: true, // Automatically clear mock calls and instances between every test
  collectCoverage: true, // Enable code coverage reports
  collectCoverageFrom: [
    'controllers/**/*.js',
    'routes/**/*.js',
    'middleware/**/*.js',
    '!**/node_modules/**'
  ],
  coverageDirectory: "coverage", // Output directory for coverage reports
  verbose: true
};
