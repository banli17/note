const b = require("./b");

console.log(b.name); // hi

setTimeout(() => {
  console.log(b.name); // hello
});
