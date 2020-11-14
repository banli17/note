/// 泛型
/// List<E>: <...> 标记将 List 标记为 通用类型，具有正式类型参数的类型
/// 大多数类型变量都具有单字母名称：如 E T S K V
/// 作用： 实现类型安全限定，指定参数类型
/// 优点：可以生成更好的代码，减少代码重复
///

// 类型检查
void testListString() {
  var names = List<String>();
  names.addAll(['Lily', 'Lucy', 'Tom']);
  // names.add(3); // 报错
}

// 减少代码重复
abstract class ObjectCache {
  Object getByKey(String key);

  void setByKey(String key, Object value);
}

abstract class StringCache {
  String getByKey(String key);

  void setByKey(String key, Object value);
}

// 后面还可能用于存储数字，所以定义一个带有参数类型的接口，T 是替代类型，相当于占位符
abstract class Cache<T> {
  T getByKey(String key);

  void setByKey(String key, Object value);
}

class A implements Cache {
  Map _cache = {};

  // 这里的返回值 String 是对应的的 T
  @override
  String getByKey(String key) {
    print('getByKey ${key} ${_cache[key]}');
    return _cache[key];
  }

  @override
  void setByKey(String key, Object value) {
    _cache[key] = value;
  }
}

void testCache() {
  A a = A();
  a.setByKey('ui', 'hello');
  a.getByKey('ui'); // getByKey ui hello
}

// List、Set、Map 可以被参数化 <type><keyType, valueType>
void testMap() {
  var names = <String>['kate', 'lili', 'tom'];
  var uniqueNames = <String>{'bob', 'jim'};
  var pages = <String, String>{
    'index.html': 'homepage',
    'list.html': 'listpage'
  };
}

// 要在构造函数时指定一种或多种类型，请将类型放在 <...> 类名之后的尖括号中
class ParamConstructor {
  Set nameSet; // 声明实例属性

  ParamConstructor(List names) {
    // 初始化实例属性
    this.nameSet = Set<String>.from(names);
  }
}

void testParamConstructor() {
  List names = ['bob'];
  ParamConstructor p = ParamConstructor(names);
  print(p.nameSet); // {bob}

//  var views = Map<int, View>();
  // 测试集合类型，Dart 泛型是完整的， runtime 时会携带类型信息，所以可以用 is 检查泛型
  // java 泛型不完整，它会在 runtime 时将类型移除，所以只能检查对象是 List，而不能检查是 List<String>
  var names2 = List<String>();
  names.addAll(['kathy', 'lars']);
  print(names is List<String>); // true
}

// 限制参数化类型
// 1. 在实现泛型类型时，您可能希望限制其参数的类型。您可以使用进行此操作extends。
// 2. 可以直接 SomeBaseClass 或其子类 作为通用参数
class SomeBaseClass {}

class SubSomeBaseClass extends SomeBaseClass {}

// 指定 T 为继承自 SomeBaseClass 类或其子类
class Foo<T extends SomeBaseClass> {
  String toString() => "Instance of 'Foo<$T>'";
}

void testFoo() {
  var foo2 = Foo<SomeBaseClass>();

  var foo3 = Foo(); // Instance of Foo<SomeBaseClass>，默认是 SomeBaseClass

  print(foo2);
  print(foo3);

  var foo4 = Foo<SubSomeBaseClass>();
  print(foo4); // Instance of 'Foo<SubSomeBaseClass>'

  //  var foo5 = Foo<Object>();  报错，指定任何非 SomeBaseClass 类型都会报错

  // 泛型方法，first 的泛型参数`first <T>` 可以用于 返回值、参数、局部变量。
  T first<T>(List<T> ts) {
    T tmp = ts[0];
    return tmp;
  }
}

void main() {
  testListString();
  testCache();

  testMap();

  testParamConstructor();

  testFoo();
}
