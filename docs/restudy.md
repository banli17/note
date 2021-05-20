---
title: 重学前端笔记
---

## 5.javascript 类型

7 种类型: Number String Boolean Null Undefined Object Symbol

- window.undefined 是一个变量而不是关键字，为了防止篡改所以用 void 0 代替。
- null 是关键字
- string 最大长度 2^53-1，string 是字符串的 utf16 表示，charAt,length 等方法都是针对的 utf16 编码，所以字符串最大长度是受编码长度影响的。Unicode 的码点通常用 U+??? 来表示，其中 ??? 是十六进制的码点值。 0-65536(U+0000 - U+FFFF 16 位)的码点被称为基本字符区 域(BMP)。 js 把每个 utf16 单元当一个字符来处理，所以非 BMP 字符要格外小心。 这样设计是为了性能和尽可能实现起来简单，现实中很少用非 BMP 字符。
- number : 数字采用 64 位浮点格式表示。可以利用 Number.MAX_VALUE Number.MIN_VALUE 查看
  - Number 类型有 18437736874454810627(即 2^64-2^53+3) 个值
  - IEEE 754-2008 规定的双精度浮点数规则
  - NaN:
  - Infinity,无穷大，为了防止 x/0 报错
  - -Infinity,负无穷大，为了防止 x/-0 报错
  - +0 -0 的区分
  - 整数范围 -0x1fff fffffff Number.MIN_SAFE_INTEGER - 0x1fffffffffffff Number.MAX_SAFE_INTEGER
  - 非整数 Number 类型无法用 == ===比较 0.1 + 0.2 != 0.3
  - console.log( Math.abs(0.1 + 0.2 - 0.3) <= Number.EPSILON 1.x-1): 检查浮点数差绝对值是否小于最小精度
- Symbol: 根据描述返回一个唯一值
  - 可以使用 Symbol.iterator 给对象定义行为

```js
var o = new Object();
o[Symbol.iterator] = function () {
  var v = 0;
  return {
    next: function () {
      return { value: v++, done: v > 10 };
    },
  };
};
for (var v of o) console.log(v);
```

- object: 在 JavaScript 中，对象的定义是“属性的集合”。属性分为数据属性和访问器属性，二者 都是 key-value 结构，key 可以是字符串或者 Symbol 类型。
  - JavaScript 中的几个基本类型，都在对象类型中有一个“亲戚”。它们是: Number; String; Boolean; Symbol。
  - Number、String 和 Boolean，三个构造器是两用的，当跟 new 搭配时，它们产生对 象，当直接调用时，它们表示强制类型转换。
  - Symbol 函数比较特殊，直接用 new 调用它会抛出错误，但它仍然是 Symbol 对象的构 造器。
  - 基本类型能调方法？运算符提供了装箱操作，它会根据基础类型构造一 个临时对象，使得我们能在基础类型上调用对应对象的方法。

类型转换 - null undefined false 0/NaN ''

StringToNumber

## 10-浏览器：一个浏览器是如何工作的？（阶段一）

浏览器工作过程

1. 发送 http/https 请求，向服务器请求页面
2. 收到页面后，解析 html 为 DOM 树
3. 计算 DOM 树上的 css 属性
4. 根据 css 属性对元素逐个进行渲染，得到内存中的位图
5. 可选：对位图进行合并，会增加后续绘制速度
6. 合成之后，绘制到页面上

http 协议

基于 tcp 协议，规定了 request-response 模式。

http 协议格式

- 请求
  - 请求行：方法 路径 协议/版本
  - 请求头
  - 请求体
- 响应
  - 响应行: 协议/版本 状态码 状态文本
  - 响应头 空一行，两个换行符
  - 响应体

方法：

- GET 访问页面 POST 提交表单
- HEAD 和 GET 类似，只返回请求头，一般由 js 发起
- PUT 和 DELETE，添加和删除资源，只是语义的约定没有强约束
- CONNCET 多用于 https 和 websocket
- OPTIONS 和 TRACE 一般用于调试，多数线上服务不支持

状态码和状态文本

- 1xx 临时响应，表示客户端请继续。会被浏览器 http 库直接处理，不会让上层知晓。
- 2xx 请求成功
  - 200
- 3xx 请求目标有变化，希望客户端进一步处理
  - 301&302
  - 304 缓存没有更新
- 4xx 客户端请求错误
  - 403 无权限
  - 404 请求页面不存在
  - 418 彩蛋，这就是个玩笑。IETF 在 1998 年愚人节时发布的一个笑话 RFC
- 5xx 服务端错误
  - 500 服务端错误
  - 503 服务端暂时性错误，等会再试

请求头和响应头

请求头
Accept
Accept-Encoding
Accept-Language
Cache-Control
Connection
Host
If-Modified-Since
If-None-Match
User-Agent
Cookie

响应头
Cache-Control
Connection
Content-Encoding
Content-Length
Content-Type
Date
ETag
Expires
Keep-Alive
Last-Modified
Server
Set-Cookie
Via

请求体：body
application/json
application/x-www-form-urlencoded form 表单提交
multipart/form-data 文件上传
text/xml

https 作用：
确定请求的目标服务器身份
保证传输数据不被窃听和篡改

使用加密通道来传输 http 内容，https 首先与服务器建立一条 TLS 加密通道，TLS 构建于 TCP 之上，实际是对传输的内容做一次加密。

http2 最大的改进
支持服务端推送: 可以在发送第一个请求时，提前把内容推送给客户端，放入缓存，避免客户端请求顺序带来的并行度不高导致的性能问题。
支持 TCP 连接复用: 避免三次握手开销，和初建 TCP 连接时传输窗口小的问题。

Note: 其实很多优化涉及更下层的协议。IP 层的分包情况，和物理层的建连时间是需要被考虑的。

DNS 查询得到 IP
tcp/ip 的并发限制
get 和 post 的区别
五层因特网协议栈
长连接与短连接
http2.0 与 http1.1 的显著不同点
强缓存与协商缓存

## 11-浏览器：一个浏览器是如何工作的？（阶段二）

如何将 html 代码解析为 DOM 树

字符流 -> 状态机 -> 词 token -> 栈 -> DOM 树

词法分析: 字节流解析成词(token)
html token: 标签开始 属性 标签结束 注释 CDATA 节点
常见方案是状态机
状态机 https://html.spec.whatwg.org/multipage/parsing.html#tokenization

语法分析：解析 token，生成 DOM 树

html 容错 http://www.w3.org/html/wg/drafts/html/master/syntax.html#tree-construction

写一个 html 解析器 https://github.com/aimergenge/toy-html-parser

## 12-浏览器：一个浏览器是如何工作的（阶段三）

浏览器是如何把 CSS 规则应用到节点上，并给这棵朴素的 DOM 树添加上 CSS 属性的。

## 13-浏览器：一个浏览器是如何工作的？（阶段四）

排版
正常流排版
浏览器排版 - 正常流排版 - 文字排版规范 行模型(行顶，行底，文字区域，基线) 文字在行模型中的排布 - 元素和文字混排，元素即盒模型
绝对定位:脱离正常流，top left 决定位置，不参与排版计算，不影响其它元素
浮动元素: 在正常流中的位置向左或向右移动到边界，并占据一块排版区域

    flex排版：排版方式由外部元素的display控制，display还控制正常流中的inline block等级

正常流文字排版
书写方向 - 主轴/主方向， 垂直的叫交叉轴/交叉方向
