# Image对象

Image是浏览器内置构造函数，通过`new Image()`将返回一个`__proto__`属性 为 HTMLImageElement的对象。<img>元素也是继承自 HTMLImageElement。

```
new Image() instanceof HTMLImageElement
new Image() instanceof Image

function Image(){
    return new HTMLImageElement()
}
```

new Image() 功能相当于document.createElement('img')

- 获取图片节点 document.images

Image构造函数可以接受2个参数，分别是图片的宽和高。

## 常用属性

- alt
- width、height
- naturalWidth,naturalHeight 图片的原始宽高，只读
- src
- complete 表示图片是否加载完成
- onload 指定图片加载完成后的回调函数
- isMap
- useMap
- crossOrigin 图片跨域的CORS设置














































