module.exports = {
  // parser: require('postcss-scss'),
  plugins: [
    require('postcss-partial-import'),
    require('postcss-advanced-variables'),
    require('postcss-sorting')({
      'properties-order': [
        'border',
        'border-top',
        'border-bottom',
        'border-left',
        'border-right'
      ]
    }),
    require('postcss-nested'),
    require('autoprefixer'),
    // require('postcss-assets'),
    require('postcss-px2rem')({
      remUnit: 75,
      threeVersion: true
    }),
    require('cssnano')({
      preset: 'default'
    })
  ]
}