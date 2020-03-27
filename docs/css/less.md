---
title: less 总结
---

# less 文档阅读总结

## 总览

less 的概念包括：

-   变量 (Variables)
    -   常规使用
    -   可变插值： 在选择器名、属性名、url、@import 里使用
    -   将属性当作变量 `$props`
    -   当作变量使用 @@
-   父选择器 (Parent Selector)
    -   `&` 是所有父级的引用
    -   可以多个`&`
    -   逗号选择器组合爆炸
-   扩展 (Extend)
-   合并 (Merge)
-   混合 (Minxins)
-   CSS 守卫 (CSS Guards)
-   分离规则集(detached ruleset)
-   @import 规则
-   @plugin 规则
-   映射 (Maps)

## 注释

```markup
/* 我是被编译的，会保留 */
// 不会被保留
```

## 变量

**总览**

```less
@color-default: red;
@color-draken: darken(@color-default, 10%); // less 函数 darken

.box {
    color: @color-default;
}
```

**可变插值**

可以在选择器名称、属性名、URL 和@import 里使用。

```less
// 1. 选择器
@my-selector: banner;
.@{my-selector} {
}
// 编译为
.banner {
}

// 2.路径
@imgs: "../img";
body {
    background: url("@{imgs}/1.png");
}

@themes: "../src/theme";
@import "@{themes}/a.less";

// 3.属性名
@property: color;
.widget {
    @{property}: red;
}
```

**可变变量**

使用另一个变量定义变量的名称。

```less
@primary: green;
.section {
    @color: primary;
    .element {
        color: @@color;
    }
}

// 编译后
.section .element {
    color: green;
}
```

**懒声明**

变量不需要在使用前声明。

```less
// 1
.lazy-eval {
    width: @var;
}

@var: @a;
@a: 9%;

// 2
.lazy-eval {
    width: @var;
    @a: 9%;
}

@var: @a;
@a: 100%;

// 都编译为， 有作用域概念，由 css 定义的最后一个属性确定
.lazy-eval {
    width: 9%;
}
```

**将属性当作变量**

使用 `$prop` 语法将属性当作变量。

```less
.a {
    color: red;
    background: $color;
}
```

**默认变量**

```less
// library
@base-color: green;
@dark-color: darken(@base-color, 10%);

// use of library
@import "library.less";
@base-color: red; // 会覆盖前面的变量
```

## 父选择器

通过 `&` 可以引用父选择器。

```less
.button {
    &:hover {
        // .button:hover
    }
    &-ok {
        // .button-ok
    }
    &-cancel {
    }
    & & {
        // .button .button
    }
    & + & {
        // .button + .button
    }
    && {
        .button.button;
    }
    &,
    &ish {
        .button, .buttonish;
    }
}
```

& 表示所有的父元素，而不是最近的一个。

```less
.grand {
    .parent {
        & > & {
            color: red;
        }
    }
}
// 编译后
.grand .parent > .grand .parent {
    color: red;
}
```

**更改选择器顺序**

```less
.a {
    .b {
        .c & {
            color: red;
        }
    }
}
// 编译后
.c .a .b {
    color: red;
}
```

**组合爆炸**

会给逗号分割列表列出所有可能。

```less
p,
a {
    & + & {
        color: red;
    }
}
// 编译后
p + p
p + a
a + p
a + a
```

## 扩展(Extend)

它将合并的选择器和其引用的选择器合并。

```less
nav ul {
    &:extend(.inline);
    color: red;
}
.inline {
    background: blue;
}
// 编译后
nav ul {
    color: red;
}
.inline,
nav ul {
    color: red;
}
```

## 混合

```less
// 混合
.border {
    border: 1px solid red;
}
.box {
    color: @color-default;
    .border;
}

// 混合 - 可带参数
.border_02(@border_width) {
    border: solid yellow @border_width;
}

.test {
    .border_02(30px);
}

// 混合 - 默认带值
.border_03(@border_width:10px) {
    border: solid yellow @border_width;
}

.text {
    .border_03();
}

// 混合的例子
.border_radius(@radius: 5px) {
    -webkit-border-radius: @radius;
    -ms-border-radius: @radius;
    border-radius: @radius;
}
```

## 匹配模式

```less
// 普通
.sanjiao {
    width: 0;
    height: 0;
    overflow: hidden;

    border-width: 10px;
    border-color: red transparent transparent transparent; // 朝下
    border-style: solid; // ie不兼容，需要改成 solid dashed dashed dashed
}

// 匹配模式
.triangle(top, @w:5px, @c:#ccc) {
    border-width: @w;
    border-color: transparent transparent @c transparent;
    border-style: dashed dashed solid dashed;
}
.triangle(bottom, @w:5px, @c:#ccc) {
    border-width: @w;
    border-color: @c transparent transparent transparent;
    border-style: solid dashed dashed dashed;
}
.triangle(@_, @w:5px, @c:#ccc) {
    // 默认带上这个
    width: 0;
    height: 0;
    overflow: hidden;
}
.sanjiao {
    .triangle(bottom, 100px);
}

// 匹配模式 - 定位
.pos(r) {
    position: relative;
}
.pos(f) {
    position: fixed;
}
.pos(a) {
    position: absolute;
}
.pipe {
    .pos(f);
}
```

## 运算

```less
@test: 100px;
.box {
    width: @test -10 * 2;
}
```

## 嵌套规则

```less
.list {
    ul {
        li {
            a {
                color: red;
            }
        }
    }
}

// & 表示上一层选择器
a {
    &:hover {
        // 表示 a:hover
        color: red;
    }
}

// .title
//.title_nav 可以写成 &_nav
```

## arguments

```less
.border(@w:20px,@c:red,@type:solid) {
    border: @arguments;
}
```

## 避免编译

```less
.test {
    width: ~"calc(300px -10px)";
    // calc 是浏览器计算的，而不是css
}
```

## important

```less
.test {
    .border() !important; // 里面所有的元素都会加 !important
}
```

## css 重构规范

1. 供 js 使用，非样式类，使用`js-`前缀。

```
<a href="/login" class="js-login"></a>
```

2. 工具类 Utilities，必须使用驼峰命名，前缀使用`u-`，比如 floats, containing floats, vertical alignment, text truncation，clearfix 等。可以跟组件类一起使用。

```
<div class="u-clearfix">
	<div class="u-pullLeft"></div>
</div>
```

3. 组件 components，比如按钮，模态框等。

```
// 样式类组件
.btn {}
.btn--default{}

// 功能类组件
.modal {}
.modal-header {}
.modal-body {}

// 状态类组件修饰，需要组合使用，比如.modal.is-big
.modal {}
.is-big {}
```

4. 变量，命名规范是`属性-值--组件名`，比如

```
@color-grayLight-highlightMenu: rgb(51, 51, 50)
```

5. 颜色，规定使用 colors.less，颜色的值优先使用 rgb 或 rgba 格式，后使用 16 进制或 hsl 或英语单词。

6. z-index 范围，使用`z-index.less`文件。

```
@zIndex-1: 100
@zIndex-2: 200
@zIndex-3: 200
...
@zIndex-9: 900
```

7. 字体粗细，参考 type.less 类型的大小，字母间距和行高。原尺寸，空格和线的高度应避免出现在 type.less 之外。

```
N = normal
I = italic
4 = normal font-weight
7 = bold font-weight

@fontSize-micro
@fontSize-smallest
@fontSize-smaller
@fontSize-small
@fontSize-base
@fontSize-large
@fontSize-larger
@fontSize-largest
@fontSize-jumbo
```

8. 行高

```
@lineHeight-tightest
@lineHeight-tighter
@lineHeight-tight
@lineHeight-baseSans
@lineHeight-base
@lineHeight-loose
@lineHeight-looser
```

9. 文字间隔

```
@letterSpacing-tightest
@letterSpacing-tighter
@letterSpacing-tight
@letterSpacing-normal
@letterSpacing-loose
@letterSpacing-looser
```

10. 多个 css 选择器用逗号分隔，并换行。

```
.content,
.content-edit {
  …
}
```

11. css 块之间只有一个新行，不能有多余空行。

```
// ok
.content {
  …
}
.content-edit {
  …
}

// bad
.content {
  …
}

.content-edit {
  …
}
```

12. 引号使用双引号

```
background-image: url("/img/you.jpg");
font-family: "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial;
```

13. 优化选择器性能

```
// ok
.user-list > a:hover {
  color: red;
}

// ok
.user-list > .link-primary:hover {
  color: red;
}

// bad  太长了
ul.user-list li span a:hover { color: red; }
```

## 参考

-   http://lesscss.org/features/#variables-feature
