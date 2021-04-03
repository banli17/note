---
title: "网页打印知识总结"
---

## 总结

1. 不要使用绝对定位或固定定位，因为这样不方便修改布局。推荐使用流式布局，从上到下布局。
2. 使用媒体查询`@media print`控制打印样式。
3. 可以使用 `@page` 设置纸张大小。
4. 长度单位使用 cm，文字大小单位使用 pt，换算是 9pt = 12px。
6. 针式打印机在连打时送纸有问题，打几张后就会出现多送纸的情况，导致打印错位。需要在电脑系统打印里设置纸张大小，然后在浏览器上选择对应的纸张。(具体看[针式打印机连续打印完多走纸解决办法](https://jingyan.baidu.com/article/46650658ca676df548e5f851.html))。
7. 通过在 print 里设置`diplay:none`或 `visiblility:hidden` 让不需要的元素隐藏。
8. 分页可以用 page-break-before: always;

![](/img/expr/print/print.png)

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

@page { size: A4 landscape; } 指定页面大小和方向

@page :left {
  margin-left: 3cm;
}
@page :right {
  margin-left: 4cm;
}

## 资料

- [Chrome打印网页中的宽度控制](http://429006.com/article/technology/3549.htm)
- [pt、mm等单位换算工具](http://www.androidstar.cn/%E5%9C%A8%E7%BA%BF%E6%B5%8B%E8%AF%95%E5%B7%A5%E5%85%B7%E7%AE%B1/px-dp-sp-mm-pt-in%E5%9C%A8%E7%BA%BF%E8%BD%AC%E6%8D%A2%E8%AE%A1%E7%AE%97%E5%B7%A5%E5%85%B7/)
- [Designing For Print With CSS](https://www.smashingmagazine.com/2015/01/designing-for-print-with-css/)