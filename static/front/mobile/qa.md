# 移动web开发常见问题


**1. 移动端如何定义font-family?**

中文字体使用系统默认即可，英文用Helvetica。

```css
/* 移动端定义字体的代码 */
body{font-family:Helvetica;}
```

参考[《移动端使用字体的思考》](http://www.cnblogs.com/PeunZhang/p/3592096.html)


# 响应式

## viewport

如果没有加viewport，视口宽度默认是980px(html)，这是因为最初大屏手机刚出来时，设计手机浏览器的时候，为了让pc网站正常显示而设定的，可以通过手指缩放进行浏览。

现在，大屏手机已经很常见了，基本所有网站都会制作手机网站，为了更好的显示，需要将视口宽度设置为屏幕宽度。

viewport就是浏览器的可视区域，它和浏览器的窗口没什么关系。比如viewport(980),而iphone6是375

```
<meta name="viewport" content="width=device-width,initial-scale=1.0">
```

上面代码会将可视区宽度设置为设备宽度。

## 媒体查询 


## 尺寸问题

- 物理像素：是绝对长度
- css像素px：是相对长度
比如iphone6  css像素/物理像素 = 2，当用户缩放屏幕到1倍大时，css的1px = 1个物理像素

window.devicePixelRatio 表示 设备物理像素/设备独立像素
比如iphone5 物理像素是 640px 设备独立像素相当于设备的尺寸， 是320pt

1pt = 1/72英寸
ppi: 像素密度，每英寸的像素数
ppi = Math.sqrt(x*x + y*y) / 屏幕尺寸
dpi 每英寸打印的点数，打印分辨率

三个viewport

- layout viewport 默认viewport document.documentElement.clientWidth
- visual viewport 浏览器可视区域大小 window.innerWindow
- ideal viewport  移动设备理想viewport 


尺寸相关：
1. 设备的物理像素分辨率  640px
2. CSS像素分辨率： 设备像素宽度 320px


## 相关概念

window.devicePixelRatio = 设备物理像素 / 设备独立像素 

设备物理像素，解释是设备能显示的最小单位，实际就是设备分辨率，比如iphone6















## 参考

- [关于 iOS 中 pt 的误解](http://www.zcool.com.cn/article/ZNDA1ODcy.html)
- http://www.cnblogs.com/PeunZhang/p/3441110.html