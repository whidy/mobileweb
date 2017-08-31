# 个人尝试搭建一个快速开发移动站的架子

### 搭建环境及相关配置

- **webpack 3.x**，需要loader及说明
- css-loader, style-loader 加载css文件
- postcss-loader 对css进行转换处理
- expose-loader 暴露全局例如jquery
- url-loader 样式文件内的图片等资源
- file-loader 字体等资源

### 使用库

- jquery
- normalize
- [amfe-flexible](https://github.com/amfe/lib-flexible)

### PostCSS相关的插件

- autoprefixer
- postcss-advanced-variables
- postcss-nested
- postcss-partial-import
- postcss-px2rem
- postcss-scss
- postcss-sorting
- cssnano

### 要解决一些问题

快速开发自适应的移动端专题站点或简单页面

解决字体和边框不进行rem转换

直视学习PostCSS过程中遇到的坑及填坑

其他

###运行方法

请依次分布执行

```javascript
npm install
npm run start
npm run build:dev
```

打开浏览器访问http://localhost:9000/src/

临时备注:我也看过大漠的[再聊移动端页面的适配](http://www.w3cplus.com/css/vw-for-layout.html)这篇文章,不过是否值得广泛使用还在研究中,所以等我目前还是比较倾向于旧的成熟一些的方案,这个有空我会进一步研究并记录成果~
