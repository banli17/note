# 语法

## block

块语句`{}`用来组织多条语句。在块语句里，使用`var`声明的变量也是全局的，`let`和`const` 定义的变量是有块级作用域的。

```
{
    statement_1;
    statement_2;
    ...
    statement_n;
}
```


## 错误处理机制

### Error对象

`Error`对象有三个属性：

- message: 错误提示信息
- name: 错误名称(非标准)
- stack: 错误的堆栈(非标准)

继承自`Error`的函数有：

- SyntaxError: 解析代码时语法错误
- ReferenceError: 引用不存在变量时，或给不能复制的对象(this)或函数运行结果赋值
- RangeError: 值超出有效范围，如数组长度是负数，数值超出范围，以及函数堆栈超过最大值
- TypeError: 变量或参数不是预期类型，或调用对象不存在方法
- URIError: 与url相关函数的参数不正确时抛出
- EvalError: eval()没有被正确执行时抛出，es5后不会出现

### 自定义错误

```
function UserError(message) {
   this.message = message || "默认信息";
   this.name = "UserError";
}

UserError.prototype = new Error();
UserError.prototype.constructor = UserError;
```

### try...catch...finally

主要说明语句的执行顺序。

```
function f() {
  try {
    console.log(0);
    throw 'bug';
  } catch(e) {
    console.log(1);
    return true; // 这句原本会延迟到finally代码块结束再执行
    console.log(2); // 不会运行
  } finally {
    console.log(3);
    return false; // 这句会覆盖掉前面那句return
    console.log(4); // 不会运行
  }

  console.log(5); // 不会运行
}

var result = f();
// 0
// 1
// 3

result
// false
```
上面代码中，catch代码块结束执行之前，会先执行finally代码块。从catch转入finally的标志，不仅有return语句，还有throw语句。

```
function f() {
  try {
    throw '出错了！';
  } catch(e) {
    console.log('捕捉到内部错误');
    throw e; // 这句原本会等到finally结束再执行
  } finally {
    return false; // 直接返回
  }
}

try {
  f();
} catch(e) {
  // 此处不会执行
  console.log('caught outer "bogus"');
}

//  捕捉到内部错误
```
上面代码中，进入catch代码块之后，一遇到throw语句，就会去执行finally代码块，其中有return false语句，因此就直接返回了，不再会回去执行catch代码块剩下的部分了。



