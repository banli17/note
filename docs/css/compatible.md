# 兼容性问题

## line-height android 不居中

## css reset

http://meyerweb.com/eric/tools/css/reset/

## 多行文字显示几行

文本超出 ...，只是 firefox 上文字会被截断。

```css
.box {
    white-space: nowrap;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    overflow: hidden;
}
```

```css
.box(@n) {
    display: -webkit-box;
    -webkit-line-clamp: @n;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
```

-   [关于文字内容溢出用点点点(…)省略号表示](https://www.zhangxinxu.com/wordpress/2009/09/%e5%85%b3%e4%ba%8e%e6%96%87%e5%ad%97%e5%86%85%e5%ae%b9%e6%ba%a2%e5%87%ba%e7%94%a8%e7%82%b9%e7%82%b9%e7%82%b9-%e7%9c%81%e7%95%a5%e5%8f%b7%e8%a1%a8%e7%a4%ba/)

## 滚动条隐藏

```
&::-webkit-scrollbar {
    display: none;
}
```

1. vivo banner 没有显示，加个 width:100% 可以
2. iphone 6p 10 系统，卡片商品名称内容不显示，
