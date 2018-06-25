# doctype

## 学习资料

- [https://www.w3.org/html/ig/zh/wiki/HTML5/syntax](https://www.w3.org/html/ig/zh/wiki/HTML5/syntax)
- [html dtd声明有必要吗？](https://www.zhihu.com/question/21974902)
- [CS002: DOCTYPE 与浏览器模式分析](http://w3help.org/zh-cn/casestudies/002)
- [怪异模式（Quirks Mode）对 HTML 页面的影响](https://www.ibm.com/developerworks/cn/web/1310_shatao_quirks/)


## 总结

早期html是基于SGML(标准通用标记语言)的，DTD作用是定义SGML文档的文档类型，用于浏览器解析。html5不基于SGML，所以不需要DTD。但是为了兼容以前的浏览器。所以需要：

```html
<!DOCTYPE html>
```

现代浏览器一般有多种渲染模式：标准模式、怪异模式(quirks)和近乎标准模式。上面的 DTD 在 ie6&7 下会触发近乎标准模式，ie8之后都是标准模式。

所以现在只需要上面简化的 doctype 就行。

通过`document.compatMode`可以获取文档的渲染模式。它的值有：
- BackCompat: 标准兼容模式未开启，没写doctype
- CSS1Compat: 标准兼容模式开启


