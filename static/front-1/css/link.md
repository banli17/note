引入css有四种方式

1. 行内式

```
<div style="color:red"></div>
```

2. 内嵌式

```
<style type="text/css">
    div {color: red}
</style>
```

3. 外链式

```
<link rel="stylesheet" type="text/css" href="style.css">
```

优点是容易维护，能复用，因为浏览器有缓存。

4. @import导入方式

```
<style>
    @import url(style.css);
</style>

也可以在css文件中 @import url("style.css")或者 @import "style.css"
```

@import也是引入外部css文件，不过它和外链有如下区别：

- 范畴不同： `<link>` 属于 HTML 元素，通过其href属性来引入外部文件；而 @import 属于 CSS，所以导入语句应写在 CSS 中，要注意的是导入语句应写在样式表的开头，否则无法正确导入外部文件
- 兼容性差别： `@import` 是 `CSS2.1` 才出现的概念，所以如果浏览器版本较低，无法正确导入外部样式文件；而`<link>`则没有任何兼容问题；
- 加载顺序不同：当 HTML 文件被加载时，`<link>1引用的文件会同时被加载，而 @import引用的文件则会等页面全部下载完毕再被加载
- js 修改支持：`<link>`支持使用JavaScript控制DOM改变CSS样式，@import不支持
