module.exports = function (source) {
  console.log("loader1 execution");

  return source + "/**loader1**/";
};

module.exports.pitch = function (remainingRequest, precedingRequest, data) {
  // remainingRequest /Users/banli/Desktop/course/course-fe-engineering/webpack-loader/loader2.js!/Users/banli/Desktop/course/course-fe-engineering/webpack-loader/loader3.js!/Users/banli/Desktop/course/course-fe-engineering/webpack-loader/src/name.txt
  // precedingRequest
  console.log("remainingRequest", remainingRequest);
  console.log("precedingRequest", precedingRequest);
  console.log("data", data);
};
