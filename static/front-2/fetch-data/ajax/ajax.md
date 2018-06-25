# ajax

## 基础

**阅读资料回答问题**
- http://javascript.ruanyifeng.com/bom/ajax.html
- http://javascript.ruanyifeng.com/bom/same-origin.html
- http://javascript.ruanyifeng.com/bom/cors.html
- http://javascript.ruanyifeng.com/htmlapi/websocket.html
- https://developer.mozilla.org/zh-CN/docs/Web/Guide/AJAX

1. 简述ajax，及其代码流程？
ajax就是利用XMLHttpRequest对象向后端发送请求，返回数据并处理的技术，整个过程无需刷新页面。
代码流程如下：创建ajax对象 -> open() -> 监听事件，readyState为4，且响应码是2开头或304 -> send() 发送请求。

2. ajax对象的属性
    - 说说readyState的几种状态，分别是什么意思?
    0: 请求还没有初始化，open之前
    1: 建立连接，open后
    2: 请求已接受,send后
    3: 正在处理请求
    4: 请求已完成，且响应已准备好
    - response是什么，类型可以是哪些，怎么设置类型？
    - responseType的作用？
    - responseText属性是什么？服务器以文本字符的形式返回
    - responseXML属性是什么？以 XMLDocument 对象方式返回
    - 常用的status有哪些，分别是什么意思?
    - statusText和status的区别？
    - timeout的作用?
3. ajax对象的方法
    - open()：说说它的参数?
    open的第一个参数是请求方法，注意要大写，否则有些浏览器无法处理请求。如果是同步，不必使用函数，不过不推荐，体验不好，而且Firefox 30.0已经废弃同步请求。最好在回调里使用try...catch，因为通信错误（如果服务器宕机）会抛出错误。
    - overrideMimeType()和responseType
    - 发送和接收二进制数据
4. ajax的事件有哪些？(8个)
5. withCredentials是什么，怎么用?
6. 怎么获取服务器所有响应头信息和某字段头信息？所有头信息的格式？如果头信息字段重名会怎么样？
7. http请求方式有哪些，get和post的区别?
8. send()的参数类型有哪些?
9. setRequestHeader() 什么时候用?如果多次设置同一字段这个字段的值是什么?怎么解决post乱码问题?
10. 怎么通过overrideMimeType()接受二进制数据？接受二进制数据更好的方式是什么？
11. form表单提交的四种格式，以及数据在浏览器面板里的样子?
12. 什么是同源策略
13. 跨域的不同窗口通信解决方案有哪些，分别的原理，实战？优缺点？
14. 什么是同源？非同源什么会限制？每种限制分别的解决方法？（考虑完全不同源的情况）
15. window.postMessage怎么用？通过它读写其它窗口的localStorage。
16. ajax跨域的解决方案和原理？各种方案的优点和缺点？

## 进阶

- 写一个简单的`ajax`库。
- 学习`zepto`的`ajax`源代码。
- `$.Deferred`的实现，再看看Promise。
- 通过两种方式`FormData`和`file api`分别实战文件上传？

## 参考资料

- [zepto源码](https://github.com/madrobby/zepto)
    

参考资料：
- [CORS通信](http://javascript.ruanyifeng.com/bom/cors.html)
- [HTTP访问控制（CORS）](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS#)
服务器和浏览器模型
使用nodeJS搭建服务器
使用nodeJS建传统的网站
request的7种方式
HTTP协议详解
XMLHttpRequest对象详细介绍
promise版的Ajax库(jQuery源码级)
数据处理及JSONP数据绑定
JSONP和其它跨域技术
用jQuery实现Ajax