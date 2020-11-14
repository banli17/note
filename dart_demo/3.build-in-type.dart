import 'dart:mirrors';
import 'package:characters/characters.dart';

main() {
  typeParse();
  testString();
  testBoolean();
  testList();
  testSets();
  testMaps();
  testRunes();
  testSymbols();
}

typeParse() {
  var one = int.parse('1');
  assert(one == 1);

  var opo = double.parse('1.1');
  assert(opo == 1.1);

  String os = 1.toString();
  assert(os == '1');

  String p = 3.1415.toStringAsFixed(2);
  assert(p == '3.14');

  // int 类型可以位运算
  assert(3 << 1 == 6); // 0011 << 1 == 0110
  assert(3 >> 1 == 1); // 0011 >> 1  == 001
  assert((3 | 4) == 7); // 0011 | 0100 == 0111
}

testString() {
  var s1 = 'hello';

  // 字符串表达式 ${expression}
  // 如果 expression 是标识符，可以省略 {}
  var s2 = '$s1 world!';
  print(s2); // hello world!

  var s3 = '${s1.toUpperCase()} world!';
  print(s3); // HELLO world!

  // 拼接字符串 +
  var s4 = 'hello' + 'world';
  assert(s4 == 'helloworld');

  // 多行字符串
  var s5 = '''
    You can create
    multi line strings like this one
    ''';
  print(s5);
  var s6 = '''You can create
    multi line strings like this one''';
  print(s6);

  // 原始字符串， \n 不转译
  var s7 = r'In a raw string, not even \n gets special treatment.';
  print(s7); // In a raw string, not even \n gets special treatment.
}

testBoolean() {
  print('--------------- test Boolean --------------');
  var fullName = '';
  assert(fullName.isEmpty); // 验证空字符串

  // 检查 0
  var hitPoints = 0;
  assert(hitPoints <= 0);

  // 检查 null
  var unicorn;
  assert(unicorn == null);

  var nan = 0 / 0;
  assert(nan.isNaN);
}

testList() {
  print('--------------- test List    --------------');
  var list = [1, 2, 3]; // 这里 dart 会推断 list 是 int 类型 List<int>
  // list.add('hi');  // 会报错

  print('list length is ${list.length}');
  print('list[0] is ${list[0]}');

  var constList = const [1, 2, 3];
  //  constList[1] = 3; // Cannot modify an unmodifiable list

  // 展开运算符  ... 和 ...?
  //const list2 = [0,...list]; // Error: Not a constant expression.
  var list2 = [0, ...list];
  print(list2); // [0, 1, 2, 3]

  var n = null;
//  var list3 = [0, ...n];  // The getter 'iterator' was called on null.
  var list3 = [0, ...?n]; // 使用...? 防止 n 是 null 导致报错

  // collection if
  var promoActive = true;
  var nav = ['home', 'furniture', 'plant', if (promoActive) 'outlet'];
  print(nav); // [home, furniture, plant, outlet]

  // collection for
  var listOfInts = [1, 2, 3];
  var listOfStrings = ['#0', for (var i in listOfInts) '#$i'];
  assert(listOfStrings[1] == '#1');
  print(listOfStrings); // [#0, #1, #2, #3]
}

testSets() {
  print('--------------- test Sets   --------------');
  // 无序集合，没有重复
  var halogens = {'h', 'e', 'll', 'o'};
  halogens.add('h');
  print(halogens); // {h, e, ll, o}

  // dart 会推断类型为 Set<String> ，所以下面报错
  // halogens.add(1);  Error: The argument type 'int' can't be assigned to the parameter type 'String'.
  print(halogens);

  var names = <String>{};
  // Set<String> names = {}; 可以
  var names1 = {}; // 这是一个 Map
  print(names1 is Map); // true
  print(names1 is Set); // false

  var elements = <String>{};
  elements.add('hello');
  elements.addAll(halogens); // {hello, h, e, ll, o}
  print(elements);

  final constSet = const {'h', 'e'};
  // const 不能修改
  // constSet.add('llo'); //  Unsupported operation: Cannot change unmodifiable set

  // 也可以用 ... 和 ...?
}

testMaps() {
  print('--------------- test Maps   --------------');
  var m1 = {
    'f': 'first',
    's': 'second',
    't': 'third'
  }; // dart 类型推断为 Map<String, String>
  var m2 = {0: 'zero', 1: 'first', 2: 'second'}; // dart 类型会推断成 Map<int, String>

  // m1[0] = 'hello'; 报错

  var m3 = Map();
  m3['h'] = 'hello';
  m3[0] = 'zero';
  print(m3); // {h: hello, 0: zero}

  var m4 = {'f': 'first'};
  m4['s'] = 'second';
  print(m4.length); // 2

  m4['f'] = 'ff';
  print(m4); // {f: ff, s: second}

  final constMap = const {2: 'hi'};
  // Unsupported operation: Cannot set value in unmodifiable Map，在解析时就执行了，所以报错在上面代码前面
//  constMap[2] = 'hello';
}

testRunes() {
  // 字符集扩展
  var hi = 'Hi 🇩🇰';
  print(hi);
  print('The end of the string: ${hi.substring(hi.length - 1)}');
  print('The last character: ${hi.characters.last}\n');
}

// 不常用
testSymbols() {
  print('--------------- test Symbols   --------------');
  Symbol lib = Symbol("Foo");
  String name_of_lib = MirrorSystem.getName(lib);
  print(lib);
  print(name_of_lib == 'Foo');  // true
}
