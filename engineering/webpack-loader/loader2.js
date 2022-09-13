module.exports = function(source){
  console.log('loader2 execution')
  return source + '/**loader2**/'
}

module.exports.pitch = function (remainingRequest, precedingRequest, data) {
  // 剩余的 loader request
  // /Users/banli/Desktop/course/course-fe-engineering/webpack-loader/loader3.js!/Users/banli/Desktop/course/course-fe-engineering/webpack-loader/src/name.txt
  console.log('remainingRequest', remainingRequest)
  // 前面的 request
  // /Users/banli/Desktop/course/course-fe-engineering/webpack-loader/loader1.js
  console.log('precedingRequest', precedingRequest)
  console.log('data', data)
};

// loader1.pitch loader2.pitch loader3.pitch -->
// loader1 loader2 loader3 <--
