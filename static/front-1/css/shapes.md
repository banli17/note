# css形状

## 三角形

### 朝上三角形

<img src="http://www.w3croad.com/images/20171009/1.png">

```
#triangle-up {
	width: 0;
	height: 0;
	border-left: 50px solid transparent;
	border-right: 50px solid transparent;
	border-bottom: 100px solid red;
}
```
### 朝下三角形

<img src="http://www.w3croad.com/images/20171009/2.png">

```
#triangle-down {
	width: 0;
	height: 0;
	border-left: 50px solid transparent;
	border-right: 50px solid transparent;
	border-top: 100px solid red;
}
```

### 朝左三角形

<img src="http://www.w3croad.com/images/20171009/3.png">

```
#triangle-left {
	width: 0;
	height: 0;
	border-top: 50px solid transparent;
	border-right: 100px solid red;
	border-bottom: 50px solid transparent;
}
```

### 朝右三角形

<img src="http://www.w3croad.com/images/20171009/4.png">

```
#triangle-left {
	width: 0;
	height: 0;
	border-top: 50px solid transparent;
	border-left: 100px solid red;
	border-bottom: 50px solid transparent;
}
```

### 上左

```
#triangle-topleft {
	width: 0;
	height: 0;
	border-top: 100px solid red;
	border-right: 100px solid transparent;
}
```

## 参考资料
- https://css-tricks.com/examples/ShapesOfCSS/


- <a href='http://apps.eky.hk/css-triangle-generator/zh-hant'>css三角形生成器</a>