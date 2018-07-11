# 列表

rn 中的列表相关的组件有下面几个：

- `ListView`
- `FlatList`
- `SectionList`
- `VirtualizedList`

## ListView

ListView 已经是要废弃了，因为它是在所有项都渲染完成后，才显示，而且显示条目太多会消耗大量性能，变的卡顿。

## FlatList

FlatList 和 SectionList 都是基于 VirtualizedList。它们是只显示可视区及其周围的内容，其它区域填充空白，因为渲染内容少，所以高性能。

支持的功能：

- 完全跨平台。
- 可选水平模式。
- 可配置的可见度回调。
- 标题支持。
- 页脚支持。
- 分隔支持。
- 拉到刷新。
- 滚动加载。
- ScrollToIndex支持。
