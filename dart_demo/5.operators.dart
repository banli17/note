class A3 {
  String name = '张三';
}

main() {
  // 一元后缀 expr++  expr--  () [] . ?.
  // 一元前缀 -expr   !expr  ~expr ++expr  --expr  await expr
  // 可乘的 * / % ~/
  // 关系 >= >  <= < as is is!  == !=
  // 移位  <<  >>  >>>
  // 位运算  & ^ |
  // 逻辑 && ||
  // 如果为空 ??
  // 三元 expr1 ? expr2 : expr3
  // 级联 ..
  // 赋值  =  *=  /=  +=  -=  &=  ^=

  var a1 = 1;
  assert(++a1 == 2);
  assert(--a1 == 1);
  var a2 = {'name': 'hello'};
  assert(a2['name'] == 'hello');
  var a3 = A3();

  assert(a3.name == '张三');

}
