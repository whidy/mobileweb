# 个人尝试搭建一个快速开发移动站的架子

### 搭建环境及相关配置

> 更新至**webpack 5.x**

需要的 `loader` 及说明

* css-loader, style-loader 加载 css 文件
* postcss-loader 对 css 进行转换处理
* expose-loader 暴露全局例如 jquery
* ~~url-loader 样式文件内的图片等资源~~(webpack5更新为asset)
* ~~file-loader 字体等资源~~(webpack5更新为asset)

### 使用库

* jquery（可选使用）
* normalize
* [amfe-flexible](https://github.com/amfe/lib-flexible)（viewport 响应使用）

### PostCSS 相关的插件

> 更新至**PostCSS 8.x**

* postcss-scss（特别注意：支持scss的语法特性，但是不会编译）
* autoprefixer
* postcss-advanced-variables
* postcss-nested
* postcss-import
* postcss-pxtorem
* postcss-sorting
* cssnano

### 要解决一些问题

快速开发自适应的移动端专题站点或简单页面

解决~~字体和~~边框不进行 rem 转换（根据考究并未找到合理有效的证据证明 font-size 建议使用 px，个人认为如果 rem 计算合理不应该存在明显的重大问题。自然就不需要用到 pxtorem 的 dpr 扩展转换功能了）

该分支采用[postcss-pxtorem](https://github.com/cuth/postcss-pxtorem)，具体配置大致如下

```javascript
require('postcss-pxtorem')({
  rootValue: 75,
  unitPrecision: 5,
  propList: ['*'],
  selectorBlackList: [],
  replace: true,
  mediaQuery: false,
  minPixelValue: 12,
})
```

假设设计稿 750 宽，这里设置简单说明一下（没说的是我还没弄明白或者是不重要的 😂）：

* rootValue 为 75，说是对根元素大小进行设置。可能类似[px2rem](https://www.npmjs.com/package/px2rem)中的 remUnit 参数吧

* unitPrecision 为 5，起初我真不知道这个官方说的*The decimal numbers to allow the REM units to grow to.*是啥意思，搞了半天才观察出来，原来是**转换成 rem 后保留的小数点位数**。。。

* propList 是一个存储哪些将被转换的属性列表，这里设置为`['*']`全部，假设需要仅对边框进行设置，可以写`['*', '!border*']`意思是排除带有 border 的属性，当然这里会有一个问题，也许有时候不想对 border 其他样式处理例如`border-radius`所以也不是很好。

* selectorBlackList 则是一个对 css 选择器进行过滤的数组，比如你设置为`['fs']`，那例如`fs-xl`类名，里面有关 px 的样式将不被转换，这里也支持正则写法。

* minPixelValue 是一个非常不错的选项，我设置了 12，意思是所有小于 12px 的样式都不被转换，那么 border 之类的属性自然会保留 px 值了。而刚才提到的 border-radius 如果为了创造圆形等特殊较大圆弧时则还是会转换成 rem，来配合对应的 width 和 height（当然，你也可以用继承 width 或者 height 的变量来设置 radius）。

  > 对了忘了说了，css 样式代码中将 px 写成 `Px` 或者 `PX` 他也不会转换成 rem 的~

### 附加：前文提到了一个插件 postcss-adaptive 说明

在 PostCSS 的配置文件中，我加入了这个插件并放在了 postcss-pxtorem 的后面引入，这样在第一次转换后，postcss-adaptive 的默认参数就不会影响到上一个插件的配置而造成的混乱情况。实际上前面也提到过，这个插件的大部分功能和 postcss-pxtorem 相似，区别在于对于转换规则的条件过滤，而 postcss-pxtorem 这点有极大的优势，使用这个插件主要是解决 retina 屏（iPhone4 以上？）需要对 1px 边框处理为 0.5px。具体测试可以看一下 DEMO 中的*pic-txts 结构*，以下是该结构部分说明：

> 这是一个 pic-txts 结构的 wrap，展示小圆角边框在两个 rem > px 转换插件的作用下的影响因为在 postcss-pxtorem 配置中的 minPixelValue 设置为 6，当圆角为 5px 时，他不进行转换，而 postcss-adaptive 却要对 px 属性进行操作，这是我们不希望的，合理的操作有两种：
>
> 1. 将圆角值按照设计稿（假设设计稿时 10px）设定，并重新调整 postcss-pxtorem 配置中的 minPixelValue 为两倍安全值，例如 12
>
> 2. 将圆角 5px 值改成 postcss-pxtorem 不处理的规则例如 5PX，通过实验，发现 postcss-adaptive 并不会处理该属性

### 直视学习 PostCSS 过程中遇到的坑及填坑

其他

### 运行方法

请依次分布执行

```javascript
npm i
npm run dev
```

将会自动启动页面。需要发布就执行 `npm run build` 。

临时备注：我也看过大漠的[再聊移动端页面的适配](http://www.w3cplus.com/css/vw-for-layout.html)这篇文章, 不过是否值得广泛使用还在研究中, 所以等我目前还是比较倾向于旧的成熟一些的方案, 这个有空我会进一步研究并记录成果~
