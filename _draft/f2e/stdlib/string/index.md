---
title: String
date: 2019-03-28 22:10:01
tags:
toc: true
---

## 实例方法

名称|描述|改变原数组
--|--|--|
`String.prototype.charAt(index)`|返回当前位置的字符，index从 0 开始，如果为负数，或大于等于字符串长度，返回空字符串|
`String.prototype.substr(start, length)`|从原字符串取出指定长度的子串并返回,如果第一个参数为负数，表示倒数计算的字符位置；如果第二个参数为负数，会自动转为 0，因此返回空字符串|✔️
`String.prototype.indexOf(str, start)`|返回一个字符串在原字符串中第一次出现的位置，如果不存在，返回-1。第二个参数表示从该位置向后匹配。|
`String.prototype.lastIndexOf(str, start)`| 和 indexOf 一样，区别是从末尾开始匹配。start表示从该位置起向前匹配。|
`String.prototype.trim()`| 去除两端的空格（还包括\t，\v，\n，\r），返回一个新字符串|
`String.prototype.toLowerCase()`| 将字符串转换为小写，返回一个新字符串|
`String.prototype.toUpperCase()`| 将字符串转换为大写，返回一个新字符串|
`String.prototype.match()`| 用于确定原字符串是否匹配某个子字符串，返回一个数组，成员为匹配的第一个字符串，如果没有找到，则返回 null，返回的数组还有index 属性和input 属性，分别表示匹配字符串开始的位置和原始字符串|

### String.prototype.match()

match 方法用于查找指定的子串，或查找匹配正则的子串。返回一个匹配结果的数组，该数组的内容依赖于 regexp 是否有全局标志 g。

```
stringObj.match(searchValue)
stringObj.match(regexp)
```

如果 regexp 没有标识 g，则只查找一次。如果没有匹配，返回 null；如果匹配到，则返回一个数组，格式为：

```js
[
    0: 第一个匹配的子串,
    1 - n: 与正则匹配的子表达式文本,
    index: 子串在原字符串中的位置,
    input: 原字符串的引用
]
```

```js
'hello world'.match(/o(\w)/)
// ["or", "r", index: 7, input: "hello world", groups: undefined]
```

如果 regexp 有标识 g，会返回所有匹配的子串组成的数组，如果没有匹配到，则返回 null。

```js
'hello world'.match(/l/g)
// ["l", "l"]

'hello world'.match(/o(\w)/g)
// ["or"]
```

注意：带 g 时，match() 方法不会返回正则子表达式的信息。

### String.prototype.search()

search 方法和 indexOf() 类似。返回匹配的第一个位置，如果没有匹配到，则返回 -1。

```js
'cat, bat, sat, fat'.search('at') // 1
```


### String.prototype.replace()

replace 方法用于替换匹配的子字符串，一般情况下只替换第一个匹配，除非使用带标识 g 的正则表达式。

```js
'hello'.replace('l', 'x')  // "hexlo"
```

### String.prototype.split()

split 方法用来分割字符串，返回一个分割字符串组成的数组。如果不传参数，数组只有一项，就是原字符串。

```js
'a,b,c'.split()  // ["a,b,c"]
'a,b,c'.split(',')  // ["a", "b", "c"]
'a,b,c'.split('')  // ["a", ",", "b", ",", "c"]
```

如果有连续两个分割符，或分隔符位于字符串的开头或结尾，数组中会返回一个空字符串。

```js
'a||c'.split('|') // ['a', '', 'c']
'|a|c'.split('|') // ['', 'a', 'c']
'a|c|'.split('|') // ['a', 'c', '']
```

split 的第二个参数是返回数组的长度。

```js
'a|b|c'.split('|', 0) // []
'a|b|c'.split('|', 1) // ["a"]
'a|b|c'.split('|', 2) // ["a", "b"]
```

### String.prototype.localeCompare()

localCompare 方法用于比较两个字符串，返回一个整数。如果小于 0，表示第一个字符串小于第二个字符串；如果等于 0，表示两个字符串相等；如果大于 0，表示第一个字符串大于第二个字符串。这个方法会考虑自然语言的顺序，比如正常情况下，B(66) < a(97)。但是这个方法会将 B 排在 a 的前面。

```js
'B'.localeCompare('a') // 1
```

localCompare 的第二个参数是指定语言，默认是英语，按指定语言进行比较。

```
'ä'.localeCompare('z', 'de') // -1  德语
'ä'.localeCompare('z', 'sv') // 1   瑞典语
```


