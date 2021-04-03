---
title: flutter
---

stl 快捷键，生成 StatelessWidget 模版
stf 快捷键生成 StatefulWidget 模版

widget 是 @immutable 的，所以子类里的变量都要是 final 的。

SizedBox(height: 8) 尺寸盒子，用来做间距

alt+enter 给某个 widget 包另一个 widget
command + alt + b 或点左边的下箭头 查看抽象类的实现类

生命周期: 回调函数、钩子函数

-   监听事件
-   销毁

StatelessWidget 只有 2 个生命周期函数 构造函数 和 build。

对于 stateful widget

1. StatefulWidget

-   constructor
-   Widget.createState

2. State

-   constructor
-   mounted
-   initState
-   didChangeDependencies
-   build
-   didUpdateWidget
-   dispose

StatelessWidget 转 StatefulWidget ， 选中 StatelessWidget 然后 alt+enter
把 build 出来的 widget 抽取到一个单独的 widget。 alt + enter + w

## flutter 编程范式

-   命令式编程
-   声明式编程

## Widget

Text 行内元素

```dart
Text(
    "hello",
    textAlign: TextAlign.center
    maxLines
    overflow: TextOverflow.ellipsis, // 省略号
    textScaleFactor: 1.5
    style: TextStyle(
        fontSize: 20,
        color: Colors.red,
        fontWeight: FontWeight.bold
    )
)

Text.rich(
    TextSpan(text: "world"),
)

Text.rich(
    TextSpan(
        children: [
            TextSpan(text: "A"),
            TextSpan(text: "B"),
            WidgetSpan(child: Icon(Icons.add))
        ]
    ),
)

FloatingActionButton
floatingActionButtonLocation

FlatButton(
    color: Colors.amberAccent,
    shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.cicular(8)
    ),
    child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
            Icon(Icons.favorite),
            Text("喜欢作者")
        ]
    )
)

Image(
    image: NetworkImage(imageURL),
    width: 200,
    height: 200,
    fit: BoxFit.fitWidth,  // contain cover
    alignment: Alignment.bottomCenter,
    repeat: ImageRepeat.repeatY,
    color: Colors.green,
    colorBlendMode: BlendMode.colorDodge,  // 混入模式
)
Image.network(imageURL)
Image.assets()

// 设置按钮大小
ButtonTheme(
    minWidth: 30,
    height: 30,
    child: FlatButton()
)

// 占位图
FadeInImage(
    fadeOutDuration: Duration(milliseconds: 1),
    fadeInDuration: Duration(milliseconds: 1),
    placeholder: AssetImage(imageURL),
    image: NetworkImage(imageURL)
)

图片默认会缓存，最大 100m  1000张

// 字体图标 Icon
// 1. 0xe91d -> unicode 编码
// 2. 设置对应的字体
Text("\ue91d", style: TextStyle(fontFamily: "xx"))

// 输入框
TextField(
    decoreation: InputDecoration(
        labelText
        icon:
        hintText: '请输入用户名',
        border: OutlineInputBorder(),  // InputBorder.none 去除边框
        filled: true,
        fillColor:
    )
)

Container(
    width: double.infinity, // 撑满父容器
    height: 40,
    child: FlatButton(

    )
)

final a = TextEditingController()

TextField(
    controller: a   // 绑定后，通过 .text 获取到数据
)
TextField(
    controller: b
)
onPress(){
    a.text
    b.text

}
// 清空
a.text = ''
// 监听
a.addListener
```

布局组件

```
Align(
    alignment: Alignment(1, 1)
    child:
)

Center

Padding(
    padding: EdgeInsets.all(8.0),
    child: Text("hi")
)

Container(
    padding,
    child: Text("hello")
)
```

❌
✅
