module.exports = {
  parser: require('postcss-scss'),
  plugins: [
    require('autoprefixer'),
    require('postcss-import'),
    require('postcss-nested'),
    require('postcss-advanced-variables'),
    require('postcss-sorting')({
      // maybe you need or remove it. Reference: https://github.com/hudochenkov/postcss-sorting/blob/master/lib/order/README.md
      order: ['custom-properties', 'dollar-variables', 'declarations', 'at-rules', 'rules'],
      'properties-order': 'alphabetical',
      'unspecified-properties-position': 'bottom',
    }),
    require('postcss-pixel-to-viewport')({
      viewportWidth: 750,
      viewportUnit: 'vmin',
      propertyBlacklist: [],
      mediaQuery: false,
      minPixelValue: 6,
    }),
    require('cssnano')({
      preset: 'default',
    }),
  ],
}
