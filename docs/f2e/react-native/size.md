---
title: "react-native屏幕适配问题"
date: 2016-08-06 13:49:26
toc: true
---

# 移动端的长度单位

## 长度的分类

长度单位分为两种，
- 一种是直接和物理长度对应的绝对长度，有dp（1/160英寸）、pt(1/72)等。
- 一种是和物理长度无法对应的相对长度。有px、em、rem。

## dpi

dpi 表示在1英寸内的像素数。代表像素的密度。

## react-native中的长度单位

- 安卓的长度单位是 dp。
- ios的长度单位是 point（ios自己定义的），约等于 1dp。

```javascript
const style = StyleSheet.create({
	width: 100
})
```

## 简介

1、首先设置文字大小不自动缩放

```javascript
Text.defaultProps.allowFontScaling = false
```

2、默认情况下，rn的单位会随着屏幕的像素密度不同而不同。为了让不同设备显示的字体大小相同。需要使用`PixelRatio`类做一些事情。更简单的方式是直接使用[react-native-size-matters](https://github.com/nirsky/react-native-size-matters)。然后就可以像下面这样：

```html
btn: {
    fontSize: moderateScale(12)
}
```

`react-native-size-matters`主要提供了三个方法：

- scale()：按照屏幕宽度等比缩放
- verticalScale()：按照屏幕高度等比缩放
- moderateScale()：非线性缩放，默认缩放因子是0.5。适合字体、padding等缩放

