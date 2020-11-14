import 'package:json_annotation/json_annotation.dart';
import 'address.dart';

// 通过 flutter pub run build_runner build 命令 生成 user.g.dart 文件
// flutter pub run build_runner watch
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
