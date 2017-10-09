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
      // selectorBlackList: [/^p/],
      selectorBlackList: [],
      replace: true,
      mediaQuery: false,
      minPixelValue: 6
    }),
    require('postcss-adaptive')({
      remUnit: 45 //不会对postcss-pxtorem有任何影响，此代码仅供测试，无任何意义。
    }),    
    require('cssnano')({
      preset: 'default'
    })
  ]
}