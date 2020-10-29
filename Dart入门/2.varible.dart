main() {
  var a;
  print(a);
  assert(a == null); // true

//  var b = const [];
//  b.add(1);    // 报错 Unsupported operation: Cannot add to an unmodifiable list
//  print(b);

//  var foo = const [];
//  const foo = [];
//  foo = [1, 2, 3];
//  print(foo);

  const Object i = 3;
  const list = [i as int];
  print(list);

  const map = {if (i is int) i: 'int'}; // 动态增加 key:value
  print(map); // {3: int}

  const set = {if (list is! List<int>) ...list};
  print(set); // {}

  double z = 1;
  print(z);  // 1.0
}
