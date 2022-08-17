# 密码安全

- 避免使用生物密码(容易被盗用)

> 加密是如何保证用户密码的安全性?

## 信息泄露

## 传输安全

https

## 服务端安全

除了前端注意安全，后端也需要对安全进行防范，常见比如防止 SQL 注入，登录会话管理等。

## SQL/NoSQL 注入

注入攻击是指当所执行的一些操作中有部分由用户传入时, 用户可以将其恶意逻辑注入到操作中. 当你使用 eval, new Function 等方式执行的字符串中有用户输入的部分时, 就可能被注入攻击. 上文中的 XSS 就属于一种注入攻击. 前面的章节中也提到过 Node.js 的 child_process.exec 由于调用 bash 解析, 如果执行的命令中有部分属于用户输入, 也可能被注入攻击.

包括但不限于删除数据 (经济损失), 篡改数据 (密码等), 窃取数据 (网站管理权限, 用户数据) 等. 防治手段常见于:

给表名/字段名加前缀 (避免被猜到)
报错隐藏表信息 (避免被看到, 12306 早期就出现过的问题)
过滤可以拼接 SQL 的关键字符
对用户输入进行转义
验证用户输入的类型 (避免 limit, order by 等注入)
等...

## 学习资料

- https://www.zhihu.com/question/20026752
- [常见 Web 安全攻防总结](https://zoumiaojiang.com/article/common-web-security/)
- https://zhuanlan.zhihu.com/p/31875007
- https://zhuanlan.zhihu.com/p/19705180
- [从零开始学 web 安全（1）](http://www.imweb.io/topic/568958714c44bcc56092e409)
- [从零开始学 web 安全（2）](http://www.imweb.io/topic/56b876a65c49f9d377ed8ef6)
- [从零开始学 web 安全（3）](http://imweb.io/topic/57024e4606f2400432c1396d)
- [从零开始学 web 安全（4）](http://www.imweb.io/topic/574b22633eef750438d5cb44)
- [XSS 的原理分析与解剖](http://www.freebuf.com/articles/web/40520.html)
- [XSS 的原理分析与解剖（第二篇）](http://www.freebuf.com/articles/web/42727.html)
- [XSS 的原理分析与解剖：第三章（技巧篇）](http://www.freebuf.com/articles/44481.html)
- [XSS 的原理分析与解剖：第四章（编码与绕过）](http://www.freebuf.com/articles/web/55505.html)
- [漫画告诉你什么是 DDoS 攻击？](https://www.leiphone.com/news/201509/9zGlIDvLhwguqOtg.html)
- [互联网创业公司如何防御 DDOS 攻击？](https://www.zhihu.com/question/19581905)
- [web 安全之--点击劫持攻击与防御技术简介](http://www.jianshu.com/p/251704d8ff18)
- 《白帽子讲 Web 安全》相关内容
- [戏耍 XSS 的一些技巧](http://www.freebuf.com/articles/web/74324.html)
- [为什么要进行 URL 编码](https://www.cnblogs.com/jerrysion/p/5522673.html)
- [【web 安全】第二弹：XSS 攻防中的复合编码问题](https://www.cnblogs.com/kuoaidebb/p/3983886.html)
- [xss:利用编码绕过](https://www.cnblogs.com/iceli/p/8598709.html)
  http://www.freebuf.com/author/Black-Hole?page=2
