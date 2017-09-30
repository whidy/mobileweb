module.exports = {
  // parser: require('postcss-scss'),
  plugins: [
    require('postcss-partial-import'),
    require('postcss-advanced-variables'),
    require('postcss-nested'),
    require('autoprefixer'),
    // require('postcss-assets'),
    require('postcss-property-lookup'),
    require('postcss-pxtorem')({
      rootValue: 75,
      unitPrecision: 5,
      propList: ['*'],
      selectorBlackList: [/^p/],
      replace: true,
      mediaQuery: false,
      minPixelValue: 6
    }),
    require('cssnano')({
      preset: 'default'
    })
  ]
}