# XSS攻击

## 学习资料

- [从零开始学web安全（1）](http://www.imweb.io/topic/568958714c44bcc56092e409)
- [从零开始学web安全（2）](http://www.imweb.io/topic/56b876a65c49f9d377ed8ef6)
- [从零开始学web安全（3）](http://imweb.io/topic/57024e4606f2400432c1396d)
- [XSS的原理分析与解剖](http://www.freebuf.com/articles/web/40520.html)
- [XSS的原理分析与解剖（第二篇）](http://www.freebuf.com/articles/web/42727.html)
- [XSS的原理分析与解剖：第三章（技巧篇）](http://www.freebuf.com/articles/44481.html)
- [XSS的原理分析与解剖：第四章（编码与绕过）](http://www.freebuf.com/articles/web/55505.html)

## 总结

**1. XSS简介?**

XSS 全称是 Cross-Site Script，为了和 CSS 区分，所以叫 XSS。它是往目标网站注入恶意脚本，然后当用户访问时，获取用户信息或进行其它操作。

**2. XSS的有哪几种，实现的原理分别是什么?**

XSS一般分为三种，分别是：`反射型`、`存储型`、`DOM Based型`。

**3. 反射型XSS的原理是什么?**

反射型XSS是黑客将恶意脚本放在url的参数中，而服务端恰好直接使用了该参数。黑客把带有脚本的url发给用户访问，恶意脚本执行，从而攻击用户。这个过程像是恶意脚本被服务端反射回来。

比如一个搜索页面`x.com?keyword=bag`可以搜索到包包。如果服务端是直接使用了参数keyword，如下：

```javascript
// 服务端文件 index.js
res.end(`<p>搜索词：${keyword}</p>`)
```

这时当用户访问`x.com?keyword=<script>alert('我是恶意脚本')</script>`这个url时，直接就会执行恶意脚本。不过我用mac测试，大多数浏览器都不会执行脚本，这是因为浏览器内置了XSS filter，能过滤大多数XSS攻击。（可以将keyword设为`<img src='图片地址'>`，可以看到页面显示了这张图片。)

**4. 存储型XSS的原理是什么?**

`存储型XSS`是黑客提交表单时，将恶意脚本提交到服务端，并存储。用户访问页面时，该恶意脚本执行。

比如黑客在评论时提交了下面一段代码：

```javascript
// 将cookie发送给黑客
<script>sendToHacker(document.cookie)</script>
```

服务端将它存储在数据库中，前端页面直接显示这段代码。当用户访问评论页面时，用户的cookie信息就会被发送给黑客。

**5. DOM Based型XSS的原理是什么？**

`DOM Based型XSS`是用户打开了黑客发送的恶意链接，前端直接使用了链接里的参数作为数据，导致恶意脚本执行了。它很像反射型XSS，只不过是浏览器直接反射。

**6. 对比这三种XSS攻击?**

对比这三种XSS攻击：
- 反射型XSS是非持久的，只有用户点击链接才会触发一次。和服务端返回了恶意脚本有关
- 存储型XSS是持久的，保存在服务端，用户访问页面就会触发。和服务端返回了恶意脚本有关
- DOM Based型XSS主要和前端有关，和服务端没有太大关系。

**7. 什么是XSS Payload，它主要分为哪几种?**

XSS Payload 是能够实现XSS攻击的恶意脚本，主要有：
- 窃取用户cookie，通过document.cookie
- 识别用户浏览器，针对不同浏览器实现不同的攻击。通过navigator.userAgent
- 伪造请求，get/post
- XSS钓鱼，XSS + 钓鱼网站。比如黑客在网站插入一个吸引人的链接，用户点击链接进入黑客做的淘宝钓鱼网站，输入账号密码。这样黑客就知道用户的账号密码了。

**8. 针对上面的XSS攻击，如何做好XSS防御？**

a). 设置httpOnly，防止脚本读取cookie。但是前端也不能操作cookie了。另外它只是在发生XSS后防止读取cookie。所以不是从根本上解决XSS。

```
// http设置
Set-Cookie: userkey=userkeyValue;HttpOnly
```

设置了HttpOnly后，可以在控制台的`Application -> cookie`的http字段看到有一个对勾。

b). 输入检查：检查格式、过滤危险字符(script、javascript、onclick等)、转义特殊字符(<、>、&、\等)。比如在提交表单时，对文本进行转义，后端返回数据时，也进行转义。需要前后端配合，因为黑客可以绕过前端。

```javascript
/**
 * 转义 HTML 特殊字符
 * @param {String} str
 */
function htmlEncode(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
```

c). 输出检查：

之所以会发生 XSS 攻击，就是由于用户的输入被当做代码来执行，导致出现意料之外的运行结果。在课程中，我们讲到用户数据被填充到 HTML 代码中，可能存在以下五个场景：

- HTML 标签中（用户输入将在 HTML 解析环境进行）:使用html编码
- HTML 非事件属性中（用户输入将在 HTML 解析环境进行）:使用html编码
- script 标签中 （用户输入将在 JavaScript 解析环境进行）:使用javascript编码
- HTML 事件属性中（用户输入将在 JavaScript 解析环境进行）:使用javascript编码
- 地址栏中（用户输入将在 URL 解析环境进行）：使用URL编码

html编码就是将用户输入的html代码进行转义，浏览器会将html中的`<`和`>`理解为标签。为了正常的显示它们，而不以html去解析它们，需要使用字符实体。html编码分为：
- html十六进制编码：&#xH
- html十进制编码：&#D
- html实体编码：&lt;，上面的htmlEncode函数就是将字符转成实体编码。

在 HTML 进制编码中其中的数字则是对应字符的 unicode 字符编码。
比如单引号的 unicode 字符编码是27，则单引号可以被编码为&#x27;

## 在项目中使用库做XSS防御

- [node-esapi](https://github.com/ESAPI/node-esapi/blob/master/lib/esapi.js)
- [js-xss](https://github.com/leizongmin/js-xss)


## 深入学习

- [戏耍XSS的一些技巧](http://www.freebuf.com/articles/web/74324.html)

- [为什么要进行URL编码](https://www.cnblogs.com/jerrysion/p/5522673.html)
- [【web安全】第二弹：XSS攻防中的复合编码问题](https://www.cnblogs.com/kuoaidebb/p/3983886.html)
- [xss:利用编码绕过](https://www.cnblogs.com/iceli/p/8598709.html)
http://www.freebuf.com/author/Black-Hole?page=2
























































