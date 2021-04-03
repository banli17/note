// 元数据：用来描述数据的数据
// @deprecated
// @override
import './todo.dart';

class A {
  @deprecated
  show() {}

  @Todo('lili', 'do some thing')
  void doSomeThing() {
    print('do some thing');
  }
}

void main() {
  A a = A();
  a.show();

  a.doSomeThing();
}
