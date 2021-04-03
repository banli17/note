const v8 = require('v8')

// v8.setFlagsFromString('--trace_gc');
// setTimeout(function() { v8.setFlagsFromString('--notrace_gc'); }, 10000);  // 60e3

console.log(v8.getHeapStatistics())  // 获取 heap 信息
console.log(v8.getHeapSpaceStatistics())  // 获取 heap space 信息
