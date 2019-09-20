---
title: "浏览器 DOM 详解"
sidebar_label: DOM
---

## DOM 遍历

### 简介

对下面 HTML 结构分别进行深度优先遍历、广度优先遍历。

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>

<body>
    <div class="A">
        <ul>
            <li>a</li>
            <li><span>bbb</span></li>
        </ul>
    </div>
    <div class="B">
        <a href="">hello</a>
    </div>
    <script src="./traverse.js"></script>
</body>

</html>
```

### 深度优先遍历(DFS)

```js
function traverse(el) {
    let els = []
    els.push(el)
    if (el.children) {
        for (let i = 0; i < el.children.length; i++) {
            els.push(...traverse(el.children[i]))
        }
    }
    return els
}

const a = traverse(document)
console.log(a)
// (16) [document, html, head, meta, meta, meta, title, body, div.A, ul, li, li, span, div.B, a, script]
```

### 广度优先遍历(BFS)

```js
function traverse(el) {
    const els = []
    let i = 0,cur
    els.push(el)

    // 如果 el有 children，就将 children 放进去
    while (cur = els[i]) {
        if (!cur.children) break
        els.push(...cur.children)
        i++
    }

    return els
}

const a = traverse(document)
console.log(a)
// (16) [document, html, head, body, meta, meta, meta, title, div.A, div.B, script, ul, a, li, li, span]
```