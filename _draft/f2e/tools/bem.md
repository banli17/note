---
        title: 无名
        ---
        # BEM

BEM（块，元素，修饰符）是一种基于组件的Web开发方法。它背后的想法是将用户界面分成独立的块。这使得即使使用复杂的用户界面也可以轻松快速地进行界面开发，并且可以在不复制和粘贴的情况下重复使用现有代码。

## 块

一个功能独立的页面组件，可以重复使用，在html中，块由class属性表示。它的名称用来描述它的目的，而不是状态。

```
<!-- Correct. The `error` block is semantically meaningful -->
<div class="error"></div>

<!-- Incorrect. It describes the appearance -->
<div class="red-text"></div>
```

- 块不应该影响其环境，即不应给块设置外部几何边距或位置。
- 只使用class，不要使用id和标签选择器。

这样可以确保代码的复用性和可移植性。

- 块之间可以相互嵌套。
- 块之间嵌套层级可以是多层。

```
<!-- `header` block -->
<header class="header">
    <!-- Nested `logo` block -->
    <div class="logo"></div>

    <!-- Nested `search-form` block -->
    <form class="search-form"></form>
</header>
```

## 元素

属于块的一部分，不能脱离块使用。

- 元素名称用来描述其目的，而不是状态。
- 元素的全名是 `block-name__element-name`，块和元素之间用两个下划线__链接。

```
<!-- `search-form` block -->
<form class="search-form">
    <!-- `input` element in the `search-form` block -->
    <input class="search-form__input">

    <!-- `button` element in the `search-form` block -->
    <button class="search-form__button">Search</button>
</form>
```

- 元素之间可以嵌套，而且可以嵌套多级
- 元素始终属于块的一部分，而不是其它元素的一部分。也就是元素名不能是 block__elem1__elem2。

```
<!--
    Correct. The structure of the full element name follows the pattern:
    `block-name__element-name`
-->
<form class="search-form">
    <div class="search-form__content">
        <input class="search-form__input">

        <button class="search-form__button">Search</button>
    </div>
</form>

<!--
    Incorrect. The structure of the full element name doesn't follow the pattern:
    `block-name__element-name`
-->
<form class="search-form">
    <div class="search-form__content">
        <!-- Recommended: `search-form__input` or `search-form__content-input` -->
        <input class="search-form__content__input">

        <!-- Recommended: `search-form__button` or `search-form__content-button` -->
        <button class="search-form__content__button">Search</button>
    </div>
</form>
```

块的名字即命名空间，元素依赖于块。

块可以具有dom树中元素的嵌套结构。

```
<div class="block">
    <div class="block__elem1">
        <div class="block__elem2">
            <div class="block__elem3"></div>
        </div>
    </div>
</div>
```

不过上面的代码样式一般是写成下面这样。

```
.block {}
.block__elem1 {}
.block__elem2 {}
.block__elem3 {}
```

这样可以保证和结构之间的松耦合。可以方便修改。

```
<div class="block">
    <div class="block__elem1">
        <div class="block__elem2"></div>
    </div>

    <div class="block__elem3"></div>
</div>
```

元素不能单独使用，必须做为块的一部分。

```
// 正确
<form class="search-form">
    <!-- `input` element in the `search-form` block -->
    <input class="search-form__input">

    <!-- `button` element in the `search-form` block -->
    <button class="search-form__button">Search</button>
</form>


// 错误
<!-- `search-form` block -->
<form class="search-form">
</form>

<!-- `input` element in the `search-form` block -->
<input class="search-form__input">

<!-- `button` element in the `search-form` block-->
<button class="search-form__button">Search</button>
```


一个元素是一个可选的块组件。并不是所有的块都有元素。

```
<!-- `search-form` block -->
<div class="search-form">
    <!-- `input` block -->
    <input class="input">

    <!-- `button` block -->
    <button class="button">Search</button>
</div>
```

## 修饰语

用来定义块和元素的外观、状态或行为。

- 比如按钮有多大，size_s，主题theme_islands，disabled，focused，directions_left-top
- 修饰符名称通过单个下划线_与块或元素名称分开。

```
<form class="search-form search-form_focused">
    <input class="search-form__input">

    <!-- The `button` element has the `disabled` Boolean modifier -->
    <button class="search-form__button search-form__button_disabled">Search</button>
</form>


<!-- The `search-form` block has the `theme` modifier with the value `islands` -->
<form class="search-form search-form_theme_islands">
    <input class="search-form__input">

    <!-- The `button` element has the `size` modifier with the value `m` -->
    <button class="search-form__button search-form__button_size_m">Search</button>
</form>

<!-- You can't use two identical modifiers with different values simultaneously -->
<form class="search-form
             search-form_theme_islands
             search-form_theme_lite">

    <input class="search-form__input">

    <button class="search-form__button
                   search-form__button_size_s
                   search-form__button_size_m">
        Search
    </button>
</form>
```

修饰符应该改变实体的外观，行为或状态，而不是替换块或元素。

```
<!--
    Correct. The `search-form` block has the `theme` modifier with
    the value `islands`
-->
<form class="search-form search-form_theme_islands">
    <input class="search-form__input">

    <button class="search-form__button">Search</button>
</form>

<!-- Incorrect. The modified class `search-form` is missing -->
<form class="search-form_theme_islands">
    <input class="search-form__input">

    <button class="search-form__button">Search</button>
</form>
```

## 混合

在单个DOM节点上使用不同BEM实体的技术。

混合让你：

结合多个实体的行为和样式而不重复代码。

基于现有的语言创建新的UI组件。


```
<!-- `header` block -->
<div class="header">
    <!--
        The `search-form` block is mixed with the `search-form` element
        from the `header` block
    -->
    <div class="search-form header__search-form"></div>
</div>
```

在这个例子中，我们结合了search-form块的行为和样式以及块的search-form元素header。这种方法允许我们设置header__search-form元素中的外部几何和定位，而search-form块本身仍然是通用的。因此，我们可以在任何其他环境中使用该块，因为它没有指定任何填充。这就是我们可以称之为独立的原因。

## 文件结构

BEM方法中采用的组件方法也适用于文件结构中的项目。块，元素和修饰符的实现分为独立的技术文件，这意味着我们可以单独连接它们。

特征：

- 单个块对应于单个目录。
- 块和目录具有相同的名称。例如，header块位于header/目录中，menu块位于menu/目录中。
- 一个块的实现被分成独立的技术文件。例如，header.css和header.js。
- 块目录是其元素和修饰符子目录的根目录。
- 元素目录的名称以双下划线（__）开头。例如，header/__logo/和menu/__item/。
- 修饰符目录的名称以单个下划线（_）开头。例如，header/_fixed/和menu/_theme_islands/。
- 元素和修饰符的实现被分成独立的技术文件。例如，header__input.js和header_theme_islands.css。

```
search-form/                           # Directory of the search-form

    __input/                           # Subdirectory of the search-form__input
        search-form__input.css         # CSS implementation of the
                                       # search-form__input element
        search-form__input.js          # JavaScript implementation of the
                                       # search-form__input element

    __button/                          # Subdirectory of the search-form__button
                                       # element
        search-form__button.css
        search-form__button.js

    _theme/                            # Subdirectory of the search-form_theme
                                       # modifier
        search-form_theme_islands.css  # CSS implementation of the search-form block
                                       # that has the theme modifier with the value
                                       # islands
        search-form_theme_lite.css     # CSS implementation of the search-form block
                                       # that has the theme modifier with the value
                                       # lite

    search-form.css                    # CSS implementation of the search-form block
    search-form.js                     # JavaScript implementation of the
                                       # search-form block
```







































































