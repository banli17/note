---
title: 正则表达式之理论与实战
sidebar_label: 正则表达式
---

正则表达式是一种匹配字符串的模式。可以通过它来检测一个字符串是否满足这个模式，进而对字符串进行处理。

## 元字符

理解正则表达式要单个字符的理解，比如`/abcd/`要理解成匹配字符的第一个字符是a，后面是b，再后面是c，后面是d。而不要直接理解为匹配`abcd`字符串。

元字符有`( [ { \ ^ $ | ) ? * + .] }`。

### 行首、行尾符

`^`表示行首符，`$`表示行尾符。即`^a$`表示行首字符是 a，行尾字符也是 a。

```
/^a$/.test('a')    // true
/^a$/.test('ali')  // false
```

### 字符组

字符组用来匹配某些字符中的一个。比如`1[abc]`用于匹配开始是字符1，后面字符是 a 或 b 或 c。

`[]`里还可以用`-`表示范围，比如`[a-z]`表示字母 a-z 中的一个。还可以组合使用`[a-z0-9A-Z]`或`[a-z!?]`等。这里的 ? 不再是当做元字符，而是字符本身。

`[^a]`表示非 a 的字符。

```javascript
/a[^a]/.test('a')   // false
/a[^a]/.test('ae')  // true

// [^cat$]  匹配单行cat
// [^$]  匹配空行
// [^]  没意义，任何一行都行

/[\w]/.test('t')  // true，也表示单个元字符，表示[A-Za-z0-9_]
/[\t]/.test('   ')
```

`-`表示字符组元字符，只有在字符组 [] 里才表示元字符。在外面表示普通字符。

### 排除型字符组

`[^...]`表示这个字符组匹配任何未列出的字符。比如`[^1-6]`匹配除了1到6以外的任何字符。在字符组里`^`表示排除。

`q[^u]`表示第一个字符是q，后面字符不是u。

### 用点号匹配任意字符

元字符`.`用来匹配任意字符(除了行结束符\n \r \u2028或\u2029)。比如要搜索 03/19/76、03-19-76 或者 03.19.76，可以使用03[.-/]19[.-/]76，或者是 03.19.76。

字符组`[]`只能匹配其中的一个字符，而.能够匹配任何字符。

```
/./.test('\n')   // false
```

###  单词边界符

`\b`表示单词边界。`\B`表示非单词边界。边界大致是空格、-、结束、开始、$等字符，但是边界又不是字符，它是一个界限。


```javascript
/\bcat\b/.test('hellocat')  // false
/\bcat\b/.test('hello cat')  // true
/\bcat\b/.test('hello我cat') // true
/\b我\b/.test('hello我cat')  // true


// 不是字符，是界限
const a = /\b/g
const str = 'helhlo hi'

const b = str.replace(a, 'x')
console.log(b)  // xhelhlox xhix

// 下面代码会死循环，因为边界不是字符，所以lastIndex不会移动
const a = /\b/g
const str = 'helhlo hi'

while (true) {
    const c = a.test(str)
    console.log(c, a.lastIndex) // true 0
    if(!c) break
}
```

## 多选结构

`|`表示或，用来匹配任意子表达式，比如`Bob|Robert`，注意它匹配的是 Bob 或 Robert，而不是 Bobobert 或 BoRobert。如果要匹配他们，需要写成`Bob(b|R)obert`。`|`通常也确实是和`()`一起使用。

## 量词

- `?`：有或者没有，即 {0, 1}
- `+`：1个或多个，即 {1,}
- `*`：0个或多个，即 {0,}
- `{m, n}`：m个到n个都可以，如果n不确定，可以写成`{m,}`表示大于m个，注意`{,n}`不表示小于n个，而是表示本意。
- `{m}`：m个

## 括号与反向引用

括号的作用有将字符组成一个单元组，用于搭配量词或者多选结构使用。

```javascript
/(abc)?/
/(abc|def)/
```

不过它还有一个重要的用途，就是反向引用，括号会记忆匹配到的文本，可以用 \n 的方式引用这些记忆的文本。

```javascript
/(\d+)(\1)(\2)\3/.test('123123123123')
```

上面的`\1`表示引用第一个括号(也叫子表达式)匹配到的文本，也就是 123。同理 \2、\3 就是第二个、第三个括号里的内容都是 123。

注意括号在字符组 [] 里是括号本身字符，而不是单元组的意思。

## 特殊字符
正则表达式对一些不能打印的特殊字符，提供了表达方法。

\cX 表示Ctrl-[X]，其中的X是A-Z之中任一个英文字母，用来匹配控制字符。
[\b] 匹配退格键(U+0008)，不要与\b混淆。
\n 匹配换行键。
\r 匹配回车键。
\t 匹配制表符 tab（U+0009）。
\v 匹配垂直制表符（U+000B）。
\f 匹配换页符（U+000C）。
\0 匹配null字符（U+0000）。
\xhh 匹配一个以两位十六进制数（\x00-\xFF）表示的字符。
\uhhhh 匹配一个以四位十六进制数（\u0000-\uFFFF）表示的 Unicode 字符。

## 转义

我们知道 . 表示元字符，会匹配任意字符。但是我们要匹配`0.1`怎么写呢？

这时就需要用到`\.`，叫做转义。转义后，元字符就失去了其意义，直接可以将`\.`看做是匹配.字符。

## 匹配不捕获

`()`里的内容默认是捕获的，如果需要不捕获，则使用`(?:)`。

## 例子

```
# 匹配标志符
[a-zA-Z_][a-zA-Z_0-9]{0, 31}

# 引号内的字符串
"[^"]*"

# 美元金额
$[0-9]*(\.[0-9]{2})?

# html tag
<.*?>
```

## 子表达式

子表达式是正则表达式的一部分。比如`H[1-6]`，H 和 [1-6] 都是子表达式。

## 字符

字符的值代表的字符在不同编码中可能不一样。不过现在基本都是采用unicode编码处理数据。

## 总结

![](./imgs/reg1.png)

- 各个egrep程序有差异，支持的元字符以及元字符的意义有差异。
- 括号用于：限制多选结构、分组、捕获文本
- 转义的3种情况
    - `\ + 元字符`：表示匹配元字符所使用的普通字符
    - `\ + 非元字符`：组成有意义的元字符序列，比如`\<`表示单词边界
    - `\ + 任意字符`：默认表示匹配该字符，也就是反斜杠会被忽略

## 总结

**4.字符含义解释**

- () 的作用是提取匹配的字符串，也叫子表达式
- [] 定义匹配的范围，比如[a-zA-Z0-9]
- ^ 和 $ 表示开始和结尾，注意如果^出现在[]中，表示取反
- \d 非负数字，等价于[0-9]
- \s 空白字符
- \w 英文字符或数字，等价于[a-zA-Z0-9_]
- . 除了换行以外的任意字符，等价于[^\n]
- \b 单词边界，不代表任何字符。所以/\w\b\w/不能匹配任何字符。
- \B 非单词边界
- |  选择符，表示或者
- \r  回车符
- \W [^A-Za-z0-9_]

**5.量词有哪些?**

用来表示数量的字符。

- * 表示匹配0次或多次，比如\d*，表示0个或多个数字
- + 表示匹配1次或多次
- ? 表示0次或1次，相当于{0, 1}
- {} 表示匹配的长度，比如\n{3}表示匹配3个数字，\d{1, 3}表匹配1-3个数字，\d{3,}表示匹配3个以上数字

**6.存储**

- RegExp.$1 - RegExp.$9 存放着最近一次匹配9个子表达式结果，如果没有则是空字符串`""`。
- \n   如果n是正整数表示反向引用，比如\1,表示和对应子表达式一样。

```javascript
/(\d)(\d)/.test('15helo')

RegExp.$1  //1
RegExp.$2  //5

//在replace中使用
"2016-03-26".replace(/(\d+)-(\d+)-(\d+)/,"$1年$2月$3日")

var rgx = /\d{4}(\-|\/|.)\d{1,2}\1\d{1,2}"/
```



## 贪婪匹配和非贪婪匹配

默认情况下正则会匹配更多的字符，这叫做贪婪匹配。

```javascript
var a = 'hellox'
var reg = /(l+)/
var c = a.match(reg)
console.log(RegExp.$1)   // ll
```

上面的例子匹配了更多的l:`ll`，而没有只匹配一个l，这就是贪婪匹配。

如果要匹配l，则是非贪婪匹配，需要在`+`这种量词后面加上`?`即可。

```javascript
var a = 'hellox'
var reg = /(l+?)/
var c = a.match(reg)
console.log(RegExp.$1)   // l

// 其它
'abb'.match(/ab*b/) // ["abb"]
'abb'.match(/ab*?b/) // ["ab"]

'abb'.match(/ab?b/) // ["abb"]
'abb'.match(/ab??b/) // ["ab"]
```

**匹配不捕获**

`?:`表示匹配但不捕获。

```javascript
// 例1
var m = 'abc'.match(/(?:.)b(.)/);
m // ["abc", "c"]

// 例2，匹配foo，或foofoo
var a = /(?:foo){1, 2}/
```

**正向预查和反向预查**

- x(?=y)  先行断言，x只有在y前面才匹配，y不会被计入返回结果。
- x(?!y)  先行否定断言，x只有不在y前面才匹配，y不会被计入返回结果。
- x(?<=y) 后行断言
- x(?<!y) 后行否定断言

```javascript

// 先行否定断言
var a = 'hello nihao xhell'
var reg = /\b\w+(?!\b)/g
console.log(a.match(reg))  //[ 'hell', 'niha', 'xhel' ]

// 后行断言
/(?<=\$)\d+/.exec('Benjamin Franklin is on the $100 bill')
// 结果["100", index: 29, input: "Benjamin Franklin is on the $100 bill"]
```





**1. 提取浏览器参数**

```javascript
var str = "name=zhangsan&age=12"
var reg = /([^&=]+)=([^&=]*)/gi; // [^&=]+表示匹配非=&的连续字符串

var paramObj = {}
str.replace(reg, (...args)=> {
	obj[args[1]] = args[2]
})

console.log(paramObj);  // { name: 'zhangsan', age: '12' }
```

**2. 扩展typeof**

```javascript
function getTypeOf(obj){
    return Object.prototype.toString.call(obj)
           .replace(/\[object\s(\w+)\]/,'$1'); //[object Xxx]
}

getDataType(1); //number
getDataType('a'); //string
getDataType(null); //null
getDataType([]); //array

```

**3. 在字符串指定位置插入新字符串**

```javascript
String.prototype.insetAt = function(str,offset){

    offset = offset + 1;
    //使用RegExp()构造函数创建正则表达式
    var regx = new RegExp("(^.{"+offset+"})");

    return this.replace(regx,"$1"+str);
};

"abcd".insetAt('xyz',2); //在c字符后插入xyz
>> "abcxyzd"
```

**4. 将手机号12988886666转化成129****6666**

```javascript
function telFormat(tel){

    tel = String(tel);

    //方式一
    return tel.replace(/(\d{3})(\d{4})(\d{4})/,function (rs,$1,$2,$3){
       return $1+"****"+$3
    });

    //方式二
    return tel.replace(/(\d{3})(\d{4})(\d{4})/,"$1****$3");
}
```

**5. 实现HTML编码，将< / > " & ` 等字符进行转义，避免XSS攻击**

```javascript
function htmlEncode(str) {
    //匹配< / > " & `
    return str.replace(/[<>"&\/`]/g, function(rs) {
        switch (rs) {
            case "<":
                return "&lt";
                break;
            case ">":
                return "&gt";
                break;
            ...
        }
    });
}
```

**6.格式化货币**

```javascript
// 先行断言，转化货币格式
'9999999'.replace(/\B(?=(\d{3})+(?!\d))/g/, ',')
```

这个正则有点复杂，先看下面代码，然后再分析一下：

```javascript
const a = '0123456789'
const reg = /\B/g

const b = a.replace(reg, ',')
console.log(b)  // 0,1,2,3,4,5,6,7,8,9

const reg1 = /\b/g
const c = a.replace(reg1, ',')
console.log(c)  // ,0123456789,

const reg2 = /\B(?=(\d{3})+(?!\d))/g
const d = a.replace(reg2, ',')
console.log(d)  // 0,123,456,789
```

1. \B 表示非单词边界，所以每个数字中间都是一个\B
2. `(?=(\d{3})+(?!\d))` 表示n * 3个数字，这3个数字后面不能是数字。
3. 所以边界后面必须是n倍的3个数字。





## 学习资料

- [JavaScript 中的正则表达式](http://www.cnblogs.com/onepixel/p/5218904.html)
- [精通 JS正则表达式](http://www.cnblogs.com/aaronjs/archive/2012/06/30/2570970.html)
- [JS正则表达式一条龙讲解](https://segmentfault.com/a/1190000008088937)
- [正则表达式零宽断言详解](https://www.cnblogs.com/onepixel/articles/7717789.html)
- [阮一峰 regexp对象](https://wangdoc.com/javascript/stdlib/regexp.html)
- [正则原理]
- [JS正则表达式完整教程（略长）](https://juejin.im/post/5965943ff265da6c30653879)

**工具**

- [Rubular在线正则工具](https://rubular.com/)
- [scriptular在线正则工具](http://scriptular.com/)
- [regexper正则学习工具](https://regexper.com/)

## 简介

### 创建正则表达式

创建正则表达式的方式有2种：

```javascript
// 1. 字面量方式
const reg = /\w+/i

// 2. 构造函数方式
const reg = new RegExp('hello', 'i')
const reg = new RegExp('\\w+', 'i')
```

这两种方式的区别是：

1. 构造函数方式所有元字符都需要双重转义（比如\w要写成\\w）。
2. 字面量方式会在引擎编译代码时创建正则表达式，构造函数方式是在运行时创建，所以前者效率更高。
3. 构造函数方式可以拼接变量

```javascript
// 构造函数方式拼接变量
const a = 'hello'
const reg = new RegExp('x'+ a + 'y')
```

### 标志

正则表达式可以加标志，比如上面例子中的字母`i`，表示忽略大小写。它的标志有3个：

- g: 默认只匹配第一个就结束，加上g会匹配所有的。
- i: 默认是区分大小写的，加上i表示忽略大小写。
- m: 多行匹配。正则匹配时默认是将字符串当作一行来匹配的，只有一个^$；如果加了标志符m，就是以\n换行，每行都有^$。

```javascript
// 不加m，表示将字符串当作一行，所以匹配不到
const reg = /^hello/
const str = 'ahello \n\rhello'

console.log(str.match(reg))  // null

// 加m
const reg = /^hello/m
const str = 'ahello \n\rhello'

console.log(str.match(reg))  // [ 'hello' ]
```

**正则实例的属性**

- `RegExp.prototype.flags`: 获取实例的标志符，比如'm'
- `RegExp.prototype.global`: 是否设置了g
- `RegExp.prototype.ignoreCase`: 是否设置了i
- `RegExp.prototype.multiline`: 是否设置了m
- `RegExp.prototype.lastIndex`: 返回一个整数，表示下一次开始搜索的位置。可读写，只有在连续搜索时有意义。
- `RegExp.protoptye.source`: 返回正则表达式的字符串形式，不包括反斜杠，只读。

```javascript
const r = /abc/igm;

r.lastIndex // 0
r.source // "abc"
```

**正则实例的方法**

- `RegExp.protoptye.test(str)`: 返回布尔值，表示正则是否匹配字符串。

如果有g标志，正则表达式会记住上次`lastIndex`属性，从`lastIndex`开始匹配。如果没有g标志，则每次`lastIndex`都是从0开始匹配。

```javascript
// 有 g 标志
var r = /x/g;
var s = '_x_x';

r.lastIndex // 0
r.test(s) // true

r.lastIndex // 2
r.test(s) // true

r.lastIndex // 4
r.test(s) // false

// 之后lastIndex会重置为0
r.lastIndex // 0
r.test(s) // true

// 没有g标志
const reg = /a/
const str = 'helnaixxa'
console.log(reg.lastIndex)  // 0 
console.log(reg.test(str)) //  true
console.log(reg.lastIndex)  // 0
console.log(reg.test(str)) // true
```

要注意的是，如果有g标志，正则表达式会记住上次`lastIndex`属性，所以不应该更换所要匹配的字符串，否则会出错。

```javascript
const r = /bb/g

console.log(r.test('bb'))  // true
console.log(r.test('bb')) // false ，这里lastIndex不是0了
console.log(r.test('bb'))  // true
```

`lastIndex`属性只对同一个正则表达式有效，所以下面的代码是错误的。

```javascript
var count = 0;
while (/a/g.test('babaa')) count++;
```

上面的代码每次循环都会创建一个新的正则，`lastIndex`每次都是0，所以会导致死循环。

如果正则模式是空字符，则匹配所有字符串。

```javascript
new RegExp('').test('abc')  // true

// 下面写法错误，是当作注释
const r = //
console.log(r.test('hello'))  // r is not defined
```

- `RegExp.prototype.exec()`: 用来返回匹配结果，如果发现匹配就返回一个数组，成员是匹配成功的子字符串，否则返回`null`。

```javascript
var s = '_x_x';
var r1 = /x/;
var r2 = /y/;

r1.exec(s) // ["x"]
r2.exec(s) // null
```

如果正则表达式包含圆括号(即组匹配)，则返回的数组会包含多个成员，第一个是匹配成功的结果，后面成员是圆括号对应的匹配成功的结果。

```javascript
var s = '_x_x';
var r = /_(x)/;

r.exec(s) // ["_x", "x"]
```

exec方法返回的数组还包括两个属性：

- `input`: 原字符串
- `index`: 整个模式匹配成功的开始位置

```javascript
var r = /a(b+)a/;
var arr = r.exec('_abbba_aba_');

arr // ["abbba", "bbb"]

arr.index // 1
arr.input // "_abbba_aba_"
```

`exec()`默认是匹配到第一个结果就返回；如果加上标志g，则可以使用多次`exec`方法，下次搜索的位置从上一次匹配成功结束的位置开始。

```javascript
const reg = /a/g
const str = 'helloanihaoahia'

while (true) {
    let match = reg.exec(str)
    console.log(match, reg.lastIndex)
    if (!match) break
}

// [ 'a', index: 5, input: 'helloanihaoahia' ] 6
// [ 'a', index: 9, input: 'helloanihaoahia' ] 10
// [ 'a', index: 11, input: 'helloanihaoahia' ] 12
// [ 'a', index: 14, input: 'helloanihaoahia' ] 15
// null 0
```

每次调用正则的方法匹配，lastIndex会移动

```javascript
const reg = /ab/g
const str = 'cabxxx_abeee_abcc'
reg.test(str)
reg.exec(str)
console.log(reg.lastIndex) // 9
```

## 字符串的实例方法

- `String.prototype.match()`: 返回一个数组，成员是所有匹配的子字符串；否则返回null。

`match()`和`exec()`方法在没有标志g时返回结果类似；但是当有标志g时，它会返回匹配结果的数组，而且没有`input`，`index`属性。

```javascript
var s = '_x_x_';
var r1 = /x(_)/;
var r2 = /y/;

console.log(s.match(r1)) // [ 'x_', '_', index: 1, input: '_x_x_' ]
console.log(s.match(r2)) // null

var s1 = '_x_x_';
var r3 = /x(_)/g;
var r4 = /y/;

console.log(s.match(r3)) // [ 'x_', 'x_' ]
console.log(s.match(r4)) // null
```

设置正则的`lastIndex`属性，对match方法无效，它总是从第一个字符开始匹配。

```javascript
var r = /a|b/g;
r.lastIndex = 7;
'xaxb'.match(r) // ['a', 'b']
r.lastIndex // 0
```

- `String.prototype.search()`: 返回第一个匹配结果的位置，没有则返回-1。
- `String.prototype.replace()`: 可以替换匹配的值。不会改变原字符串。返回改变后的字符串。

如果不加标志g，则替换第一个匹配的值，否则替换所有的。

```javascript
'aaa'.replace('a', 'b') // "baa"
'aaa'.replace(/a/, 'b') // "baa"
'aaa'.replace(/a/g, 'b') // "bbb"
```

下面用replace去除字符串首尾空格：

```javascript
var str = '  #id div.class  ';
str.replace(/^\s+|\s+$/g, '')
// "#id div.class"
```

`replace`方法第二个参数可以使用$来指代所替换的内容。

- $& 匹配的子字符串
- $` 匹配结果前面的文本
- $' 匹配结果后面的文本
- $n 匹配成功的第n组内容，n从1开始
- $$ 只带美元符号$

```javascript
'hello world'.replace(/(\w+)\s(\w+)/, '$2 $1')
// "world hello"

'abc'.replace('b', '[$`-$&-$\']')
// "a[a-b-c]c"
```

`replace()`方法的第二个参数还可以是一个函数，将每一个匹配内容替换为函数返回值。

```javascript
'3 and 5'.replace(/[0-9]+/g, function (match) {
  return 2 * match;
})
// "6 and 10"

var a = 'The quick brown fox jumped over the lazy dog.';
var pattern = /quick|brown|lazy/ig;

a.replace(pattern, function replacer(match) {
  return match.toUpperCase();
});
// The QUICK BROWN fox jumped over the LAZY dog.
```

作为replace方法第二个参数的替换函数，可以接受多个参数。其中，第一个参数是捕捉到的内容，第二个参数是捕捉到的组匹配（有多少个组匹配，就有多少个对应的参数）。此外，最后还可以添加两个参数，倒数第二个参数是捕捉到的内容在整个字符串中的位置（比如从第五个位置开始），最后一个参数是原字符串。

```javascript
const d = /hello(你)/g
const str = 'hello你我他hello你我'

let e = str.replace(d, function (a, b, c, d) {
    console.log(a, b, c, d)
})

// hello你 你 0 hello你我他hello你我
// hello你 你 8 hello你我他hello你我
```

下面是一个网页模板替换的例子。

```javascript
var prices = {
    'p1': '$1.99',
    'p2': '$9.99',
    'p3': '$5.00'
};

var template = '<span id="p1"></span>'
    + '<span id="p2"></span>'
    + '<span id="p3"></span>';


var t = template.replace(/(<span id="(.+?)">)(<\/span>)/, function (match, $1, $2, $3) {
    return $1 + prices[$2] + $3
})

console.log(t) // <span id="p1">$1.99</span><span id="p2"></span><span id="p3"></span>
```

- `String.prototype.split(separator[, limit])`: 按照正则分割字符串。第一个参数是正则表达式，表示分隔规则，第二个参数是返回数组的最大成员数。

```javascript
// 非正则分隔
'a,  b,c, d'.split(',')
// [ 'a', '  b', 'c', ' d' ]

// 正则分隔，去除多余的空格
'a,  b,c, d'.split(/, */)
// [ 'a', 'b', 'c', 'd' ]

// 指定返回数组的最大成员
'a,  b,c, d'.split(/, */, 2)
// [ 'a', 'b' ]

'aaa*a*'.split(/a*/)
// [ '', '*', '*' ]

'aaa**a*'.split(/a*/)
// ["", "*", "*", "*"]

// 如果有括号，会将括号里的匹配部分也当作数组元素返回
'aaa*a*'.split(/(a*)/)
// [ '', 'aaa', '*', 'a', '*' ]
```

**7.js中使用正则**

js中使用正则，主要是字符串的match()、search()、replace()、split()方法，和正则的test()、exec()方法。

- str.match(reg)
- str.replace([RegExp|String],[String|Function])

如果第二个参数是函数，函数的参数有四个：

1. result: 本次匹配的结果
2. $1,...$9: 正则表达式有多少个子表达式，就会传递几个参数
3. offset: 本次匹配的开始位置
4. source: 接受匹配的原始字符串

```javascript
var str1 = '2018-11-12'
var reg2 = /(\d)(\d)/g
var new_str2 = str1.replace(reg2, (...args)=> {
	console.log(args)
})

// 结果
[ '20', '2', '0', 0, '2018-11-12' ]
[ '18', '1', '8', 2, '2018-11-12' ]
[ '11', '1', '1', 5, '2018-11-12' ]
[ '12', '1', '2', 8, '2018-11-12' ]
```

replace第二个参数还有一些符号有特殊含义，比如: $1 - $99，$& 表示整个匹配字符串，$`是匹配字符串左侧文本，$'是右侧文本。$$是直接量符号。

- reg.test(str)  匹配则返回true，否则返回false
- reg.exec(str)



## 实战

- [正则表达式之简易markdown文件解析器](http://ife.baidu.com/course/detail/id/30)
- [正则表达式之入门](http://ife.baidu.com/course/detail/id/29)




## 学习资料

- [《构造正则表达式引擎》和 《构造可配置词法分析器》](http://www.cppblog.com/vczh/archive/2008/05/22/50763.aspx)