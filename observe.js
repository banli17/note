function isObject(obj) {
  return Object.prototype.toString.call(obj) === "[object Object]";
}

// 深监听对象
function observe(obj, callback) {
  if (obj._isProxy) return obj;
  // 如果是数组，还需要重写 push 等方法
  if (Array.isArray(obj)) {
    const _this = this;
    if (!this.protoArr) {
      this.protoArr = [];
      [
        ("push", "unshift", "pop", "shift", "splice", "sort", "reverse"),
      ].forEach((key) => {
        const originFn = this.protoArr[key];
        this.protoArr[key] = function (...args) {
          observe(args, callback);
          originFn.call(this, ...args);
        };
      });
    }
    Reflect.setPrototypeOf(obj, this.protoArr);
  }

  if (isObject(obj) || Array.isArray(obj)) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        obj[key] = observe(obj[key], callback);
      }
    }
    Reflect.defineProperty(obj, "_isProxy", {
      value: true,
      enumerable: false,
    });
    obj = new Proxy(obj, {
      get: (target, key, receiver) => {
        return Reflect.get(target, key, receiver);
      },
      set: (target, key, value, receiver) => {
        value = observe(value, callback); // 如果有新增对象或数组数据，添加到监听
        let res = Reflect.set(target, key, value, receiver);
        callback && callback(key, value);
        return res;
      },
    });
  }
  return obj;
}

var a = {};
a = observe(a, function () {
  console.log("触发了");
});
// a.x = 1
// a.y = 2
a.c = [1, 2];
// a.c.push(1, 2)
a.c.reverse();

