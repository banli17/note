module.exports = function loader(source) {
  // const options = this.getOptions();

  // source = source.replace(/\[name\]/g, options.name);

  // return `export default ${JSON.stringify(source)}`;

  this.emitFile("./test.txt", "hello world");
  this.emitWarning(new Error('警告'))
  return source;
};
