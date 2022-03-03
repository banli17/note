# es


## es11

### 可选链

### 空值合并运算法

?? 运算法只有前者为 undefined 或 null 时, 才会读后面的值。

```
const b = 0
const a = b || 5
// a = 5

const b = 0
const a = b ?? 5
// a = 0
```

