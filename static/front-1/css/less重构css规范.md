## css重构规范

1. 供js使用，非样式类，使用`js-`前缀。

```
<a href="/login" class="js-login"></a>
```

2. 工具类Utilities，必须使用驼峰命名，前缀使用`u-`，比如 floats, containing floats, vertical alignment, text truncation，clearfix等。可以跟组件类一起使用。

```
<div class="u-clearfix">
	<div class="u-pullLeft"></div>
</div>
```

3. 组件components，比如按钮，模态框等。

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

5. 颜色，规定使用colors.less，颜色的值优先使用rgb或rgba格式，后使用16进制或hsl或英语单词。

6. z-index范围，使用`z-index.less`文件。

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

10. 多个css选择器用逗号分隔，并换行。

```
.content,
.content-edit {
  …
}
```

11. css块之间只有一个新行，不能有多余空行。

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









