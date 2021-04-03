# css 揭秘

## 1. 透明边框

背景实际会从边框处开始渲染，所以如果 border rgba 会有问题。

解决方法是 background-clip:padding-box

## 2. 多边框

方案 1: `box-shadow: 右 下 模糊 扩展 色`。

注意： 阴影不影响盒子渲染，阴影无法触发盒子鼠标事件。可以通过 inset 解决。

方案 2: outline 适合 2 层边框，+border，而且支持 dashed。

而且可以通过 outline-offset 调整位置，支持负数。

## 3. 灵活的背景定位

图片要定位到有下角。

background-position: right 20px bottom 20px;

还一种方法是 calc，计算到左上角的距离。

calc(100% - 20px) 注意空格

background-position 默认是从 padding-box 定位的，可以通过 background-origin 修改。

## 4. 边框内圆角

outline 不会跟着 border-radius 走，box-shadow 会。

所以用 box-shadow 来填满空隙。所以如果边框小于空隙处半径，则无法实现

## 5. 条纹背景
