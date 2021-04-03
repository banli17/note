---
title: "flutter 包"
---

## 引入本地包和 github 包

**必须:**

-   `pubspec.yaml`
-   `lib/`文件夹

**包分类**

-   Dart 包: 只涉及 dart 代码，依赖 flutter 框架，对应`flutter package`。
-   插件包: dart、ios、android ，对应`flutter plugin`。

## 开发 Dart 包

正常开发即可。

## 开发插件包

```

```

## 包的依赖和冲突

**pubspec.yaml**

```
dependencies:
    a: 0.1  // 依赖 0.22 c
    b: 0.2  // 依赖 0.21 c
    c: '0.22'
```
