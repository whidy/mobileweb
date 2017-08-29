module.exports = {
  // parser: require('postcss-scss'),
  plugins: [
    require('postcss-partial-import'),
    require('postcss-advanced-variables'),
    require('postcss-nested'),
    require('autoprefixer'),
    // require('postcss-assets'),
    require('postcss-pxtorem')({
      rootValue: 75,
      unitPrecision: 10,
      propList: ['*','!border*'],
      selectorBlackList: [],
      replace: true,
      mediaQuery: false,
      minPixelValue: 0
    }),
    require('cssnano')({
      preset: 'default'
    })
  ]
}