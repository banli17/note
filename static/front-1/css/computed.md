css值的来源有：

1. 继承父级的
2. 浏览器默认的
3. 我们自己写的


## 应用值

应用值是最终应用的样式。

如果元素本身声明了样式，则它是应用值；如果没有声明，如果该属性是默认继承，则取父元素同属性的应用值，通过该方式获得的值叫做继承值，如果属性默认不继承，则取该属性的初始值。

## 继承值


## 初始值

每个属性都有一个默认的初始值，如width: auto，font-size: medium。
## 其余值



常见继承属性

文本相关属性都可以继承

color、font、font-family、font-size、font-style、font-variant、font-weight、text-decoration、text-transform、letter-spacing、word-spacing、white-space、word-break、overflow-wrap、line-height、direction、text-indent、text-align、text-shadow

列表相关属性

list-style-image、list-style-position、list-style-type、list-style

表格相关属性

border-collapse、border-spacing

visibility 和 cursor

常见非继承属性

盒模型相关属性

margin、border、padding、height、min-height、max-height、width、min-width、max-width、box-sizing

布局类属性

display、overflow、position、left、right、top、bottom、z-index、float、clear、table-layout、vertical-align

系列类

background 系列、transform 系列、transtion 系列、animation 系列、flexbox 系列、grid 系列


- https://www.w3.org/html/ig/zh/wiki/CSS2/cascade