# table表格

## 属性(5个)

**`border-collapse`**

`border-collapse` 表示表格的边框是否合并。默认情况下，`table`，`tr`,`td`，`th` 都是有各自的边框的，设置这个属性值为 `collapse` 后，相邻的边框会合并为一条。

另外设置为 `collapse` 后，会忽略 `border-spacing` 和 `empty-cells` 属性。

```
border-collapse: collapse / separate
```

当给 `tr` 设置 `border` 时，发现没有生效，这个时候，需要设置 `border-collapse:collapse`。

**`border-spacing`**

`border-spacing` 设置相邻单元格边框间距，（只有当border-collapse:separate时有效）。

```
border-spacing: length length;  // 水平 垂直间距
```

尽管它是设置在 `table` 上，但是 `table` 里的所有元素都会继承。

**`caption-side`**

`caption-side` 设置表头的位置，可以设置为 `top` 或 `bottom`。

**`empty-cells`**

`empty-cells` 规定是否显示表格中的空单元格上的边框和背景。可选值是 `show` 和 `hide`。

**`table-layout`**

`table-layout` 用于设置表格的布局算法，可选值是：automatic 和 fixed。

默认是`automatic`，自动表格布局。列的宽度是由单元格中没有换行的最宽内容决定。这个算法会当表格内容全部加载完才显示。

`fixed`是固定表格布局。它直接按设置的宽度渲染，不考虑单元格的内容。第一行加载完就显示。


## 不要使用的属性

样式直接用css就可以控制了，不要再使用下面的属性。

- border
- cellpadding
- cellspacing
- rules：内侧边框的那部分是可见的
- summary：表格摘要
- width
- frame：外侧边框显示哪些是可见的