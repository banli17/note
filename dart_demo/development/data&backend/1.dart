import 'dart:convert';
import '../../lib/user.dart';

var json_str =
    '{"name":"Josn smith", "email": "john@example.com", "age": 12, "address": {"city":"beijing"}}';

// 手动转为 Map
void parse_json_str_test1() {
  Map<String, dynamic> m = jsonDecode(json_str);
  print('parse_json_str_test1: hi, ${m['name']} \'s email is ${m['email']}');
}

void parse_json_str_test2() {
  User m = User.fromJson(jsonDecode(json_str));
  print('parse_json_str_test2: hi, ${m.name} \'s email is ${m.email}');

  // jsonEncode 方法会自动调用实例的 toJson 方法
  String s = jsonEncode(m);
  print(s);
}

void parse_json_str_test3() {
  Map userMap = jsonDecode(json_str);
  var user = User.fromJson(userMap);
  print('用户的地址是：${user.name}');
}

void main() {
  parse_json_str_test1();
  parse_json_str_test2();
  parse_json_str_test3();
}
