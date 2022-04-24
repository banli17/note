# 编译原理

## 词法解析

词法解析是将代码字符串解析成 token 的过程。

例如对下面代码进行词法解析: 

```
let x = y + 5;
let z = 2;
```

1. 一个个读入字符，并对串进行分类，加编号。

```
let     LET = 0
x, y, z    IDENTIFIER = 1
=       EQUAL_SIGN = 2
+       PLUS_SIGN = 3
5       NUMBER = 4
;       SEMICOLON = 5
```

上面的类名(如 LET)主要是方便人来阅读的，实际只需要编号即可。

2. 为了使用方便，每个元素还需要加上当前元素和行号，于是解析成了`类别(类别编号, 字符串元素, 行号)`形式，具体如下：

```
LET(0, "let", 0) IDENTIFIER(1, "x", 0) EQUAL_SIGN(2, "=", 0) IDENTIFIER(1, "y", 0)
NUMBER(1, "5", 0) SEMICOLON(5, ";", 0)

LET(0, "let", 1) IDENTIFIER(1, "z", 1) EQUAL_SIGN(2, "=", 1) SEMICOLON(5, ";", 0)
```

3. 我们 TOKEN 来表示上面每个元素解析后的形式，数据结构如下。

```js
class TOKEN {
  constructor(type, literal, lineNumber){
    this.type = type
    this.literal = literal
    this.lineNumber = lineNumber
  }
}
```
