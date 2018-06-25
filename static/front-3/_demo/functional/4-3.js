var fnArr = function(fn){
    return function(arr){
        return arr.map(function(item){
            return fn(item)
        })
    }
}

var parseIntArr = fnArr(parseInt)
console.log(parseIntArr(['10', 2.0, 2.5]))  // [10,2,2]
