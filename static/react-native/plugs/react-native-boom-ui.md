# react-native-boom-ui

将我所有使用到的ui都封装在这个库里。


## Grid

![](./imgs/boom-ui/grid.png)
```
const data = [
    {
        icon: 'http://xx.com/1.png',
        text:'扫一扫'
    }
    {
        icon: 'http://xx.com/1.png',
        text:'快捷支付'
    },
    {
        icon: 'http://xx.com/1.png',
        text:'二维码'
    }
]

// 用法
<Grid data={data}
    textStyle={styles.text}
    columnNum={3}/>
```

| 属性 | 值|
|----|----|
|data|数据源，icon是显示的图标，text是显示的文字|
|textStyle|修改文本的颜色，默认是#999|
|columnNum|一行显示多少项|

