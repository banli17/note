---
title: "vue项目开发规范"
date: 2017-10-13 17:59:45
tags:
---

## 命名

**1. 关于组件**

- .vue文件：全部采用PascalCase (单词首字母大写命名)
- HTML模板、components中，采用 kebab-case (短横线分隔命名)

```
// ok
ProductList.vue

// error
productList.vue
product-list.vue

// ok
<product-list></product-list>

// error
<productList></productList>
<ProductList></ProductList>

// ok
components: {
  'product-list': { /* ... */ }
}

// error
components: {
  productList: { /* ... */ },
}
components: {
  ProductList: { /* ... */ },
}

根实例
└─ TodoList
   ├─ TodoItem
   │  ├─ DeleteTodoButton
   │  └─ EditTodoButton
   └─ TodoListFooter
      ├─ ClearTodosButton
      └─ TodoListStatistics
```
