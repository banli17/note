# 深拷贝与浅拷贝

## Vuex 中的 deepClone

在 vuex 源码中，有一个 deepClone 方法。

```js
export function deepCopy(obj, cache = []) {
  // 1. 如果值是基础类型
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  // 2. 循环引用，就停止拷贝，直接返回那个引用
  const hit = find(cache, (c) => c.original === obj);
  if (hit) {
    return hit.copy;
  }

  const copy = Array.isArray(obj) ? [] : {};
  // 3. 首先将 obj 放进缓存，因为要判断是否循环引用。
  cache.push({
    original: obj, // 原始值
    copy, // 拷贝的
  });

  // 4. 拷贝属性
  Object.keys(obj).forEach((key) => {
    copy[key] = deepCopy(obj[key], cache);
  });

  return copy;
}
```
