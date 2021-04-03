import 'package:meta/meta.dart';

// 可以加类型注释，也可以不加
int add(int a, int b) {
  return a + b;
}

// 简写， = expr 是 {return expr} 的简写
add2(a, b) => a + b;

// 函数的参数:
//  - 必须参数
//  - 可选参数:
//     - 命名参数  调用时通过paramName: value，定义时通过 {param1, param2}
//     - 位置参数

// 命名参数，可以通过 @required注解 表示必须，需要引用 import 'package:meta/meta.dart'; meta 包，但是只是编辑器提示下，不会报错
// 设置 [a] 和 [b] 标识
fn1({a, b, @required String c}) {
  print('fn1 $a $b $c');
}

// 位置参数
fn2(a, b, [c, d]) {
  print('fn2 $a $b $c $d');
}

// 默认参数，命名参数和位置参数 可以设置默认值
fn3(a, {b = 1}) {
  print('a = $a,  b = $b');
}
fn4([a = 2]){

}

var global = 111;

foo() {}

class A {
  static void bar() {}

  void baz() {}
}

main() {
  fn1(a: 1, b: 2); // fn1 1 2
  fn1(a: 1); // fn1 1 null

  fn2(1, 2, 3); // fn2 1 2 3 null
  fn2(1, 2); // fn2 1 2 null null

  fn3(3, b: 2); // a = 3,  b = 2
  fn3(3); // a = 3,  b = 1

  // 可以用函数做参数
  fn3(3,
      b: fn2); // a = 3,  b = Closure: (dynamic, dynamic, [dynamic, dynamic]) => dynamic from Function 'fn2': static.

  // .. 连级，可以对单个对象进行多个操作

  // 将函数赋值给变量
  var fn4 = (msg) => 'hello ${msg}';
  assert(fn4('world') == 'hello world');

  // 匿名函数
  var list = ['apple', 'orange', 'bananas'];
  list.forEach((element) {
    print('${list.indexOf(element)}: $element');
//    0: apple
//    1: orange
//    2: bananas
  });
  list.forEach((item) => print('${list.indexOf(item)}: $item'));

  // 变量作用域
  print('global is ${global}'); // 可以访问函数外的变量
  var mainV = 'mainV';
  fn5() {
    print(mainV);
  }

  fn5(); // mainV

  // 闭包
  fn6(a) {
    return (b) => a + b;
  }

  var fn6addA = fn6(6);
  print(fn6addA(19)); // 25
  print(fn6addA(10)); // 16

  // 测试函数相等
  var x;
  x = foo;
  assert(x == foo);
  x = A.bar;
  assert(x == A.bar);
  var a1 = A();
  var a2 = A();
  assert(a1 != a2);
  var a3 = a2;
  x = a2.baz;
  assert(a3.baz == x);
  assert(a1.baz != a2.baz); // 不同实例的方法不相同

  // 返回值，函数默认返回值 null
  fn7(){}
  assert(fn7() == null);

  var x1 = X();
  var x2 = X();
  assert(x1.x != x2.x);
}

class X{
  x(){}
}
