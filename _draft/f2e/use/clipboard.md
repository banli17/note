---
title: "clipboard.js复制到剪切"
date: 2017-07-23 15:50:15
tags:
toc: true
---

## clipboard.js复制到剪切板

*   cdn 地址：[http://www.bootcdn.cn/clipboard.js](http://www.bootcdn.cn/clipboard.js)
*   官网：[https://clipboardjs.com](https://clipboardjs.com)

这个库通过`gzip`后只有`3kb`，非常小。支持`ie9+`，`chrome`等浏览器。

**1. 安装**

```
// 方式1. 引入js
<script src="https://cdn.bootcss.com/clipboard.js/1.7.1/clipboard.min.js"></script>

// 方式2. 使用npm
npm install clipboard --save
const ClipboardJS = require('clipboard')
```

**2. 一个完整的例子**

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

**3. 常用技巧**

```js
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

**4. 注意事项**

在单页应用中，可能需要使用类似下面的方法。以免复制事件重复绑定多次。

```js
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

## jquery.validate.js验证表单

- `required=true`：必填字段
- `email=true`：输入正确的邮箱格式
- `url=true`：输入正确的地址
- `date=true`：输入正确的日期
- `number=true`：数字
- `digits=true`：整数
- `equalTo='#password'`：和某元素值相同，可以用于重复输入密码
- `maxlength=5`：最大长度
- `minlength=5`：最小长度
- `rangelength="5,10"`：长度范围
- `range="5,10"`：值的范围
- `max=5`：最大值
- `min=5`：最小值

资料：[https://github.com/Tencent/weui.js](https://github.com/Tencent/weui.js)