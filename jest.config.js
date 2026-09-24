/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/services'],
  testMatch: ['**/test/**/*.test.ts'],
  setupFiles: [
    '<rootDir>/services/identity/test/setup.ts',
    '<rootDir>/services/bastions/test/setup.ts',
  ],
  testTimeout: 20000,
  transform: {
    '^.+\\.ts$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.base.json' }],
  },
};
