# XSS 攻击

## xss 是什么

跨站脚本攻击(cross site scripting, xss) 是往目标网站注入恶意脚本(XSS payload，如评论、第三方脚本)，然后当用户访问时，对用户进行 Cookie 窃取/会话劫持/钓鱼欺骗等各种攻击。

xss 原理是`程序 + 数据 = 结果`，即 script 由数据变成了程序。下面是一些可能中招的地方：

1. 比如用户提交了 script 参数脚本，后端直接返回了，而没有处理。这个时候用户提交的 script 会直接当作脚本执行(有些浏览器会自动防御，后面讲)。
2. 评论时插入脚本，然后其它用户登陆后访问评论页面也会中招。
3. 用户下单评论或其它操作，后台用户进入查看，这时脚本运行，黑客可以得到后台管理员的 cookie 和网址 referrer，然后登录。
4. 包括但不限于 JavaScript / VBScript / CSS / Flash 等。

## xss 能干什么

- 获取页面数据。
- 获取 cookie。
- 劫持前端逻辑，比如脚本里有`location.href=url`或者`<meta http-equiv="Refresh" content="1; url=url"/>` 跳转。
- 发送请求。
- 偷取网站任意资料、用户资料、密码和登录态，欺骗用户。
- 修改样式，误导用户

## xss 攻击分类

xss 攻击分为三种:

- `反射型`：后端直接返回用户提交的恶意参数脚本。危害小些，因为用户可能会察觉到。不过攻击者可能用短网址。
- `存储型`：会存储到数据中，相比危害更大。
- `DOM Based型`: 是用户打开了黑客发送的恶意链接，前端直接使用了链接里的参数作为数据，导致恶意脚本执行了。它很像反射型 XSS，只不过是浏览器直接反射。

> XSS 钓鱼，XSS + 钓鱼网站。比如黑客在网站插入一个吸引人的链接，用户点击链接进入黑客做的淘宝钓鱼网站，输入账号密码。这样黑客就知道用户的账号密码了。

## 可能导致 xss 的地方

- html 节点内容: 动态生成带有用户输入数据。

```html
<div>#{content}</div>
可能变为:
<div><script src="xx.js"></script></div>
```

- html 属性。

```html
<img src="#{image}" />
可能变为:
<img src="1" onerror="alert(1)" />
```

- javascript 代码。

```html
<script>
  var data = "#{data}"; // 后台返回用户输入的数据
  可能变为: var data = "google";
  alert(1);
  ("");
</script>
```

- 富文本: 富文本需要保留用户的 html，但是 html 会有 xss 风险

## 如何防御

### 浏览器自带的防御方案

浏览器默认能防御 url 出现在 html 内容或属性中（前 2 种）这样的反射型攻击，url 出现在 js 中不会防御。参数带在 url 中，chrome 会自动开启`X-XSS-Protection`头防御 xss 攻击，后端可以手动关闭。如下面的 nodejs 代码。

```js
// 0 是关闭防御 1是打开，如果有url，浏览器防御到后会向 url 发送通知
ctx.set("X-XSS-Protection", 0);
ctx.set("X-XSS-Protection", 1, url);
```

### HTML 转义

即将用户提交的内容转为实体，不让浏览器当作脚本执行。要转义的字符有：

| 字符 | 实体                                   |
| ---- | -------------------------------------- |
| <    | `&lt;`                                 |
| >    | `&gt;`                                 |
| "    | `&quot;`                               |
| '    | `&#39;`(还可以是`&apos`，但 ie 不支持) |
| /    | ``(因为如果 js 里使用，可能会被注释//) |
| &    | `&amp;`                                |

由于 html5 规定，属性可以不写引号，所以可能会出现`<a href=href>`，黑客可能修改为`<a href=hackHref href>`(第一个 href 会有效)，所以空格也要转义，但是 html 中如果有连续很多个空格，则会当成一个空格，转义了会对布局有影响，所以需要规范 html 属性必须加引号。

### JSON.stringify

对于 js 代码：有时候用户提交的数据会被后端当作变量返回给前端，这时可能包含 xss 攻击，比如:

```
var a = "hello";"
var a = 'hello';'

// 最好 var a = JSON.stringify(data)
```

这样代码就有问题了，所以需要将变量进行转义。最好的方法是使用`JSON.stringify(data)`。

### 富文本白名单

```js
// 黑名单策略，不推荐
var xssFilter = function(html){
    html = html.replace(/<\s*\/?script\s*/g, '')
        .replace(/javascript:[^'"]*/g, '')   a href='javascript:'  还有其它元素
        .replace(/onerror\s*=\s*['"]?[^'']*/, '')  还有其它事件，svg, object
    return html
}
```

富文本如果按照黑名单替换原则，xss 变种可能性太多会有漏网的。所以使用白名单策略，按白名单保留部分标签和属性，将 html 解析成 dom (cheerio) 分析过滤，再生成 html。最好在用户输入时就做处理。

```js
var whiteList = {
    img: ['src'],
    font: ['color', 'size'],
    a: ['href']
}
$(*).each(function(index, elem){
    if(!whiteList[elem.name]){
        $(elem).remove()
        return
    }
    for(var attr in elem.attribs){
        if(whiteList[elem.name].indexOf(attr) === -1){
            $(elem).attr(attr, null) // 删除属性
        }
    }
})
console.log(html, $.html())
```

> 过滤 Html 标签能否防止 XSS? 请列举不能的情况?

```html
// 使用图片 url 等方式来上传脚本进行攻击
<table background="javascript:alert(/xss/)"></table>
<img src="javascript:alert('xss')">

// 空格，回车，tab回避检查
<img src="javas cript:
alert('xss')">

// 各种编码转换(URL 编码, Unicode 编码, HTML 编码, ESCAPE 等)绕过检查
<img%20src=%22javascript:alert('xss');%22>
<img src="javascrip&#116&#58alert(/xss/)">
```

**项目中实践防御 xss 攻击**

在平时项目中，可以使用第三方包。

- [node-esapi](https://github.com/ESAPI/node-esapi/blob/master/lib/esapi.js)
- [js-xss](https://github.com/leizongmin/js-xss)

### 内容安全策略 CSP

w3c 为了抵御 XSS 攻击制定了一个规范叫 CSP(`content security policy`)，即内容安全策略，让开发者告诉客户端哪些外部资源可以被加载和执行。所以黑客即使发现了漏洞，也无法注入脚本。

开启 CSP 的方式：

1. 通过 http 头 `Content-Security-Policy`。

```
Content-Security-Policy: script-src 'self'; object-src 'none'; style-src cdn.example.org third-party.org; child-src https:
```

上面代码意思是：脚本只执行当前域名的，`<object>`标签不信任任何 URL，即不加载任何资源。样式只信任`cdn.example.org`、`third-party.org`域的，`frame` 只能是 https 的，其它资源没有限制。

2. 通过`<meta>`标签。

```html
<meta
  http-equiv="Content-Security-Policy"
  content="script-src 'self'; object-src 'none'; style-src cdn.example.org third-party.org; child-src https:"
/>
```

更多参考资料:

- [mdn 内容安全策略( CSP )](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CSP)
- [Content Security Policy 介绍](https://imququ.com/post/content-security-policy-reference.html)
- [Content Security Policy 入门教程](http://www.ruanyifeng.com/blog/2016/09/csp.html)

**php 中防御 xss**

在 php 中防御 xss 攻击可以用一下方式。

- 内置函数转义: strip_tags($content) 将html标签移除只剩下内容  htmlspecialchars($content, ENT_QUOTES) 默认不转`'`,要加 ENT_QUOTES，会将`<> & ' " `转义。
- dom 解析白名单，可以用内置 DOMDocument 类
- 第三方库 anti-xss 等 html purifier
- csp:`header('X-Xss-Protection','script-src "self" ')`
