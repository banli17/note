const { series, parallel } = require("gulp");

exports.foo = (done) => {
  console.log("foo task working~");
  done();
};

const task1 = (done) => {
  console.log("task1 working~");
  setTimeout(() => {
    done();
  }, 1000);
};
const task2 = (done) => {
  console.log("task2 working~");
  done();
};
const task3 = (done) => {
  console.log("task3 working~");
  done();
};

exports.stask = series(task1, task2, task3);
exports.ptask = parallel(task1, task2, task3);

exports.asyncTask1 = () => {
  console.log("async task1 working");
  return Promise.resolve();
};

exports.asyncTask2 = async () => {
  console.log("async task2 working");
  // return 11; //Promise.resolve();
};

const fs = require("fs");

const { src, dest } = require("gulp");

exports.fstask1 = () => {
  return src("src/*.css").pipe(dest("dist"));
};

const { Transform } = require("stream");
exports.fstask2 = () => {
  const read = fs.createReadStream("src/index.css");
  const write = fs.createWriteStream("dist/index.css");
  const minify = new Transform({
    transform: (chunk, encoding, callback) => {
      const input = chunk.toString();
      const output = input.replace(/\s+/g, "");
      callback(null, output);
    },
  });
  read.pipe(minify).pipe(write);
  return read;
};
