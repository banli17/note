(function () {
  var a = 1

  window._Module = {
    a,
    getA() {
      return a
    }
  }
})();

const m = window._Module

m.a = 2

console.log(m.a); // 2
console.log(m.getA()); // 1, 不会改变闭包里的 a, 值复制, 改变的是 window._Module 的 a, common js 也是这样
