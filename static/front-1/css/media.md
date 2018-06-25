# 媒体查询media

媒体查询可以使用`and`、`not`或`only`组合。它的2种引入方式如下

```
// 1、外链，css始终会加载，只是不被应用
<link rel="stylesheet" media="print and (max-width: 800px)" href="1.css">

// 2、内嵌
<style>
    @media (max-width: 600px){
        .box{
            display: none;
        }
    }
</style>
```

除非使用not或only操作符，否则媒体类型是可选的，默认值是all(全部)。若使用了not或only操作符，必须明确指定一个媒体类型。

你也可以将多个媒体查询以逗号分隔放在一起；只要其中任何一个为真，整个媒体语句就返回真。相当于or操作符。

```
@media (min-width: 700px) { ... }
(min-width: 700px) and (orientation: landscape) { ... }
@media tv and (min-width: 700px) and (orientation: landscape) { ... }

@media (min-width: 700px), handheld and (orientation: landscape) { ... }

```

 not关键字仅能应用于整个查询，而不能单独应用于一个独立的查询。
 ```
 @media not all and (monochrome) { ... }
 // 等价于
 @media not (all and (monochrome)) { ... }
 
 @media not screen and (color), print and (color)
 // 等价于
 @media (not (screen and (color))), print and (color)
 ```
color表示彩色显示设备, media/visual。指定输出设备每个像素单元的比特值。如果设备不支持输出颜色，则该值为0。
注意：如果每个颜色单元具有不同数量的比特值，则使用最小的。例如，如果显示器为蓝色和红色提供5比特，而为绿色提供6比特，则认为每个颜色单元有5比特。如果设备使用索引颜色，则使用颜色表中颜色单元的最小比特数。

```
@media all and (color) { ... }

//向每个颜色单元至少有4个比特的设备应用样式表：
@media all and (min-color: 4) { ... }
```

```
media_query_list: <media_query> [, <media_query> ]*
media_query: [[only | not]? <media_type> [ and <expression> ]*]
  | <expression> [ and <expression> ]*
expression: ( <media_feature> [: <value>]? )
media_type: all | aural (阅读设备)| braille (盲文)| handheld | print |
  projection (项目演示，比如幻灯)| screen (彩色电脑屏幕) | tty | tv | embossed (盲文打印)
media_feature: width | min-width | max-width
  | height | min-height | max-height
  | device-width | min-device-width | max-device-width
  | device-height | min-device-height | max-device-height
  | aspect-ratio | min-aspect-ratio | max-aspect-ratio
  | device-aspect-ratio | min-device-aspect-ratio | max-device-aspect-ratio
  | color | min-color | max-color
  | color-index | min-color-index | max-color-index
  | monochrome | min-monochrome | max-monochrome
  | resolution | min-resolution | max-resolution
  | scan | grid | orientation protrait/landscape
```
媒体查询是大小写不敏感的，包含未知媒体类型的查询通常返回假。

大多数媒体属性可以带有“min-”或“max-”前缀，用于表达“最低...”或者“最高...”。例如，max-width:12450px表示应用其所包含样式的条件最高是宽度为12450px，大于12450px则不满足条件，不会应用此样式。这避免了使用与HTML和XML冲突的“<”和“>”字符。如果你未向媒体属性指定一个值，并且该特性的实际值不为零，则该表达式被解析为真。

## 实战

当做响应式设计时，需要根据不同的屏幕尺寸来设置媒体查询。常用尺寸如下：

```
- 手机横屏 544px
- 平板竖屏 768px
- pc窄屏  992px
- pc宽屏  1200px
- pc超大屏1380px
```

写媒体查询还需要考虑移动优先，或者PC优先，如果移动优先，可以先写移动端样式，再逐渐增加屏幕适配。

```
// 手机样式
.box{}

// 适配pc，大于或等于1200px。注意max 和 min 都是包含1200px
@media screen and (min-width: 1200px){}
```
这样做的好处是移动端首先加载，另外移动端一般样式简单，pc端需要覆盖的样式会很少。

## 参考文章

- https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Media_queries#Media_features
- http://www.cnblogs.com/august-8/p/4537685.html