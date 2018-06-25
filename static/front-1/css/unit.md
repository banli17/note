css的单位主要有以下几个：
- px：px是绝对单位
- em：1em 等于父元素设置的字体大小。如果父元素没有设置字体大小，则继续往父级元素查找，直到有设置大小的，如果都没有设置大小，则使用浏览器默认的字体大小。其它属性border, width, height, padding, margin, line-height是参照该元素的font-size计算的，如果没有设置，则往父级查找，都没有设置，则使用浏览器默认的字体大小。计算较复杂，不建议使用
- rem：r表示root，是相对于根元素html的font-size来计算的。修改了html的font-size，则所有的尺寸都会变化。
```
html {
 font-size: 625%; /* 相当于100px = 625% * 16px */
}
div {
 font-size: 20px; 
 width: 2rem; /* 2rem = 2 * 100px(根元素的font-size) */
 height: 4rem; /* 4rem = 4 * 100px(根元素的font-size) */
 padding: 0.1rem; /* 0.1rem = 0.1 * 100px(根元素的font-size) */
}
```
- %：如果html font-size为62.5%，是以浏览器默认字体计算的，即（62.5% * 16px = 10px），所有浏览器默认字体大小为16px
- vw,vh,vmin,vmax：是基于视窗大小来计算的。1vw是视窗宽度(html，不是body，因为body有margin:8px;)的的百分之一。vmin表示vw和vh中最小值。安卓4.3以下不兼容，以后再用。
```
.box {
 height: 50vh; /* 视窗高度的50% */
 width: 25vw; /* 视窗宽度的25% */
 background: red;
}
```

- 单位运算：
```
.box {
 height: calc(50vh - 20px); /* 50% 的视窗高度减掉20px */
 width: calc(100% - 10px);  /* 三分之一的父容器宽度 */
 background: red;
}
```
兼容性不好，先不用。