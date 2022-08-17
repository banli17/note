# CSRF 攻击

CSRF (cross-site request forgy) 叫做跨站请求伪造。比如用户登陆了 a 网站，同时打开黑客的 b 网站伪造表单，会自动在 a 网站里面发了一篇文章。原理是 b 网站有个自动提交表单，用户打开 b 网站时，由于登陆了 a 网站(有 cookie)，所以可以向 a 提交表单。

CSRF 是在用户不知情的情况下，利用用户的登陆态去完成业务请求，这里业务请求可能是银行转账，冒充用户发帖或删帖。会损害网站的声誉。

它的特征如下：

- 在 b 网站中向 a 网站发送请求。
- 会带 a 的 cookie。
- 没有访问 a 网站前端页面。
- referer 为 b 网站。

**防御 CSRF 攻击**

利用上面的特性，我们有如下防御策略：

1. 禁止第三方网站带 cookies，可以通过设置 cookie 的`same-site`属性实现。
2. 在前端加入验证码（但是影响用户体验，可以用`ccap`模块）。
3. 使用 token。前端将它放到页面`<input type=hidden token=xx>` 或 `<meta>` 中，同时后端将它设置到 cookie 中，在发送请求时后端验证这 2 个值是否一致。因为攻击者不访问前端无法获得 token ，而且无法得到和修改 cookie 里的 token。
4. 验证`origin Header`和`referer Header`。打开本地 url `file://xx` 不会发送 referer，通过 http 请求才会发。所以可以使用正则`/https?\/\/localhost/` 验证 referer 是否符合条件。但有些浏览器可以让用户设置不发 referer，所以可能会导致一些问题。

**在 php 中防御**

```php
header('Set-Cookie: text=123; SameSite=Lax');
```
