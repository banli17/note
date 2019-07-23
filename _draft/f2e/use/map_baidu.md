---
title: "如何在网页加入百度地图"
date: 2017-07-03 17:35:49
tags:
---

网站上联系我们页面经常需要加入百度地图，要定位到指定的地点，下面记录一下制作的方法。

## 实现

1、通过百度地址坐标拾取工具：http://api.map.baidu.com/lbsapi/getpoint/index.html  获取位置坐标

2、添加如下代码。注意要修改坐标、标题、地址标注等等。

```js
<div id='map'></div>
<script>
var map = new BMap.Map("map");
var point = new BMap.Point(114.294985,27.692483);  // 地址坐标
map.centerAndZoom(point, 18);
var marker = new BMap.Marker(point);  // 创建标注
var opts = {
    width : 200,     // 信息窗口宽度
    height: 100,     // 信息窗口高度
    title : "玉盘大酒店" , // 信息窗口标题
    enableMessage:true
}
var infoWindow = new BMap.InfoWindow("地址：地址标注", opts);  // 创建信息窗口对象
marker.addEventListener("mouseover", function(){
    map.openInfoWindow(infoWindow,point); //开启信息窗口
});
map.addOverlay(marker);               // 将标注添加到地图中
marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
map.enableScrollWheelZoom();   //启用滚轮放大缩小，默认禁用
map.enableContinuousZoom();    //启用地图惯性拖拽，默认禁用
map.setMapStyle({style:'grayscale'});
</script>
```

效果图如下所示：

1.png

## 参考

百度地图api http://developer.baidu.com/map/reference/index.php 