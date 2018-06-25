# css颜色

颜色的值可以设置为关键词(如red)，16进制(#ff0000)或rgb(255,0,0)，除此之外，还有2个关键词：transparent 和 currentColor。currentColor表示当前元素的文字颜色，如果没有则继承父元素的color。

css颜色名

http://www.w3school.com.cn/cssref/css_colornames.asp

十六进制

rgb定义颜色：

```
rgb(255, 0, 0)
rgb(0%, 50%, 20%);
```
rgba()
alpha透明度

hsl 是什么，回忆图片
hue(色调), saturation(饱和度), lightness(亮度)

hsl(0, 100%, 50%)

hsla()
## 十六进制和rgb的换算关系

十六进制换成rgb值的公式为:
```
ff -> 15*16 + 15 = 255
00 -> 0*16 + 0 = 0
```