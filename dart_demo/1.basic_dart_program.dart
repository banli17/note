main() {
  var number ;
  number = 42;
  number = 'hello';
  printInteger(number);
  final c = [];
  c.add('hi');
  print(c is Object); // true
}

printInteger(number) {
  print('the number is $number');
}

//
