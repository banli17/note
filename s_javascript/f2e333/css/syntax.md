---
title: CSS 语法
sidebar_label: 语法
---


CSS的顶层样式表由两种规则组成的规则列表构成。

一种被称为 at-rule，也就是 at 规则，由 @关键字和后续的一个区块组成，如果没有区块，则以分号结束。如 `@import`、`@media`、`@keyframes`等。

另一种是 qualified rule，也就是普通规则。就是选择器和属性指定结构的规则。

## at 规则

at 规则有下面这些：

- @charset: https://www.w3.org/TR/css-syntax-3/
- @import: https://www.w3.org/TR/css-cascade-4/
- @media: https://www.w3.org/TR/css3-conditional/
- @page: https://www.w3.org/TR/css-page-3/
- @counter-style: https://www.w3.org/TR/css-counter-styles-3
- @keyframes: https://www.w3.org/TR/css-animations-1/
- @fontface: https://www.w3.org/TR/css-fonts-3/
- @supports: https://www.w3.org/TR/css3-conditional/
- @namespace: https://www.w3.org/TR/css-namespaces-3/

### @charset

@charset 用于提示 CSS 文件使用的字符编码。虽然 Web 的默认编码就是 UTF-8，但是要保证 http 头和 HTML 文件 meta 标签使用的编码是 UTF-8。如果不能保证，就需要添加：

```
@charset "utf-8"
```

### @import

@import 用于引入一个 CSS 文件，除了 @charset 规则不被引入。

```
@import "mystyle.css";
@import "common.css" screen;
@import url('landscape.css') screen and (orientation:landscape);
```

另外它还支持 supports 和 media query 形式。

```
@import [ <url> | <string> ]
        [ supports( [ <supports-condition> | <declaration> ] ) ]?
        <media-query-list>? ;
```

### @media

### @page

@page 规则用于在打印文档时修改某些CSS属性。你不能用@page规则来修改所有的CSS属性，而是只能修改margin,orphans,window 和分页符。对其他属性的修改是无效的。

```
@page {
  size: 8.5in 11in;
  margin: 10%;

  @top-left {
    content: "Hamlet";
  }
  @top-right {
    content: "Page " counter(page);
  }
}
```

### @counter-style

@counter-style 用于定义列表项的样式。只有 [firefox](https://www.mozilla.org/zh-CN/firefox/new/) 实现了。

```html
<ul>
    <li class="item">1</li>
    <li class="item">2</li>
</ul>

@counter-style circled-alpha {
    system: fixed;
    symbols: Ⓐ Ⓑ Ⓒ Ⓓ Ⓔ Ⓕ Ⓖ Ⓗ Ⓘ Ⓙ Ⓚ Ⓛ Ⓜ Ⓝ Ⓞ Ⓟ Ⓠ Ⓡ Ⓢ Ⓣ Ⓤ Ⓥ Ⓦ Ⓧ Ⓨ Ⓩ;
    suffix: " ";
  }

.item {
    list-style: circled-alpha
}
```

上面代码，circled-alpha 是一个列表样式规则，item 应用了它。


### @keyframes

@keyframes 用来定义动画关键帧。

### @fontface

@fontface 用来定义字体。

### @support 

@support 用来检测环境的特征，和 media 类似。只有 firefox 实现了。具体查看[mdn @support](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@supports)。

```
@supports (animation-name: test) {
    /* 如果支持不带前缀的animation-name,则下面指定的CSS会生效 */
    @keyframes { /* @supports是一个CSS条件组at-rule,它可以包含其他相关的at-rules */
      …
    }
}

@supports ( not ((text-align-last:justify) or (-moz-text-align-last:justify) ){
    /* 如果不支持 text-align-last:justify 属性 */
}
```

### @namespace

@namespace 是用来定义使用在CSS样式表中的XML命名空间的@规则。具体查看[mdn @namespace](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@namespace)。

```
@namespace url(http://www.w3.org/1999/xhtml);
@namespace svg url(http://www.w3.org/2000/svg);

/* 匹配所有的XHTML <a> 元素, 因为 XHTML 是默认无前缀命名空间 */
a {}

/* 匹配所有的 SVG 里的 <a> 元素 */
svg|a {}

/* 匹配 XHTML 和 SVG <a> 元素 */
*|a {}
```

### @viewport

@viewport 用于设置文档的视口，目前还在实验中，具体看 [mdn @viewport](https://developer.mozilla.org/en-US/docs/Web/CSS/@viewport)。一般是使用`<meta>`标签代替。

除此之外，还有一些目前不推荐使用的 at 规则。

- @color-profile
- @document
- @font-feature-values

## 普通规则

普通规则如下：

```
selector {
    property: value;
    ...
}
```

### 选择器

https://www.w3.org/TR/selectors-4/

### 属性和值

属性是以中划线、下划线、字母组成的标识符，CSS 还支持反斜杠转义。注意，在[CSS Variables标准](https://www.w3.org/TR/css-variables/)中，以双中划线开头的属性会被当作变量。配合 var 函数使用。

```
:root {
  --main-color: #06c;
  --accent-color: #006;
}
/* The rest of the CSS file */
#foo h1 {
  color: var(--main-color);
}
```

属性的值，主要在[标准 CSS Values and Unit]中，属性值可能以下类型：

- 关键字：initial、unset、inherit。
- 字符串: 比如 content 属性。
- URL：使用 url() 函数的 URL 值。
- 整数：如`flex:1`。
- 维度：单位的整数，如 100px。
- 百分比
- 颜色
- 图片：如 background-image
- 2D 位置：如 background-position
- 函数：如 translateX(100px)
    - 计算型函数
        - calc()
        - max()
        - min()
        - clamp(): 限定一个范围，超出则取最大值或最小值。
        - toggle(): 在多余一个元素时生效，会在几个值间切换，如 `list-style-type: toggle(circle, square)`。
        - attr(): 如`a::after{ content: "(" attr(href) ")"}`



## 参考资料

- 重学前端
- CSS 相关标准：https://www.w3.org/TR/?title=css
- CSS 最新标准: https://www.w3.org/TR/css-syntax-3/

# 1. 图片

* filter
    * blur()
    * brightness()
    * contrast()
    * drop-shadow()
    * grayscale()
    * hue_rotate()
    * invert()
    * opacity()
    * saturate()
    * sepia()
* cross-fade()
* element()
* image-set()
* imagefunction()

# 2. 图形绘制
* conic-gradient()
* linear-gradient()
* radial-gradient()
* repeating-linear-gradient()
* repeating-radial-gradient()
* shape()

# 3. 布局
* calc()
* clamp()
* fit-content()
* max()
* min()
* minmax()
* repeat()

# 4. 变形/动画
* transform
    * matrix()
    * matrix3d()
    * perspective()
    * rotate()
    * rotate3d()
    * rotateX()
    * rotateY()
    * rotateZ()
    * scale()
    * scale3d()
    * scaleX()
    * scaleY()
    * scaleZ()
    * skew()
    * skewX()
    * skewY()
    * translate()
    * translate3d()
    * translateX()
    * translateY()
    * translateZ()

# 5. 环境与元素
* var()
* env()
* attr()