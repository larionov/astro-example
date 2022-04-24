module.exports = {
  pluginSearchDirs: ['./node_modules'],
  plugins: ['prettier-plugin-astro'],
  trailingComma: 'all',
  singleQuote: true,

  overrides: [
    {
      files: '*.scss',
      options: {
        printWidth: 120,
      },
    },
  ],
};
