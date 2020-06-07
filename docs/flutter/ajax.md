---
title: 数据请求
---

## 解析请求到的数据

> 编码(序列化) 就是将数据结构转成字符串，解码(反序列化) 就是将字符串转成数据结构。

下面介绍了解析数据的两种策略：

-   手动序列化，缺点是麻烦。
-   使用代码生成自动序列化，缺点是可能生成的会过大。

### 手动序列化

小型项目可以通过内置 `dart:convert` 库进行手动序列化。

下面是后端返回的一个简单的 JSON 数据：

```
{
  "name": "John Smith",
  "email": "john@example.com"
}
```

获取到这个 JSON 数据后，我们可以有 2 种处理方法：

1. 使用 jsonDecode 将它转成一个 Map，然后直接使用。
2. 使用 Model 序列化 JSON，也就是转成实例的属性，进行调用。

**使用 jsonDecode 将它转成一个 Map**

```dart
Map<String, dynamic> user = jsonDecode(jsonString);

print('Howdy, ${user['name']}!');
print('发文字给邮箱${user['email']}');
```

但是使用上面的方法只有在运行时才知道数据的类型，失去了静态语言的功能，代码非常容易出错。

**使用 Model 序列化 JSON**

通过引入一个 Model 类来解决上面的问题。

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

### 自动序列化

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
