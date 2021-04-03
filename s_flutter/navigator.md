# 路由跳转、路由参数

## 导航

1. 创建路由

```
MaterialApp(
  initialRoute: '/',
  routes: {
    '/': (context) => FirstScreen(),
    '/second': (context) => SecondScreen(),
  },
);
```

2. 跳转

```
Navigator.pushNamed(context, '/second');
```

3. 返回

```
Navigator.pop(context);
```

## 传递参数

1. 创建参数类

```
class ScreenArguments {
  final String title;
  final String message;

  ScreenArguments(this.title, this.message);
}
```

2. 路由跳转携带参数

```
Navigator.pushNamed(
    context,
    '/second',
    arguments: ScreenArguments(
        'Extract Arguments Screen',
        'This message is extracted in the build method.',
    ),
);
```

3. 在页面获取参数对象

```
final ScreenArguments args = ModalRoute.of(context).settings.arguments;
```

## 参考

-   官方文档 [https://flutter.dev/docs/cookbook/navigation](https://flutter.dev/docs/cookbook/navigation)
