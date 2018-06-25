## 学习设计规范  
http://material.google.com    
http://developer.apple.com 
https://github.com/wabg/awesome-react-native#%E5%9B%BE%E5%BD%A2%E5%8A%A8%E7%94%BB
## app架构

## 目录结构

```markup
-app
   -component 组件
   -screen    页面
   -App.js  路由

```
https://github.com/ascoders/react-native-image-viewer
https://github.com/dylanvann/react-native-progressive-image
https://github.com/yorkie/react-native-wechat#sharetotimelinedata


## ui框架

https://mobile.ant.design/components/list-view-cn/


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

# react 组件生命周期

## 初始化开始

- getDefaultProps
- getInitialState
- componentWillMount
- render
- componentDidMount

## 组件运行中

- state状态会改变
- shouldComponentUpdate  // 不要在这里修改state
- componentWillUpdate
- render
- componentDidMount

## 外部props改变

- componentWillReceiveProps
- shouldComponentUpdate
- render
- componentDidUpdate

## 组件卸载

- Unmount
- componentWillUnmount
adb devices命令

com.android.ddmlib.InstallException: Failed to establish session
打开miui的开发者选项，关闭miui优化。