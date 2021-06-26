# cookies 问题

cookies 特性

- 前端数据存储
- 后端通过 http 头设置
- 请求时通过 http 头传给后端
- 前端可读写
- 遵守同源策略：协议、域名、端口一致

cookie 的字段

- 域名：只能使用自己域名下的
- 有效期：默认是 Session，会话结束就到期，toGMTString()
- 路径: path 不同，cookie 可以同名
- http-only：cookie 只能被 http 使用，即只能被后端读写。前端不能使用
- secure：https 时才能使用
- same-site，兼容性问题

**js 可以读取、设置、删除 cookies**

```js
document.cookie;
```

cookies 作用

- 存储个性化设置
- 存储未登录时用户唯一标识
- 存储已登录用户的凭证
- 存储其它业务数据

存储已登录用户的凭证

过程：前端提交登陆，后端验证，存储 session 设置 cookie，前端发 cookie

1、用户 ID，下次根据 id 来识别用户，cookie 容易被篡改，模拟其它用户登录

2、用户 ID + 签名，这个签名只有后端能算出来。签名是不可逆的。cookie 内容有 userId，sign，后端拿到 userId 再签名和 sign 进行对比即可。

```javascript
const KEY = "fjas3&#11fdjsk"; // 私钥
crypt.cryptUserId = function (userId) {
  var crypto = require("crypto");
  var sign = crypto.createHmac("sha256", KEY);
  sign.update(userId + "");
  return sign.digest("hex");
};
```

3、SessionId(持久化，可存文件或数据库中)：服务端返回一个随机数，根据随机数判断用户，前端 cookie 没有用户可识别的信息。黑客不知道怎么修改。 session 的原理和实现。

Cookies 和 XSS 的关系

- XSS 可能偷取 Cookies
- http-only 的 cookies 不会被偷

Cookies 和 CSRF 的关系

- CSRF 利用了用户 Cookies
- 攻击站点无法读写 Cookies
- 最好能阻止第三方读取 Cookies

Cookies 安全策略

- 签名防篡改(对明文进行签名)
- 加密(对 userid 进行加密，别人看不懂，无法修改)，crypto.createCipher()、crypto.createDecipher()

```javascript
// 加密
const cipher = crypto.createCipher("des", KEY);
const text = cipher.update("hello", "utf8", "hex");
text += cipher.final("hex");

// 解密
const cipher = crypto.createDecipher("des", KEY);
const origin = cipher.update(text, "hex", "utf8");
origin += decipher.final("utf8");
```

- http-only(防止 XSS)
- secure：https 下才能使用 cookie
- same-site:只支持 chrome
