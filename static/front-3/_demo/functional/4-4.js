var curry = function (fn) {
    var slice = Array.prototype.slice
    var args =  slice.call(arguments, 1)  // 保存参数
    console.log(args)

    return function(){
        var inargs = slice.call(arguments)
        return fn.apply(null, args.concat(inargs)) // 执行函数
    }
}


function add(x, y){
    return x + y
}

// var addCurry = curry(add(10, 11))
// var addCurry = curry(add(10))(11)
var addCurry = curry(add)(10, 11)

console.log(addCurry)
