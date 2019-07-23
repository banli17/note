---
        title: 无名
        ---
        # 30天搞定Node.js之第一天

## 预习

- Lesson 0: [《搭建 Node.js 开发环境》](https://github.com/alsotang/node-lessons/tree/master/lesson0)
- Lesson 1: [《一个最简单的 express 应用》](https://github.com/alsotang/node-lessons/tree/master/lesson1)
- Lesson 2: [《学习使用外部模块》](https://github.com/alsotang/node-lessons/tree/master/lesson2)
- Lesson 3: [《使用 superagent 与 cheerio 完成简单爬虫》](https://github.com/alsotang/node-lessons/tree/master/lesson3)

通过上面的学习回答下面的问题。

1. 回忆express搭建`hello world`的代码？
2. 一共使用了哪些模块，用它们做了些什么？
- express搭建静态服务器
- utility实现md5
- superagent可以抓数据，cheerio就是node版的jquery
3. 在做爬虫抓CNode网站时，返回结果出现乱码，可能是superagent抓数据或者express返回数据时出现的问题。superagent源码默认是utf-8（如果需要设置编码，可以使用superagent-charset库），所以是express没有设置编码的问题。

```
res.setHead(200, {'Content-Type':'text/plain;charset=utf-8'})
```
4. put和post的区别？patch是什么？
[HTTP中post和put的根本区别和优势？](https://www.zhihu.com/question/48482736?from=profile_question_card)
5. 一个url的完整形式？
```
<scheme>://<user>:<password>@<host>:<port>/<url-path>
```
6. 端口的作用和范围？
端口是用来区分传输的数据是要分配给哪个应用或进程的，一共有Math.pow(2, 16)即65536个端口，范围是0 - 65535（对TCP来说, port 0 被保留，不能被使用. 对于UDP来说, source端的端口号是可选的， 为0时表示无端口）。

## 进阶

- [七天学会NodeJS之NodeJS基础](http://nqdeng.github.io/7-days-nodejs/#1)
- [深入浅出Node.js（一）：什么是Node.js](http://www.infoq.com/cn/articles/what-is-nodejs)
- [深入浅出Node.js（二）：Node.js&NPM的安装与配置](http://www.infoq.com/cn/articles/nodejs-npm-install-config)