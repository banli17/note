---
title: css 常用
---

## 滚动条样式

```css
::-webkit-scrollbar {
  display: none;
}

::-webkit-scrollbar {
  width: 10px; /*对垂直流动条有效*/
  height: 10px; /*对水平流动条有效*/
}

/*定义滚动条的轨道颜色、内阴影及圆角*/
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: rosybrown;
  border-radius: 3px;
}

/*定义滑块颜色、内阴影及圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 7px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #e8e8e8;
}

/*定义两端按钮的样式*/
::-webkit-scrollbar-button {
  background-color: cyan;
}

/*定义右下角汇合处的样式*/
::-webkit-scrollbar-corner {
  background: khaki;
}
```

## input 的 placeholder 的字体样式

```css
input::-webkit-input-placeholder {
  color: red; /* Chrome/Opera/Safari */
}
input::-moz-placeholder {
  color: red; /* Firefox 19+ */
}
input:-ms-input-placeholder {
  color: red; /* IE 10+ */
}
input:-moz-placeholder {
  color: red; /* Firefox 18- */
}
```

## 文字超出省略号

```
.one_line{
    width:200rpx;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.two_line{
    word-break: break-all;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
```

## 文字自动换行

```
word-wrap: break-word;
word-break：break-all;
```

## 表格边框

```css
table,
tr,
td {
  border: 1px solid #333;
}
table {
  border-collapse: collapse;
}
```
