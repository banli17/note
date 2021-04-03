---
title: 包和模块
---

## 包管理器对比

| 语言       | 包管理器 | 官网                                           | 配置文件                                                      | 文档 |
| ---------- | -------- | ---------------------------------------------- | ------------------------------------------------------------- | ---- |
| JavaScript | npm      | [https://www.npmjs.com](https://www.npmjs.com) | `package.json`                                                |
| Dart       | pub      | [https://pub.dev](https://pub.dev)             | `pubspec.yaml` [文档](<(https://dart.dev/tools/pub/pubspec)>) |

## JavaScript 包和模块

## Dart 包和模块

### Pub 包管理器

```sh title="Dart pub 命令"
# 获取包
cd <path-to-my_app>
pub get
```

pub get 命令会获取包依赖，然后将它们放到中央系统缓存中，如果依赖第三方发布包，pub 会从 pub.dev 站点下载，或者对于 git 依赖包，会从 git 仓库下载。如果第三方包还有依赖包，也会一并下载。

pub 会在项目根目录自动生成一个 `.packages` 文件，里面是依赖包和缓存地址的映射，如下图所示。

![](imgs/2020-06-11-11-18-29.png)

pub 常见命令如下：

-   `pub cache`
-   `pub deps`: 列出所有依赖项
-   `pob downgrade`: 列出依赖包的最低版本，用于测试依赖的下限
-   `pub get`: 获取包
-   `pub global`: 可以将包设置为全局。激活后，可以全局执行包内的 bin 目录命令。
    -   `pub global activate`
    -   `pub global deactivate`
-   `pub outdated`: 显示过时的包信息，以及可升级的版本
-   `put publish`: 发布包到 [pub.dev 站点](https://pub.dev/)
    -   `--dry-run`或`-n`: 发布时会进行验证
    -   `--force` 或 `-f`: 强制发布包
    -   `--server` 可以将包发送到其它服务器
-   `pub run`
-   `pub upgrade`: 根据过时包信息来更新包
-   `pub uploader`

另外还可以配置环境变量，来设置缓存地址和镜像：

```
# 缓存包地址
PUB_CACHE

# 设置 pub 镜像
PUB_HOSTED_URL = http://user:password@177.0.0.1:9999
```

### pubspec.yaml

pub 包的元数据存放在 [pubspec.yaml](https://dart.dev/tools/pub/pubspec) 文件中。

```yaml title="pubspec.yaml"
name: my_app
dependencies:
    flutter:
        sdk: flutter
    # pub.dev 上的包
    js: ^0.6.0
    intl: ^0.15.8

    #导入本地包，使用相对路径
    my_new_package:
        path: ./my_new_package

    #导入github包
    jpush_flutter:
        git:
            url: git://github.com/jpush/jpush-flutter-plugin.git
            ref: master
```

更多信息请参考：

-   [pubspec.yaml 文件详细介绍](https://dart.dev/tools/pub/pubspec)

### 导入包

导入软件包中找到库，请使用 `package:` 前缀，它表示在 `.packages`文件中查找包:

```
import 'package:js/js.dart' as js;
import 'package:intl/intl.dart';
```

### 升级依赖

pub 安装依赖时，会生成 `pubspec.lock` 文件，用于锁定版本。

要升级依赖包，请使用 `pub upgrade` 命令：

```bash
# 升级所有依赖包
pub upgrade

# 升级指定包
pub upgrade transmogrify
```

`pub upgrade` 无法将所有包都升级到最新版本，只会升级到兼容的最新版本。

### 创建包

### 发布包

### 参考资料

-   [Dart packages](https://dart.dev/guides/packages)
