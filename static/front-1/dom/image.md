# Image

## 学习资料

- [DOM Image 阮一峰](https://github.com/ruanyf/jstutorial/blob/gh-pages/dom/image.md)

## HTMLImageElement实例

生成 HTMLImageElement 实例的方式有：

 获取到 <img> 元素，如 document.querySelector('img')
- new Image()
- document.images 的成员
- document.createElement('img)


## HTMLImageElement属性

有些属性是很简单的，像下面这些：

- src 可读写，读的是图片完整的绝对地址
- currentSrc 只读，当前显示图片的地址，比如 `<img src='1.jpg'>`，刚开始图片没有加载完全时，currentSrc 为空字符串，加载完后才和 src 属性值一样。
-  alt 图片的文字说明
- width, height 表示 <img> 的宽度和高度，值都是整数
- naturalWidth, naturalHeight 图像的实际宽度和高度。如果图片还没有加载完，则为0
- complete 表示图片是否加载完成，如果 <img> 没有 src 属性或下载失败 onerror，也返回 true
- x, y： 图片相对于可视区左上角的位置
- onerror
- onload

还有些属性不太熟悉了，需要一个个查资料。

- isMap 对应 <img> 元素的 ismap 属性，返回布尔值，表示图像是否是服务器端的图像映射的一部分。
- useMap 对应 <img> 的 usemap 属性，表示当前图像对应的 <map> 元素。

- srcset 用于读写 <img> 的 srcset 属性。可单独使用。
- sizes 用于读写 <img> 的 sizes 属性，必须和 srcset 同时使用。

- **crossOrigin** 一旦设置了这个属性，表示图片跨域请求。它的值可能是：
    - anonymous 跨域请求不需要用户身份，默认值。空字符串会指向 anonymous。
    - use-credentials 跨域请求要求用户身份
    - 不带这个属性，会跳过 cors，即常规的请求图片
crossorigin 应该在需要获取 script 脚本加载错误时启用。同时，需要设置服务端的 Access-Control-Allow-Origin 头字段。

- referrerPolicy 用于读写 <img> 的 referrerpolicy 属性，表示请求图像资源时，如何处理 http 请求的 referrer 字段。
    - no-referrer
    - no-referrer-when-downgrade：从https协议降为http协议时不发送referrer。默认值
    - origin
    - origin-when-cross-origin
    - unsafe-url

```html
// 不带 referrer
<img src="./1.jpeg" id="img" alt="" referrerpolicy="no-referrer">

// referrer:http://127.0.0.1:5500/static/front-1/dom/demo/image/1.html 当前页面
<img src="./1.jpeg" id="img" alt="" referrerpolicy="referrer">

// Referer: http://127.0.0.1:5500/
<img src="./1.jpeg" id="img" alt="" referrerpolicy="origin">

// 跨域时才是 origin，否则是当前页面
<img src="./1.jpeg" id="img" alt="" referrerpolicy="origin-when-cross-origin">

// Referer: http://127.0.0.1:5500/static/front-1/dom/demo/image/1.html 当前页面
<img src="./1.jpeg" id="img" alt="" referrerpolicy="unsafe-url">
```


## 
- [跨域，你需要知道的全在这里](https://zhuanlan.zhihu.com/p/30777994)
- [什么是JS跨域访问？](https://www.zhihu.com/question/26376773)
- [有哪些方式可以实现跨域？](https://www.zhihu.com/question/264308740)
- [为什么浏览器要限制跨域访问?](https://www.zhihu.com/question/26379635)