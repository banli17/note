## 属性和值

css的属性分为字体、文本、背景和空间，与之对应的值分为关键词、数字、数字加单位、多个值。

**字体属性**

```
font-family: '微软雅黑','宋体';
font-size: 14px
font-style: italic;
font-weight: bold;
```

**文本属性**

```
color
text-indent
text-align
line-height: 2;
text-decoration
```

**背景属性**

```
background-color
```

**空间属性**

```
width
margin
```

## 单位

相对单位 em rem % vw vh
绝对单位  px in pt cm mm

font-size设置为em，是根据父元素的font-size来计算的，盒模型的em是根据当前元素的font-size来计算的。

rem是根据html的font-size来计算的

line-height: 2; 是根据当前元素的font-size来计算的。

1px 在不同设备上，根据dpr来对应不同的点数。但是显示大小是一致的。

- vmin: 根据视口小的方向计算
- vmax: 根据视口大的方向计算

## calc

## 颜色

rgb 和 十六进制的转换

```
// 16进制转成10进制
ff -> 15*16 + 15
00 -> 0*16 + 0
```

```
.parent {
    color: green;
    border-color: currentColor;
}
```

- currentColor 会找自己的color，如果没有，找父元素的color。
- transparent
- rgba() , `alpha-channel`透明度通道。

## 列表属性list-style

list-style 是三个属性的简写

- list-style-type: none、disc、circle、square、decimal、low-alpha等
- list-style-position: inside 、outside
- list-style-image: 可以设置小图标为一个图片

不过一般都是设置 `list-style: none`，小图标直接用 `background` 来实现。

## 参考资料

- http://www.w3school.com.cn/cssref/pr_list-style-type.asp











