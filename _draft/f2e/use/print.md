---
title: "网页打印知识总结"
date: 2017-06-10 13:41:40
tags:
---

## 总结

1. 不要使用绝对定位或固定定位，因为这样不方便修改布局。推荐使用流式布局，从上到下布局。
2. 使用媒体查询 `@media print` 控制打印样式。
3. 可以使用 `@page` 设置纸张大小。
4. 单位使用 pt，正常下 `1pt = 0.35146mm`，但是实际情况如下。
5. 我在实际项目中，出库单的纸张大小是 `241mm * 93mm`，我设置的内容大小是 `width: 600pt,height:250pt`。高度是正好对应93mm。换算下来正好是 `1pt = 0.372mm`，(我再打印的时候设置了打印边距为0。后来突然想到如果改为默认，可能1pt就是0.35146mm了，但是我没有测试)。
6. 针式打印机在连打时送纸有问题，打几张后就会出现多送纸的情况，导致打印错位。需要在电脑系统打印里设置纸张大小，然后在浏览器上选择对应的纸张。(具体看[针式打印机连续打印完多走纸解决办法](https://jingyan.baidu.com/article/46650658ca676df548e5f851.html))。
7. 通过在print里设置diplay:none 或 `visiblility:hidden` 让元素隐藏。

![](imgs/print.png)

```
.desk {
    position: relative;
    width: 600pt;
    height: 250pt;
    padding: 8pt 15pt 12pt;
    margin-left: 0;
    overflow: hidden;
}
@media print {
    .noprint {
        display: none;
    }

    @page {
        size:  241mm 93mm;
    }
}
```


## 资料

- [Chrome打印网页中的宽度控制](http://429006.com/article/technology/3549.htm)
- [pt、mm等单位换算工具](http://www.androidstar.cn/%E5%9C%A8%E7%BA%BF%E6%B5%8B%E8%AF%95%E5%B7%A5%E5%85%B7%E7%AE%B1/px-dp-sp-mm-pt-in%E5%9C%A8%E7%BA%BF%E8%BD%AC%E6%8D%A2%E8%AE%A1%E7%AE%97%E5%B7%A5%E5%85%B7/)
