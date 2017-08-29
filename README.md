个人尝试搭建一个快速开发移动站的架子

采用的技术
webpack 3

需要loader说明
expose-loader
暴露全局例如jquery

url-loader
样式文件内的图片等资源

file-loader
字体等资源

使用库
jquery
normalize

amfe-flexible
https://github.com/amfe/lib-flexible


其他postcss-loader
PostCSS
autoprefixer
precss
px2rem


打算解决一些问题
比如字体和边框不进行rem转换



直接使用precss的时候会出现注释方面的问题,我在尝试单独使用插件看看能不能避免该问题.
实际上需要用到precss中的插件
导入其他css
postcss-partial-import
嵌套css
postcss-nesting