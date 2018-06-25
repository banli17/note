# js 复制到剪切板

最近使用 `iconfont.cn` 里面的图标在做项目，里面有一个赋值代码的功能。我右键审查元素，哟，居然不是 swf 按钮。因为之前也做过复制功能，用的`zeroClipboard`插件，是生成一个`flash`的按钮。

那么它是怎么做出来的呢，我找啊找，发现他是用的一个 clipboard.js 的库。

*   cdn 地址：[http://www.bootcdn.cn/clipboard.js](http://www.bootcdn.cn/clipboard.js)
*   官网：[https://clipboardjs.com](https://clipboardjs.com)

这个库通过`gzip`后只有`3kb`，非常小。支持`ie9+`，`chrome`等浏览器。

## 安装

**1. 直接引入 js 文件**

```
<script src="https://cdn.bootcss.com/clipboard.js/1.7.1/clipboard.min.js"></script>
```

**2. 使用 npm 安装**

```
// 安装
npm install clipboard --save

// 使用
const ClipboardJS = require('clipboard')
```

## 一个完整的例子

具体的使用方法参考[官网](https://clipboardjs.com)上的说明。

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>target-div</title>
</head>
<body>
    <!-- 1. 定义一些标签 
        data-clipboard-target: 要复制的对象，可以是 class 或 id。
    -->
    <div>hello</div>
    <button class="btn"
        data-clipboard-action="copy"
        data-clipboard-target="div">复制</button>

    <!-- 2. 引入库 -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/1.7.1/clipboard.min.js"></script>

    <!-- 3. 初始化 -->
    <script>
    var clipboard = new Clipboard('.btn');

    clipboard.on('success', function(e) {
        console.log(e);
    });

    clipboard.on('error', function(e) {
        console.log(e);
    });
    </script>
</body>
</html>
```

## 常用技巧

```
// 获取下一个元素的innerText内容
new ClipboardJS('.btn', {
    target: function(trigger) {
        return trigger.nextElementSibling;
    }
});

// 获取元素的属性
new ClipboardJS('.btn', {
    text: function(trigger) {
        return trigger.getAttribute('aria-label');
    }
});
```

## 注意事项

在单页应用中，可能需要使用类似下面的方法。以免复制事件重复绑定多次。

```
// 这句是关键，在初始化之前调用
if (this.clipboard) {
    this.clipboard.destroy()
    this.clipboard = null
}

this.clipboard = new ClipboardJS(".copyBtn", {
    text(trigger) {
        return trigger.previousElementSibling.innerText
    }
})
this.clipboard.on("success", (e) =>{
    e.trigger.classList.add("copied")
    setTimeout(() => {
        e.trigger.classList.remove("copied")
    }, 3000)
})
```
