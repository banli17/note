let a = {
  name: "hi",
};

setTimeout(() => {
  a.name = "hello";
});

module.exports = a;
