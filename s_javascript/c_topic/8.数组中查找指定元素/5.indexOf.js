function createIndexOfFinder(dir) {
    return function(array, item){
        var length = array.length;
        var index = dir > 0 ? 0 : length - 1;
        for (; index >= 0 && index < length; index += dir) {
            if (array[index] === item) return index;
        }
        return -1;
    }
}

var indexOf = createIndexOfFinder(1);
var lastIndexOf = createIndexOfFinder(-1);

var result = indexOf([1, 2, 3, 4, 5], 2);

console.log(result) // 1
