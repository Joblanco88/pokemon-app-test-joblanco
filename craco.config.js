const path = require('path');
const jestConfig = {
  verbose: true,
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@pages/(.*)$": "<rootDir>/src/pages/$1",
    "^@context/(.*)$": "<rootDir>/src/context/$1",
    "^@images/(.*)$": "<rootDir>/src/images/$1",
    "^@helpers/(.*)$": "<rootDir>/src/helpers/$1"
  }
};


module.exports = {
  jest: { configure: jestConfig },
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@pages': path.resolve(__dirname, 'pages'),
      '@context': path.resolve(__dirname, 'context'),
      '@images': path.resolve(__dirname, 'images'),
      '@helpers': path.resolve(__dirname, 'helpers'),
    },
  },
};
