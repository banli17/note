// 可调用类

// 要让对象像函数一样能够调用，需要实现其类的 call() 方法
class Person {
  call() {
    print('this is a person');
  }
}

void main() {
  Person p = Person();
  p();
}
