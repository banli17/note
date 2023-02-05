// 全局同步或异步错误
process.on("uncaughtException", (err) => {
  console.log("uncaughtException", err);
});
// 全局 promise 错误
process.on("unhandledRejection", (err) => {
  console.log("unhandledRejection", err);
});

setTimeout(() => {
  throw Error("出错了2");
}, 1000);

Promise.reject("出错了1");
