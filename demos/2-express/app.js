const express = require("express");
const app = express();

app.use((req, res, next) => {
  console.log("before next");
  next();
  console.log("after next");
});

app.get("/", (req, res, next) => {
  console.log("before handle /");
  res.send(`<h1>hello express!</h1>`);
  console.log("after handle /");
  throw new Error("出错了");
});

app.use((req, res, next) => {
  console.log("error0");
});

app.use(() => {
  console.log("before error");
});

app.use((req, res, next) => {
  console.log("error1");
});

app.listen(8080, (a, b) => {
  console.log("arguments", a, b);
});
