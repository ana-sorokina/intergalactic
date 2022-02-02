module.exports = {
  setupTestFrameworkScriptFile: `${__dirname}/setupTests.js`,
  transform: {
    '^.+\\.(jsx?|tsx?)$': `${__dirname}/babel.config.js`,
  },
  transformIgnorePatterns: ['node_modules/(?!@semcore/|@popperjs/|d3-|internmap)'],
  // collectCoverageFrom: ['**/semcore/*/src/**.*'],
  coveragePathIgnorePatterns: ['/style/', 'src/index.tsx'],
  moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'tsx'],
  // collectCoverageFrom: ['**/semcore/*/src/**.*'],
  moduleNameMapper: {
    '\\.(css)$': 'identity-obj-proxy',
    '^@semcore/jest-preset-ui/(.*)': '<rootDir>/../../tools/jest-preset-ui/$1',
    '^@semcore/utils/lib/(.*)': '@semcore/utils/src/$1',
    '^@semcore/(.*)/lib/(.*)': '@semcore/$1/lib/$2',
    '^@semcore/icon/(.*)/(.*)': '@semcore/icon/$1/$2',
    '^@semcore/(.*)': '@semcore/$1/src',
  },
  modulePathIgnorePatterns: ['/tools/'],
};
