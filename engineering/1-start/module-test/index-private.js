window._Module = {
  x: 1
}

const m = window._Module

m.x = 2
console.log(m.x); // 数据封装性不好, 外部可以改
