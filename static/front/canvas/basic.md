# canvas

```
var canvas = document.getElementById('canvas')
var context = canvas.getContext('2d')  // 获取渲染上下文
```

canvas的坐标是以左上角为(0,0)，x,y轴方向分别是右下。

**绘制矩形**

```
context.fillRect(x, y, width，height)  // 实心
context.strokeRect(x, y, width, height)  // 空心
```

**绘制路径**

```
context.beginPath()     // 开始设置路径
context.moveTo(10, 20)  // 设置起点
context.lineTo(50, 20)  // 设置终点
context.stroke()        // 绘制路径

context.fill()  // 填充路径，当调用fill()函数时，所有没有闭合的形状都会自动闭合，所以你不需要调用 closePath() 函数。
context.closePath()  // 可以自动闭合路径
```

**绘制圆弧**

```
context.arc(x, y, radius, startAngle, endAngle, anticlockwise)
```
- startAngle：默认是0，方向向右
- anticlockwise：可选，默认是false，表示顺时针绘制
- startAngle,endAngle：是弧度，不是角度，需要将角度转成弧度。
     - degree *(Math.PI / 180)

**绘制文本**

```
context.fillText(text, x, y)
context.strokeText(text, x, y)
```

x,y 表示文本左下角的坐标。

**设置颜色**

```
context.fillStyle = color
context.strokeStyle = color
```

**修改线宽**

```
context.lineWidth = number
```

**擦除canvas**

```
context.clearRect(x, y, width, height)
```

**加载图像**

```
context.drawImage(image对象, x, y, [width], [height])
```

如果没有设置宽、高，则会显示原始尺寸

**图像裁剪**

```
context.drawImage(image, source_x, source_y, source_width, source_height, x, y, width, heigh);
```

`source_x, source_y` 表示以图片的哪个点为起点。 `source_width, source_height` 是图片裁剪大小。 x,y是要在画布的哪个点开始画，width，height是画多大。


**碰撞检测**

1. 如果是2个方形元素

```
if(!(b1.x + b1.width < b2.x) || (b2.x + b2.width < b1.x) || (b1.y + b1.height < b2.y) || (b2.y + b2.height < b1.y) ){
    // ...
}
```

2. 如果是圆形

通过连接圆心的三角形来判断， 圆心距离的平方小于两个圆心点水平垂直距离平方的和。

```
var dx = circle2.x - circle1.x;
var dy = circle2.y - circle1.y;
var distance = Math.sqrt((dx * dx) + (dy * dy));
if (distance < circle1.radius + circle2.radius) {
  // 两个圆形碰撞了
}
```

**save()和restore()**

ctx.save() 可以用来保存当前context上下文的状态，注意不是保存图像， ctx.restore()用来取出context状态。具体查看[Canvas学习：save()和restore()](https://www.w3cplus.com/canvas/canvas-states.html)


***创建渐变**

- ctx.createLineGradient(x0,y0,x1,y1)
- ctx.createRadialGradient(x0,y0,r0, x1,y1,r1)

添加颜色，需要使用addColorStop(position, color) 方法。

```
var gradient = ctx.createLinearGradient(0, 0, 0, h); gradient.addColorStop(0, 'rgb(255,0,0)'); //红 gradient.addColorStop(0.5, 'rgb(0,255,0)');//绿 gradient.addColorStop(1, 'rgb(0,0,255)'); //蓝 ctx.fillStyle = gradient; ctx.fillRect(0, 0, w, h);
```

![渐变](./img/canvas-radial-gradient.png)

渐变是以两个圆形成的圆锥为渐变。具体查看[Canvas学习：渐变](https://www.w3cplus.com/canvas/gradient.html)。


## getImageData()、putImageData()、createImageData()

`getImageData(x,y,width,height)` 用于复制画布上指定图形的像素数据，`putImageData(imgData, x, y)` 用于将图形数据放回画布。

```
var c=document.getElementById("myCanvas");
var ctx=c.getContext("2d");
ctx.fillStyle="red";
ctx.fillRect(10,10,50,50);

function copy() {
    var imgData=ctx.getImageData(10,10,50,50);
    ctx.putImageData(imgData,10,70);
}
```

`imgData`对象的data属性存每四位存放着每个像素的rgba值(alpha通道0 是透明的，255 是完全可见的)。所以遍历每一个像素可以通过下面的方法。

```
// 反转颜色
for (var i=0;i<imgData.data.length;i+=4) {
  imgData.data[i]=255-imgData.data[i];
  imgData.data[i+1]=255-imgData.data[i+1];
  imgData.data[i+2]=255-imgData.data[i+2];
  imgData.data[i+3]=255;
  }
```
createImageData() 用于创建imgData对象。

```
// 创建 100*100 像素的 ImageData 对象，其中每个像素都是红色的，然后把它放到画布上
var c=document.getElementById("myCanvas");
var ctx=c.getContext("2d");
var imgData=ctx.createImageData(100,100);
for (var i=0;i<imgData.data.length;i+=4)
  {
  imgData.data[i+0]=255;
  imgData.data[i+1]=0;
  imgData.data[i+2]=0;
  imgData.data[i+3]=255;
  }
ctx.putImageData(imgData,10,10);
```

## 变形

- translate(x, y)
- scale(x, y)
- rotate(deg)  默认是以canvas左上角为圆点进行旋转。如果要以自身中心旋转，需要首先移动圆点translate(图形中心点x,图形中心点y)，然后绘制图形，注意绘制时图形是以此时的圆点是图形的中心点。
- transform()

```
ctx.fillStyle = 'red'
//    ctx.scale(5,5)
ctx.translate(115, 115);
ctx.rotate(30 * Math.PI/180)
ctx.fillRect(-25, -25, 50, 50)
```

## 图像合成

- globalAlpha：可以设置为0或1
- globalCompositeOperation： 设置合成模式

具体参考：[Canvas学习：图像合成](https://www.w3cplus.com/canvas/compositing.html)

## 阴影

可以设置shadowOffsetX、shadowOffsetY、shadowBlur、shadowColor（默认是全透明的黑色）。分别表示右阴影，下阴影，模糊度，颜色。

## 参考文章

- [Html5 Canvas 学习笔记](https://www.gitbook.com/book/oxcow/h5-canvas-study-notes/details)


https://www.createjs.com/easeljs












