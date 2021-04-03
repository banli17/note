---
title: 数据请求
---

## 解析请求到的数据

> 编码(序列化) 就是将数据结构转成字符串，解码(反序列化) 就是将字符串转成数据结构。

下面介绍了解析数据的三种策略：

-   直接当 Map 使用。最方便，但是失去了静态检查的好处。
-   手动序列化，缺点是麻烦。
-   使用代码生成自动序列化，缺点是可能生成的会过大。

下面是后端返回的一个简单的 JSON 数据：

```
{
  "name": "John Smith",
  "email": "john@example.com",
  "address": {
    "city": "beijing"
  }
}
```

以这个数据来分别介绍三种方法。

### 直接当 Map 使用

这种方案，我最喜欢，和 JavaScript 类似，但是代码非常容易出错，为了静态数据检查和规范，不太推荐这种方法。

拿到数据后，使用 `dart:convert` 内置的 `jsonDecode()` 方法将它转成一个 Map，然后使用。

```dart
Map<String, dynamic> user = jsonDecode(jsonString);

// 使用
user['name']
user['email']
user['address']['city']
```

### 手动序列化

手动序列化就是通过引入一个 Model 类来序列化 JSON，也就是转成类实例的属性，进行调用。

```js title="user.dart"
class User {
  final String name;
  final String email;

  User(this.name, this.email);

  User.fromJson(Map<String, dynamic> json) : name = json['name'], email = json['email'];

  Map<String, dynamic> toJson() =>
    {
      'name': name,
      'email': email,
    };
}
```

使用方式如下：

```js
Map userMap = jsonDecode(jsonString);
var user = User.fromJson(userMap);

print('Howdy, ${user.name}!');
print('We sent the verification link to ${user.email}.');

// 编码
String json = jsonEncode(user);
```

但是这种方法对于上面数据有深层次嵌套的 addrerss 就很麻烦了。所以推荐使用下面自动化方法。

### 自动序列化

自动序列化就是通过我们编写的一个简单的模版 Model 类来生成实际复杂代码。

1. 首先安装依赖

```yaml
dependencies:
  ...
  json_annotation: <latest_version>

dev_dependencies:
  ...
  build_runner: <latest_version>
  json_serializable: <latest_version>
```

2. 新建一个 dart 文件，user.dart，要注意的是要在`projectName/lib`目录下创建才生效。

```js title="user.dart"
import 'package:json_annotation/json_annotation.dart';
import 'address.dart';  // 如果有属性还是 json

// 通过下一步命令 生成 user.g.dart 文件
part 'user.g.dart';

@JsonSerializable(explicitToJson: true)
class User {
  String name;
  String email;
  Address address;

  User(this.name, this.email, this.address);

  factory User.fromJson(Map<String, dynamic> json) => _$UserFromJson(json);

  Map<String, dynamic> toJson() => _$UserToJson(this);
}
```

依赖的 address.dart 文件如下：

```js  title="address.dart"
import 'package:json_annotation/json_annotation.dart';
part 'address.g.dart';

@JsonSerializable()
class Address {
  String city;

  Address(this.city);

  factory Address.fromJson(Map<String, dynamic> json) => _$AddressFromJson(json);
  Map<String, dynamic> toJson() => _$AddressToJson(this);
}
```

3. 使用命令生成 `user.g.dart` 文件。

```bash
// 一次性生成
flutter pub run build_runner build

//  监听着进行生成
flutter pub run build_runner watch
```

4. 使用

```js
void parse_json_str_test3() {
  Map userMap = jsonDecode(json_str);
  var user = User.fromJson(userMap);
  print('用户的城市为是：${user.address.city}');
}
```

### 没有 GSON/Jackson/Moshi

在 Flutter 里没有 GSON/Jackson/Moshi 这样的库，因为这些库需要使用运行时反射，而这在 Flutter 中是禁止的，因为运行时反射会影响 tree sharking。反射默认会隐式使用所有代码，它会使摇树变得困难。
