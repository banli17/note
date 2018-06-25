# csrf攻击

## 学习资料

- [从零开始学web安全（4）](http://www.imweb.io/topic/574b22633eef750438d5cb44)


## 什么是csrf攻击

csrf的全称是`cross-site request forgery`，即跨站请求伪造。

场景如下：A登录了银行网站bank.com，又打开了黑客的网站(比如yellow网站)，黑客网站的内容里有个表单：

```html
<form action="//bank.com">
    <input type="text" name="to" value="黑客">
    <input type="text" name="money" value="100">
    <input type="submit">
</form>
<script>
    setTimeout(() => {
        document.forms[0].submit()
    }, 10000)
</script>
```

上面的代码会自动向bank.com提交一个从A向黑客转100元的请求(这个请求会自动带上bank.com的cookie登录信息)。最后黑客得到了100元，用户A少了100元。

所以csrf就是通过黑客网站向正规网站发送一个伪造的请求。

## 如何防范csrf

csrf有几个特点：

- 发送请求时用户不知情
- 跨站了，发送请求时是从黑客网站发送的，而不是bank.com。
- 参数伪造

所以解决方案如下：

- 让用户知情。采用防伪码验证。但是这样做体验不好。
- 针对这点可以判断http头的referer，看是不是bank.com，如果不是，则拒绝请求。但是referer可以被篡改，所以也不行。
- 使用token(这个是主要的方式)：它的原理是通过将cookie进行加密后，将它作为作为一个参数token发送给后台验证，因为黑客网站跨域了，无法读取bank.com的cookie，所以它无法伪造这个token参数。这种方法是防御csrf最常用的方式。


## 实战

1. 做一个csrf攻击的例子。
2. 采用上面的三种防御方式分别进行csrf防御。




