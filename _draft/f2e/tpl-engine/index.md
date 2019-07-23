---
title: "学习写一个 javascript 模版引擎"
date: 2016-08-19 16:15:57
tags:
---

## 学习资料

- [一个对前端模板技术的全面总结](http://www.html-js.com/article/Regularjs-Chinese-guidelines-for-a-comprehensive-summary-of-the-front-template-technology)
- [高性能JavaScript模板引擎原理解析](https://cdc.tencent.com/2012/06/15/%E9%AB%98%E6%80%A7%E8%83%BDjavascript%E6%A8%A1%E6%9D%BF%E5%BC%95%E6%93%8E%E5%8E%9F%E7%90%86%E8%A7%A3%E6%9E%90/)
- [artTemplate 模板引擎源码解析](https://www.zybuluo.com/yangfch3/note/527054#%E6%A8%A1%E6%9D%BF%E7%9A%84%E7%BC%96%E8%AF%91%E6%80%9D%E8%B7%AF)
- [实现一个简单的模板引擎](http://www.alloyteam.com/2016/10/implement-a-simple-template-engine/)
- [JavaScript模板引擎原理，几行代码的事儿](http://www.cnblogs.com/hustskyking/p/principle-of-javascript-template.html)


## 字符串替换

[JavaScript模板引擎原理，几行代码的事儿](http://www.cnblogs.com/hustskyking/p/principle-of-javascript-template.html)这篇文章讲述了一个简单的字符串模版引擎的原理，具体可以看这篇文章。我自己按照他的方法实现了一遍，下面只是代码。

比如我们需要解析下面的模版，可以将 tpl 进行替换。

```javascript
var data = {
    "posts": [{
        "expert": "content 1",
        "time": "yesterday"
    }, {
        "expert": "content 2",
        "time": "today"
    }, {
        "expert": "content 3",
        "time": "tomorrow"
    }, {
        "expert": "",
        "time": "eee"
    }]
};
var tpl = `
    <% for(var i=0;i<this.posts.length;i++){
        var post = posts[i]; %>
        <% if(!post.expert){ %>
            <span> post is null </span>
        <% } else { %>
            <a href='#'><% post.expert %> at <% post.time %></a>
        <% } %>
    <% } %> 'aaa'
`

// 将tpl替换为下面代码即可，然后 new Function
tpl = `var r = []
for(var i=0;i<this.posts.length;i++){
        var post = posts[i];
    if(!post.expert){
        r.push('<span> post is null </span>')
    } else {
        r.push("<a href='#'>")
        r.push(post.expert) 
        r.push('at')
        r.push(post.time)
        r.push("</a>")
    }
}
r.push('aaa')
return r.join('')`
```

下面的代码就可以实现这个功能。我最初写 while 时都是堆叠if判断，后来看文章里用 add 方法链式调用还是挺巧妙的，值得学习。

```javascript
function tplEngine(tpl, data) {
    const reg = /<%([\s\S]+?)%>/g,
        regOut = /^\s*(if|for|else|switch|case|break|{|})/;
    let code = 'var r = [];\n',
        cursor = 0;

    // 将tpl放到数组
    function add(line, js) {
        js ? (code += regOut.test(line) ? line : `r.push(${line});`) :
            (code += /^\s*$/.test(line) ? '' : `r.push("${line.replace(/(['"])/g, '\\$1')}");`)
        return add
    }

    while (match = reg.exec(tpl)) {
        add(tpl.slice(cursor, match.index))(match[1], true)
        cursor = match.index + match[0].length
    }
    add(tpl.slice(cursor))
    code += ";return r.join('')"

    return new Function(`with(this){${code.replace(/[\t\n\r]/g, '')}}`).apply(data)
}

// 使用
document.body.innerHTML = tplEngine(tpl, data)
```

字符串模版引擎的问题：

1. innerHTML会导致安全问题，虽然html5规定不执行由innerHTML插入的script脚本，但是可以用其它方式执行脚本。所以如果是插入纯文本，可以用`Node.textContent`设置。

```javascript
// 不执行
document.body.innerHTML = `<script>alert(1)</script>`

// 执行
document.body.innerHTML = `<img src='xx' onerror='alert(1)' />`
```
2. 所以使用innerHTML需要对字符串进行转义。

```javascript
const escape = (str) => { 
    // 防注入转码映射表 
    const escapeMap = { 
      '<': '&lt;', 
      '>': '&gt;', 
      '&': '&amp;', 
      ' ': '&nbsp;', 
      '"': '&quot;', 
      "'": '&#39;', 
      '\n': '<br/>', 
      '\r': '' 
    }; 
 
    return str.replace(/[<>$ "'\n\r]/g, (one) => { 
      return escapeMap[one]; 
    }); 
} 
```

3. js解析模版后，需要再次渲染，会耗费时间。

