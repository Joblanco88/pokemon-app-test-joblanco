const path = require('path');
const jestConfig = {
  verbose: true,
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@pages/(.*)$": "<rootDir>/src/pages/$1",
    "^@context/(.*)$": "<rootDir>/src/context/$1",
    "^@assets/(.*)$": "<rootDir>/src/assets/$1",
    "^@images/(.*)$": "<rootDir>/src/assets/images/$1",
    "^@helpers/(.*)$": "<rootDir>/src/helpers/$1"
  }
};


module.exports = {
  jest: { configure: jestConfig },
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@images': path.resolve(__dirname, 'src/assets/images'),
      '@context': path.resolve(__dirname, 'src/context'),
      '@services': path.resolve(__dirname, 'src/services'),
      '@pages': path.resolve(__dirname, 'src/pages'),
    },
  },
};
