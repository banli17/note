module.exports = function (source) {
  console.log(source)
  console.log("loader3 execution");
  return source + '/**loader3**/'
};
