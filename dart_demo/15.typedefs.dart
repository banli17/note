/// Typedefs
/// Dart 中函数和字符串、数字一样，都是对象
/// typedef(函数类型，仅限于函数使用) 可以在声明属性或返回值时使用
/// typedef 会保留类型信息，当函数赋值给变量时
///
class NoUseTypedefs {
  Function compare;

  NoUseTypedefs(int f(Object a, Object b)) {
    compare = f;
  }
}

int sort(Object a, Object b) => 0;

void testNoUseTypedefs() {
  NoUseTypedefs n = NoUseTypedefs(sort);
  // 这里虽然知道 compare 是一个函数，但是不确定是什么类型的函数(不直观)
  assert(n.compare is Function);
}

// 显示定义函数类型
typedef Compare = int Function(Object a, Object b);

class UseTypedefs {
  Compare compare;

  UseTypedefs(this.compare);
}

void testUseTypedefs() {
  UseTypedefs u = UseTypedefs(sort);
  assert(u.compare is Function);
  assert(u.compare is Compare);
}

typedef Compare1<T> = int Function(T a, T b);

void testType() {
  assert(sort is Compare1<int>);
}

void main() {
  testNoUseTypedefs();
  testUseTypedefs();
  testType();
}
