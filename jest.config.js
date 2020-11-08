module.exports = {
  transform: {
    '^.+\\.ts?$': 'ts-jest'
  },
  testEnvironment: 'node',
  testRegex: '\.test\.(j|t)s$',
  moduleFileExtensions: ['js', 'ts']
};
