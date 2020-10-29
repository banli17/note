# dart 笔记

## 重要概念

- 一切都是对象，包括 num/functions/null。都是继承自 Object。
- 尽管是强类型，但是类型注释是可选的。
- 支持泛型，如 `List<int>`。
- 支持顶级函数，如 main，类、对象、嵌套函数。
- 支持顶级变量，类、实例变量。
- 没有 public、protected、private。通过 _ 表示私有。


## 变量

var Object dynamic 区别？

dynamic 一般不直接使用。

var 是关键字，表示不关心类型，dart 会讲 var 根据初始值设置为对应类型，如果没有初始值，则会设置为 dynamic。

```
var a = 1;
a = 'hello'; // 报错，因为 是 int a = 1;

var a;
a = 1;
a = 'hello';  // 不报错，因为是 dynamic a;
```

如果希望变量生命周期内变化就用var ，希望保持不变就用 final。final 表示变量不可变。

```
final c = 'hi';
c = 'hello';  // 报错
```

final 不能让对象不可变，而 const 可以。

```
final c = [];
c.add('hi');  // [hi]

const c = [];
c.add('hi');  // 报错
```

未初始化变量的默认值是 null。

**assert**

不能包裹，比如放在 print() 里会报错。如果表达式正确则执行，不正确会报错。

```
if(assert(a == 1))   // 报错

// 使用
assert(a == null)
```

**const**

```dart
const a = [];      // 这里相当于是固定值和 a，完全不能修改 a
final a = const []; 
var a = const [];  // 这里的  const 是将值固定，但是可以给 a 重新赋值
```


可以固定变量值。

```
const Object i = 3;
const list = [i as int];
print(list);

const map = {if (i is int) i: 'int'}; // 动态增加 key:value
print(map); // {3: int}

const set = {if (list is! List<int>) ...list};
print(set); // {}
```

## 内置类型

- numbers
- strings
- booleans
- lists: 数组
- sets
- maps
- runes: 用于在字符串中表示 Unicode 字符
- symbols

### Numbers

- int: < 64bit，dart 虚拟机上  -2^63 到 2^63 - 1，编译成 js，会用 js number，-2^53 到 2^53-1
- double: 64 位浮点数

这两个类型都是 num 的子类型。

```
double z = 1;
print(z);  // 1.0 整数会自动转成 double
```

```
// 字符串转整型
var one = int.parse('1');
assert(one == 1);
```

## 类型定义



## 元数据 Metadata

就是 java 中的注解。所有的 Dart 代码都可以使用 `@deprecated` 和 `@override`。

自定义注解。

```
// 定义
library todo;
class Todo{
    final String who;
    final String what;
    const Todo(this.who, this.what);
}

// 使用
import 'todo.dart'
@Todo('seth', 'make this do something')
void dosomething{
    print('do something');
}
```

元数据可以出现在库、类、typedef、类型参数、构造函数、工厂、函数、字段、参数或变量声明之前，也可以出现在导入或导出指令之前，可以在运行时使用反射来获取。

## 注释

Dart 支持单行注释，多行注释，和文档注释。

- 单行注释: `//`
- 多行注释: `/* */`
- 文档注释：`///` 或者 `/**  */`

```dart
// 单行注释

/*
  多行注释
*/

/// 文档注释，可以用来生成 文档，下面的 [Food] 可以生成链接
/// 
class A {
  void feed(Food food){
    // TODO: 单行注释
  }
}
```

- 文档生成工具 [dartdoc](https://github.com/dart-lang/dartdoc#dartdoc)
- 文档注释的建议：[https://dart.dev/guides/language/effective-dart/documentation](https://dart.dev/guides/language/effective-dart/documentation)