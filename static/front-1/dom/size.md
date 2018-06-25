## 页面尺寸相关汇总

页面尺寸是在平时开发中经常用到的知识，之前对原生 js 和 jquery 尺寸都还是很熟悉的。但是很长时间没用也迷迷糊糊了，今天专门花2个小时学习总结一下。

## 学习资料

- [如何使用 JavaScript 获取页面、窗口的高度？](https://www.zhihu.com/question/20816879)

## window窗口尺寸

```
// 含滚动条，不含浏览器边框
window.innerWidth
window.innerHeight

// 浏览器窗口宽高，包含浏览器边框
window.outerWidth
window.outerHeight
```

## 元素尺寸

一共有13个相关属性。

**元素宽度**
- Element.clientWidth 返回一个整数，表示元素的 css 宽度，单位是 px。只对块级元素有效，行内元素返回 0。如果块元素没有设置css高度，返回实际高度。包含 padding。如果有滚动条，要减去滚动条的宽度(15px)。这个值始终是整数，如果是小数会四舍五入。
- Element.clientHeight

```
// 可视区宽高，不含滚动条
document.documentElement.clientWidth
document.documentElement.clientHeight
```

关于网页document的宽高，可以看最下面jquery源码的获取方式。

- Element.scrollWidth
- Element.scrollHeight 只读。返回一个整数(小数会四舍五入)，表示当前元素的总高度，单位是 px。包括溢出容器，当前不可见的部分。包括 padding，不包括 border、margin 以及滚动条的高度，还包括伪元素(:before，:after)的高度，绝对定位后就不包括了。

**边框宽度**
- Element.clientLeft 返回一个整数（小数会四舍五入），表示元素节点左边框的宽度，单位是 px。不包括左侧的 padding 和 margin。如果没有设置左边框，或者是行内元素(display: inline)，则返回 0。
- Element.clientTop

**滚动距离**
- Element.scrollLeft 滚动的距离，没有滚动条则返回0。可读写。
- Element.scrollTop

```
// 网页垂直水平滚动距离
document.body.scrollTop
document.body.scrollLeft
```

**相对offsetParent尺寸**
- Element.offsetParent 返回最靠近当前元素的、并且 CSS 的 position 属性不等于 static 的上层元素(包括当前元素)。用于确定子元素位置偏移的计算基准。Element.offsetTop、Element.offsetLeft 就是 offsetParent 元素计算的。如果该元素是不可见的(display:none)，或者位置是固定的(position:fixed)，则 offsetParent 属性返回 null。如果没有，则是 body 元素。
- Element.offsetHeight 返回css的垂直高度，包括元素的高度，padding 和 border，还有滚动条的高度(如果有滚动条)。不包括溢出部分。
- Element.offsetWidth
- Element.offsetLeft 返回元素左上角距离 Element.offsetParent 节点的水平距离。单位是 px。
- Element.offsetTop


## 读jQ源码

jQ中和尺寸相关的方法有下面几个：

```javascript
width()           // 内容宽
height()
innerWidth()      // 含padding
innerHeight()
outerWidth()      // 含border
outerHeight()
outerWidth(true)  // 含margin
outerHeight(true)
```

jq用一段代码生成了上面几个方法：


```javascript
// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
		function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( isWindow( elem ) ) {

					// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
					return funcName.indexOf( "outer" ) === 0 ?
						elem[ "inner" + name ] :
						elem.document.documentElement[ "client" + name ];
				}

				// 获取document的宽高
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// 获取scroll[Width/Height] or offset[Width/Height] or client[Width/Height]中的最大值
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// 获取元素宽、高
					jQuery.css( elem, type, extra ) :

					// 给元素设置宽、高
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable );
		};
	} );
} );
```

上面的代码可以看出，下面这些常用的方法：

```javascript
$(window).width()    // 返回可视区宽度
$(window).innerWidth() // 可视区宽度 + 滚动条宽度
```


