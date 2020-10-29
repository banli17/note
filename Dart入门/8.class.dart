// dart 是具有类 和 基于 Mixin 继承
// 所有类都来自 Object
// 每个类都只有一个父类

import 'dart:math';

class Point {
  double x; // 实例变量，未初始化的变量值为 null
  double y;
  double z = 0; // 声明并初始化

  // 构造函数，和类同名
  // 只有在存在命名冲突时才使用 this，否则可省略
//  Point(double x, double y) {
//    this.x = x;
//    this.y = y;
//  }
  // 将构造函数参数分配给实例变量，可以用下面的语法糖
  Point(this.x, this.y);

  // 默认构造函数：如果你不写，dart 会生成一个默认无参数、无名的构造函数，默认构造函数是无参数的，它会调用父类的无参构造函数。
  // 构造函数是不继承的
  // 命名的构造函数: 添加多个构造函数时会很清晰
  static Point fromJson({x, y}) {
    return Point(x, y);
  }

  Point.origin() {
    x = 0;
    y = 0;
  }

  distanceTo(Point p) {
    double _x = p.x - x;
    double _y = p.y - y;
    return sqrt(_x * _x + _y * _y);
  }
}

// 使用构造函数， 构造函数的名字可以是 ClassName 或 ClassName.identifier
// new 是可选的，从 dart2开始
testUseConstructor() {
  var p1 = Point(2, 2);

  // 常量构造函数

  // 获取对象的类型
  print('the type of p1 is ${p1.runtimeType}'); // Point
}

class Person {
  String firstName;

  Person() {}

  Person.fromJson(Map data) {
    print('in Perosn');
  }

  // 重定向构造函数
  Person.rename(Map data) : this.fromJson({});
}

// 父类不写构造函数,会自动生成默认无参构造函数
// 父类写了构造函数，没有写无参的构造函数，不会自动生成默认构造函数，需要手动调用
// 构造函数也是个静态方法，不能调用 this
// 重定向构造函数，需要使用 this 关键字
// 如果这个类产生了永不改变的对象，则可以使对象具有编译时常量，构造函数使用 const ，并且所有实例变量都用 final
// 工厂构造器
class Employee extends Person {
  // : 后面可以调用父类构造方法
  // 还可以初始化实例变量，用逗号分开 : x = json['x']
//  Employee.fromJson(Map data) : super.fromJson(data) {
//    print(this);
//    print('in Employee');
//  }
  var x;

  Employee.fromJson(Map data)
      : x = data['x'],
        super.fromJson(data) {
    print(this);
    print('in Employee');
    print('x is $x'); // x is 2
  }
}

testEmployee() {
  var emp = Employee.fromJson({'x': 2});
  if (emp is Person) {
    emp.firstName = 'bob';
  }
  (emp as Person).firstName = 'bob';
  print(emp.firstName); // 'bob'
}

// 工厂构造器
class Logger {
  final String name;
  bool mute = false;

  static final Map<String, Logger> _cache = <String, Logger>{};

  // 生成对象时，会执行它
  factory Logger(String name) {
    // put 已经存在，则覆盖旧值
    // putIfAbsent，map中没有该 key对应的值，直接添加，并返回 null；已经存在，则依旧返回是原来的值
    // absent 不在
    return _cache.putIfAbsent(name, () => Logger._internal(name)); // 调用命名构造函数
  }

  Logger._internal(this.name);

  void log(String msg) {
    if (!mute) print(msg);
  }
}

void testLogger() {
  Logger logger = Logger('UI');
  logger.log('button click');
  Logger logger2 = Logger('UI');

  assert(logger == logger2);
}

class Rectangle {
  double left, top, width, height;

  Rectangle(this.left, this.top, this.width, this.height);

  double get right => left + width;

  set right(double value) => left = width - value;

  double get bottom => top + height;

  set bottom(double value) => top = value - height;
}

testFunction() {
  // 方法
  // 1. 实例方法，可以访问实例变量和 this，如上面的 distanceTo
  // 2. Getters 和 setters: 每个实例变量都有一个隐式的 getter，可能还有个 setter
  var rect = Rectangle(3, 4, 20, 15);
  assert(rect.left == 3);
  rect.right = 10;
  print(rect.left);
  assert(rect.left == 10);
}

// 抽象类：一个无法实例化的类，通常用于某些实现中，用于定义接口
abstract class Doar {
  void doSomething(); // 抽象方法，抽象方法只能存在于抽象类中
}

class EffectiveDoar extends Doar {
  void doSomething() {
    // 提供实现，所以这个方法不是抽象的
  }
}

testAbstract() {}

// 隐式接口
// 每个类都有一个隐式接口，该接口包含所有实现类成员的所有接口，没有 interface ，直接用 class
// 要实现接口，使用 implements，多个使用逗号,分开
class A {
  final _name;

  A(this._name);

  String greet() => "hello $_name";
}

class B implements A {
  get _name => '';

  @override
  String greet() {
    return "hi $_name";
  }
}

testImplement() {
  String greetBob(A a) => a.greet();
  print(greetBob(A('张三')));
  print(greetBob(B()));
}

// 继承，使用 extends 关键字
class Television {
  void turnOn() {
    print('Television turnOn');
  }
}

class SmartTelevision extends Television {
  // 重写父类方法，可以使用注解 @override
  @override
  void turnOn() {
    super.turnOn();
    print('SmartTelevision turnOn');
  }
}

void testExtends() {
  SmartTelevision s = SmartTelevision();
  s.turnOn();
}

// 重写运算符
class Vector {
  final int x, y;

  Vector(this.x, this.y);

  Vector operator +(Vector v) => Vector(x + v.x, y + v.y);

  Vector operator -(Vector v) => Vector(x - v.x, y - v.y);

  // 重写 ==，还需要重写 hashCode
  @override
  bool operator ==(other) {
    if (other is! Vector) return false;
    Vector v = other;
    return v.x == x && v.y == y;
  }

  @override
  int get hashCode {
    return x + y;
  }
}

void testVector() {
  final v = Vector(2, 3);
  final w = Vector(2, 2);
  assert(v + w == Vector(4, 5));
  assert(v - w == Vector(0, 1));
}

abstract class NoSuchMethodParent {
  void say() {}
}

// noSuchMethod  调用不存在的方法或实例变量时执行检测
class NoSuchMethod implements NoSuchMethodParent {
  @override
  noSuchMethod(Invocation invocation) {
    print('sorry, no such method ${invocation.memberName}');
  }
}

void testNoSuchMethod() {
  // 前提: 1. 使用 dynamic 接收
  // 2. 接收器具有定义未实现的静态方法(或抽象方法)，且 noSuchMethod 和 Object 的不同。 (不懂）
  // 否则静态编译时期就会报错。
  dynamic n = NoSuchMethod();
//  print(n.a);
//  NoSuchMethod.say();
}

// 给 String 扩展方法： 向现有库添加方法
extension NumberParsing on String {
  int parseInt() {
    return int.parse(this);
  }

  double parseDouble() {
    return double.parse(this);
  }
}

void extensionMethod() {
  print('42'.padLeft(5, '0'));
  print('42'.parseInt()); // 42
}

enum Color { red, blue, green }

// 1. 不能继承、混入和实现枚举
// 2. 不能显示的实例化枚举
void testEnum() {
  assert(Color.red.index == 0); // 序号
  print(Color.values); // [Color.red, Color.blue, Color.green]

  Color color = Color.red;
  // 在 switch 语句中使用
  switch (color) {
    case Color.red:
      print('color is red');
      break;
    default:
      print('color is not red');
      break;
  }
}

// mixins: 向类添加功能，混入多个类，用逗号分开
// 创建 mixin: 扩展Object且不声明构造函数，使用 mixin 关键字。如果要将 mixin 用作常规类，则用 class 代替 mixin关键字
// 如果要限定只有某些类能使用 mixin，则使用关键字 on 限定(超类)。mixin A on B, C
mixin Musical on MusicianSuper {
  bool canPlayPiano = true;

  void sing() {
    print('musical is singing');
  }
}

class MusicianSuper {}

class Musical2 {
  void sing2() {
    print('musical is singing2');
  }
}

class Musician extends MusicianSuper with Musical, Musical2 {}

void testMixin() {
  Musician m = Musician();
  print('m canPlayPiano ${m.canPlayPiano}');
  m.sing(); // musical is singing
  m.sing2(); // musical is singing2
}

// 静态属性和方法， 无法访问 this，直接通过类名来访问
class StaticClass {
  static final int a = 10;

  static void show() {
    print('this is a static method');
  }
}

testStaticClass() {
  StaticClass s = StaticClass();
  print(StaticClass.a);
  StaticClass.show();
}

main() {
  // 所有的实例变量都有隐式的 getter setter 方法
  var p = Point(2, 2);
  p.y = 3; // 使用 setter 方法设置
  assert(p.y == 3); // 使用 getter 方法获取
  print(p);

  double distance = p.distanceTo(Point(4, 4)); //2.23606797749979
  print(distance);

  testUseConstructor();

  testEmployee();

  testLogger();

  testFunction();

  testImplement();

  testExtends();

  testVector();

  testNoSuchMethod();

  extensionMethod();

  testEnum();

  testMixin();

  testStaticClass();
}
