---
title: "NodeJS 安全"
sidebar_label: 安全
---

## 安全


安全方面的知识涉及到：

- Crypto(加密)
- TLS/SSL
- HTTPS
- XSS
- CSRF
- 中间人攻击
- Sql/Nosql 注入攻击

关于 XSS、CSRF、HTTPS、Sql/Nosql 注入攻击查看之前的[web安全知识总结与实践](/note/web-safe/index)。这里只记录一些与 nodejs 相关的知识。

### Crypto(加密)

Node.js 的 crypto 模块封装了诸多的加密功能, 包括 OpenSSL 的哈希、HMAC、加密、解密、签名和验证函数等。

> Openssl 是一个开源软件包，用于进行安全通信、避免窃听，同时确认另一端连接者的身份。

什么是哈希算法？

`openssl list-message-digest-algorithms`可以查看 OpenSSl 支持的哈希算法。

最常用的哈希算法是 SHA-256，较老的 SHA-1 或 MD5 不再安全，不应使用。

单向的加密

如何使用

```js
require("crypto")
  .createHash("sha256")
  .update("Man oh man do I love node!")
  .digest("hex");
```

`update` 方法用于将数据送给哈希算法，digest 用于转成 hash值。update 可以调用多次，就像数据流放进缓冲区。digest 参数是输出的格式，默认是 binary，可选 hex、base64。

HMAC

HMAC 可以用哈希算法将密钥和数据合并转换成一个结果

Ciphers  (暗号)英[ˈsaɪfəz]
Ciphers可以通过一个密码对信息编码和解码。它也是基于 Openssl的，通过下面命令查看支持的列表。

```
openssl list-cipher-commands
```

常用的是 AES_256  AES256	key 32字节（256位）	iv 16字节（128位）

- `crypto.createCipheriv(algorithm, key, iv)`
- `crypto.createDecipheriv(algorithm, key, iv)`

每次调用update时会返回结果。通过 final() 获取最终的结果。

iv 叫初始化向量 initialization vector，它是不可预测的唯一的，通常用随机数。随机化对实现语义安全性的加密方案很重要，iv 要在相同密钥下使用，防止攻击者推断加密消息段之间的关系。

签名和验证

Crypto还有其他用于处理证书和凭证的方法，用于TLS：

- `crypto.createCredentials()`
- `crypto.createSign()`
- `crypto.createVerify()`

这些方法为完整的加密协议提供了最后的构建块，并且需要有关真实加密协议的高级知识才有用。同样，建议开发人员使用tls模块或https模块（如果适用）。


### TLS/SSL

为了传输的安全，网景公司设计了 SSL(Secure Socket Layer)，SSL 的用途是：

1. 认证用户和服务器，确保数据发送到正确的客户机和服务器；服务器和客户端都会被认证，客户端认证是可选的
2. 加密数据防止中途被窃听；数据被密钥加密。
3. 维护数据完整性，确保数据在传输过程中不被改变。会对数据进行完整性检查。

1999 年， SSL 因为应用广泛，IETF 将它标准化后改名为传输层安全协议(Transport Layer Security, TLS)，很多地方叫 TLS/SSL，实际它是同一个东西的不同阶段叫法。

### Https
