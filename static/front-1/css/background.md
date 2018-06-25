# 背景

背景有下面8个属性：
- background-color	
- background-image
- background-repeat
- background-attachment
- background-position
- background-origin
- background-clip
- background-size

## background-color

用于设置背景颜色，当同时定义了背景图片时，图片覆盖在颜色之上。

## background-image

元素的背景占据了元素的全部尺寸，包括内边距和边框，但不包括外边距。

多个背景图片的写法：

```
background: url(1.jpg) 0 0 no-repeat;
            url(2.jpg) 100px 0 no-repeat;
```

## background-attachment 

背景依附，背景是否跟着页面滚动，默认是scroll，可以设置为fixed。

## background-position

设置背景图像的起始位置，可以设置3种类型的值：
- top left形式
- x% y%，如果只设置了一个值，另一个会是50%。100% 100%是最右下角
- xpos ypos

## background-clip

规定背景的绘制区域，可选值如下：
- border-box，表示从border开始绘制
- padding-box，表示从padding开始绘制
- content-box，表示从content开始绘制

## background-origin

规定background-position属性相对于什么位置来定位。如果设置了background-attachment为fixed，则该属性没效果。
- padding-box，默认值
- border-box
- content-box

## background-size

背景图像的尺寸，可以设置为下面这些值：
- 100px 100px ，如果只设置一个值，另一个是auto
- 50%
- cover
- contain

## 线性渐变

```
语法： linear-gradient([角度 | 方向词], color, ...,color)
```

- 角度：0是从下到上，90deg是从左到右
- 方向词：top、right、bottom、left、left top、top right、bottom right 或 left bottom。默认是`to botton`。
- color：表示渐变的色标，每个色标包括一个颜色和一个位置，位置可以是百分比或者绝对长度。

## 径向渐变


