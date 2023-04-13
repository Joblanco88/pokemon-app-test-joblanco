const path = require("path");
const jestConfig = {
  verbose: true,
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@assets/(.*)$": "<rootDir>/src/assets/$1",
    "^@images/(.*)$": "<rootDir>/src/assets/images/$1",
    "^@pages/(.*)$": "<rootDir>/src/pages/$1",
    "^@components/(.*)$": "<rootDir>/src/components/$1",
    "^@context/(.*)$": "<rootDir>/src/context/$1",
    "^@helpers/(.*)$": "<rootDir>/src/helpers/$1",
    "^@services/(.*)$": "<rootDir>/src/services/$1",
  },
};

module.exports = {
  jest: { configure: jestConfig },
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@images": path.resolve(__dirname, "src/assets/images"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@components": path.resolve(__dirname, "src/components"),
      "@context": path.resolve(__dirname, "src/context"),
      "@helpers": path.resolve(__dirname, "src/helpers"),
      "@services": path.resolve(__dirname, "src/services"),
    },
  },
};
