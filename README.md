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
- ~~postcss-px2rem~~
- postcss-pxtorem
- postcss-scss
- postcss-sorting
- cssnano
- postcss-property-lookup

### 要解决一些问题

快速开发自适应的移动端专题站点或简单页面

解决~~字体和~~边框不进行rem转换（根据考究并未找到合理有效的证据证明font-size建议使用px，个人认为如果rem计算合理不应该存在明显的重大问题。自然就不需要用到px2rem的dpr扩展转换功能了）

该分支采用[postcss-pxtorem](https://github.com/cuth/postcss-pxtorem)避免了postcss-nested注释问题,具体配置大致如下

```javascript
require('postcss-pxtorem')({
  rootValue: 75,
  unitPrecision: 5,
  propList: ['*'],
  selectorBlackList: [],
  replace: true,
  mediaQuery: false,
  minPixelValue: 12
})
```

假设设计稿750宽，这里设置简单说明一下（没说的是我还没弄明白或者是不重要的😂）：

- rootValue为75，说是对根元素大小进行设置。可能类似[px2rem](https://www.npmjs.com/package/px2rem)中的remUnit参数吧

- unitPrecision为5，起初我真不知道这个官方说的*The decimal numbers to allow the REM units to grow to.*是啥意思，搞了半天才观察出来，原来是**转换成rem后保留的小数点位数**。。。

- propList是一个存储哪些将被转换的属性列表，这里设置为`['*']`全部，假设需要仅对边框进行设置，可以写`['*', '!border*']`意思是排除带有border的属性，当然这里会有一个问题，也许有时候不想对border其他样式处理例如`border-radius`所以也不是很好。

- selectorBlackList则是一个对css选择器进行过滤的数组，比如你设置为`['fs']`，那例如`fs-xl`类名，里面有关px的样式将不被转换，这里也支持正则写法。

- minPixelValue是一个非常不错的选项，我设置了12，意思是所有小于12px的样式都不被转换，那么border之类的属性自然会保留px值了。而刚才提到的border-radius如果为了创造圆形等特殊较大圆弧时则还是会转换成rem，来配合对应的width和height（当然，你也可以用继承width或者height的变量来设置radius）。

  > 需要注意的是，以下情况并不会保留为px！
  >
  > ```css
  > .test-radius {
  >   width:20px;
  >   height:20px;
  >   border-radius: calc(@width / 2);
  >   background-color:#ccc;
  > }
  > ```
  >
  > 根据反复测试，calc运算是来自cssnano插件，然而[cssnano](http://cssnano.co/)有必要放在最后执行，所以无法满足计算后的10px在进行pxtorem转换，不过这种情况也是比较合理的。假设width和height转换为rem，而圆角是px，个人感觉不可避免的会造成圆形错误的情况（是否有可能改圆角px值实际上永远大于转换后的rem的50%？有待考究！），所以这种情况暂时就不考虑了，让其单位均保持一致即可。

  写到这里我又陷入了沉思，因为有个问题不明白了。根据postcss.config.js配置cssnano是在最后面，pxtorem是在其前面，那么如何做到对此段样式转换的顺序。

  这段代码应该先是postcss-property-lookup对@width进行处理，然后进行calc(@width / 2)计算，最后对px检测转换，再进行cssnano压缩。而实际上有点诡异。**难道postcss.config.js中插件的执行顺序并非单纯的从上而下！**希望不久的将来这个疑问将被解决，或者我也怀疑postcss官方文档实际有指出，只是个人英文能力较差被我忽略掉了😥。

  另一方面，关于此段CSS在画圆上有一些需要注意的，其实这里如果写圆用50%即可，我发现某些情况下（可能是圆形很小）如果按照除以2的写法转换成rem似乎不圆，所以在现代开发来看移动端画圆就50%了！所以上例仅做测试好了~

  额外阅读，关于[border-radius](https://caniuse.com/#search=border-radius)的一些事项。

  对了忘了说了，css样式代码中将px写成`Px`或者`PX`他也不会转换成rem的~

### 直视学习PostCSS过程中遇到的坑及填坑

其他

###运行方法

请依次分布执行

```javascript
npm install
npm run start
npm run build:dev
```

打开浏览器访问http://localhost:9000/src/