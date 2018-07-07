# React-Native屏幕适配


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

