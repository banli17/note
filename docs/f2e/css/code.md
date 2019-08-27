---
title: 常用 css 代码
---

## 修改 placeholder 的颜色

```
input::-webkit-input-placeholder, textarea::-webkit-input-placeholder { 
    color: #666; 
} 
input:-moz-placeholder, textarea:-moz-placeholder { 
    color: #666; 
} 
input::-moz-placeholder, textarea::-moz-placeholder { 
    color: #666; 
} 
input:-ms-input-placeholder, textarea:-ms-input-placeholder { 
    color: #666; 
} 
```

## 三角形

```jsx live
function TriangeUp(){
	return <div style={{display: 'flex'}}>
		<div style={{
			width: 0,
			height: 0,
			borderLeft: '20px solid transparent',
			borderRight: '20px solid transparent',
			borderBottom: '40px solid red',
			marginRight: 50
		}}></div>

		<div style={{
			width: 0,
			height: 0,
			borderTop: '40px solid red',
			borderRight: '40px solid transparent'
		}}></div>
	</div>
}
```


## 自定义chrome滚动条样式

```css
::-webkit-scrollbar {
  width: 6px;
  height: 4px;
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.15);
}

::-webkit-scrollbar-thumb:window-inactive {
  background: rgba(0, 0, 0, 0.1);
}

::-webkit-scrollbar-thumb:vertical {
  height: 4px;
  background: rgba(0, 0, 0, 0.15);
}

::-webkit-scrollbar-thumb:horizontal {
  width: 4px;
  background: rgba(0, 0, 0, 0.15);
}

::-webkit-scrollbar-thumb:vertical:hover {
  background-color: rgba(0, 0, 0, 0.3);
}

::-webkit-scrollbar-thumb:vertical:active {
  background-color: rgba(0, 0, 0, 0.5);
}

::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.1);
  box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.1);
}

::-webkit-scrollbar-track-piece {
  background: rgba(0, 0, 0, 0.15);
}
```

## 金色

```jsx live 
class GoldBox extends Component{
    render(){
        var style = {
            width: '100px',
            height: '50px',
            background: 'linear-gradient(90deg, gold 10%, yellow 50%, gold 90%)'
        }
        return <div style={style}></div>
    }
}
```

## 元素居中方案

元素居中，是元素在父元素中垂直水平居中。这种布局在工作中经常使用。方法有很多，下面列举一些。

### 负 margin

```css
.center{
    width: 100px;
    height: 100px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -50px;
    margin-top: -50px;
}
```

### flex居中

```css
.center{
    display: flex;
    align-items: center;
    justify-content: center;
}
```




## 光泽闪过的效果

1.jpg

```css
@-webkit-keyframes light {
    100% { opacity: 1; left: 125%; }
}
@-moz-keyframes light {
    100% { opacity: 1; left: 125%; }
}
@-ms-keyframes light {
    100% { opacity: 1; left: 125%; }
}
@keyframes light {
    100% { opacity: 1; left: 125%; }
}
@-webkit-keyframes light2 {
    100% { opacity: 1; left: -150px; }
}
@-moz-keyframes light2 {
    100% { opacity: 1; left: -150px; }
}
@-ms-keyframes light2 {
    100% { opacity: 1; left: -150px; }
}
@keyframes light2 {
    100% { opacity: 1; left: -150px; }
}
 a::before, a::after {
    opacity: 0;
    content: "";
    width: 80px;
    height: 100%;
    overflow: hidden;
    transform: skewX(-25deg);
    position: absolute;
    top: 0;
    left: -150px;
    background: -moz-linear-gradient(left, rgba(255, 255, 255, 0) 0px, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0) 100%);
    background: -webkit-linear-gradient(left, rgba(255, 255, 255, 0) 0px, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0) 100%);
    background: linear-gradient(to right, rgba(255, 255, 255, 0) 0px, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0) 100%);
}

a:hover::before, a:hover::after {
    -webkit-animation: light 1s ease-out;
    -moz-animation: light 1s ease-out;
    -ms-animation: light 1s ease-out;
    animation: light 1s ease-out;
}
```

如果是小图片，只要从左到右的，则只需要写`light1，a::before`就行。

## 参考资料

- [css三角形生成器](http://apps.eky.hk/css-triangle-generator/zh-hant)