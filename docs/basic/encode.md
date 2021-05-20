# 计算机编码知识

看了一些字符编码的文章，东西太多，但是只需要知道几个重点就可以了。

- 字符编码的发展历史
- unicode 编码：utf16 和 utf8
- url 编码
- base64 编码原理

## 字符编码历史

最早外国人发明电脑的时候为了处理字符，普遍是用 8 位来存储的，因为他们只有[0-9a-zA-Z]和其它标点符号、指令等，所以 7 位就完全够了，留一位用做通讯系统的奇偶验证。这叫做 ASCII 编码，有 127 个字符。

后来一些国家想在剩余的 1 位里加一些其它的字符，如重音、下划线等，这叫 OEM 字符集。但每个国家都不一样，所以 128-256 这段字符在每个机器可能都不一样。

另外一些亚洲国家也要用电脑，如中国，光汉字就可能上万个。8 位不够存，于是有些人就用 2 个字节来存储，这叫做 MBCS(多字节字符集)或中文字符集，有 GBK、GB2312 之类。

这么多不同的字符集让文档交流很困难，所以各种组织开始指定规范，有 ANSI 标准(美国)、国家标准、ISO 标准(如中国 GBK 等)等。

虽然可以在一台机器上查不同语言的文档，但是无法在文档中显示所有字符。所以最后出现了 Unicode 字符串，涵盖人类所有的字符。它按使用频繁度分成 17 个层面，每个层有 2^16 = 65536 个字符码空间。其中第 0 个层面 BMP，基本涵盖了当今世界用到的所有字符。

之前的编码都是字符集和字符编码在一起，查表就行了。unicode 将它们分开以利于扩展，即根据字符集找到的字符编码决定字符。

ucs-2:只考虑了 BMP 字符，使用固定 2 个字节长度。
utf16:最少 2 个字节，BMP 之外的字符用 4 个字节。对于单字节字符处理性能低些。因为单字节前面都是 0x00，浪费了。
utf8: 应用最广，多字节的解析是根据首字节的前置，如果是 1110yyy，表示字符解析成 3 个字节，剩余每个字节都是 10 开头。

## URI 编解码

一个 URI 可能包含下面五种字符：

1. 保留字符：`; / ? : @ & = + $`
2. 非转义字符：`[a-zA-Z0-9]`和 uri 标记符 `- _ . ! ~ * ' ( )`
3. `#`
4. 其它字符，即非上面的字符。
5. 被转义字符`%xx`，是十六进制

### encodeURI 和 encodeURIComponent

encodeURI 遇到上面的`4.其它字符`时会转义。encodeURIComponent 遇到`1、3、4`时会转义，通常用来做 url 参数 k=v 的编解码。

```js
encodeURI("%"); // '%25'
encodeURIComponent("%"); // '%25'

encodeURI("?"); // '?'
encodeURIComponent("?"); // "%3F"

encodeURI("https://banli17.com/blog/?a=1#h=2");
// "https://banli17.com/blog/?a=1#h=2"
encodeURIComponent("https://banli17.com/blog/?a=1#h=2");
// "https%3A%2F%2Fbanli17.com%2Fblog%2F%3Fa%3D1%23h%3D2"
```

## base64 编解码

Base64 编码要求把 3 个 8 位字节（3*8=24）转化为 4 个 6 位的字节（4*6=24），之后在 6 位的前面补两个 0，形成 8 位一个字节的形式。 如果剩下的字符不足 3 个字节，则用 0 填充，输出字符使用‘=’，因此编码后输出的文本末尾可能会出现 1 或 2 个‘=’。

关于这个编码的规则：

1. 把 3 个字符变成 4 个字符。
2. 每 76 个字符加一个换行符。
3. 最后的结束符也要处理。

```js
const buf1 = Buffer.from("我");
console.log(buf1); // <Buffer e6 88 91>

// 1) 将 3*8 拆成 4*6
console.log((0xe6).toString(2)); // 11100110
console.log((0x88).toString(2)); // 10001000
console.log((0x91).toString(2)); // 10010001

// 11100110 - 10001000 - 10010001 - >
// 111001 - 101000 - 100010 - 010001 - >
// 00111001 - 00101000 - 00100010 - 00010001

// 2) 转为10进制
console.log(parseInt("00111001", 2)); // 57
console.log(parseInt("00101000", 2)); // 40
console.log(parseInt("00100010", 2)); // 34
console.log(parseInt("00010001", 2)); // 17

// 3) 对应到数组
const base64 =
  "abcdefghijklmnopqrstuvwxyz".toUpperCase() +
  "abcdefghijklmnopqrstuvwxyz" +
  "0123456789+/";

const str = base64[57] + base64[40] + base64[34] + base64[17];
console.log(str); // 5oiR
console.log(buf1.toString("base64")); //5oi
```

可以看到转 base64 后，3 个字节变成了 4 个(即每 3 个字节增加 1 个字节)，所以大小会增大 1/3 左右。

图片的 base64 编码。

## 学习资料

- [字符编码笔记：ASCII，Unicode 和 UTF-8](http://www.ruanyifeng.com/blog/2007/10/ascii_unicode_and_utf-8.html)
- [Unicode 与 JavaScript 详解](http://www.ruanyifeng.com/blog/2014/12/unicode.html)
- [Base64 笔记 ](http://www.ruanyifeng.com/blog/2008/06/base64.html)
- [Unicode 和 UTF-8 有何区别？](https://www.zhihu.com/question/23374078)
- [哪些字符需要在 HTML 中转义？](https://stackoverflow.com/questions/7381974/which-characters-need-to-be-escaped-on-html)
- [为什么要使用 base64 编码，有哪些情景需求？](https://www.zhihu.com/question/36306744)
- [UTF-8 与其他编码比较，它劣势在哪？](https://www.zhihu.com/question/30987792)
- [关于 URL 编码](http://www.ruanyifeng.com/blog/2010/02/url_encoding.html)
  https://www.cnblogs.com/luguo3000/p/3627027.html
- [从零开始学 web 安全（3）](http://imweb.io/topic/57024e4606f2400432c1396d)
- https://blog.csdn.net/mr_pang/article/details/47060087
- [为什么要进行 URL 编码](https://www.cnblogs.com/jerrysion/p/5522673.html)
- [关于字符编码，你所需要知道的](http://www.imkevinyang.com/2010/06/%E5%85%B3%E4%BA%8E%E5%AD%97%E7%AC%A6%E7%BC%96%E7%A0%81%EF%BC%8C%E4%BD%A0%E6%89%80%E9%9C%80%E8%A6%81%E7%9F%A5%E9%81%93%E7%9A%84.html)
- [wiki character encoding](https://en.wikipedia.org/wiki/Character_encoding)
- https://github.com/jagracey/Awesome-Unicode
- https://github.com/Codepoints/awesome-codepoints
- [escape,encodeURI,encodeURIComponent 有什么区别?](https://www.zhihu.com/question/21861899)
