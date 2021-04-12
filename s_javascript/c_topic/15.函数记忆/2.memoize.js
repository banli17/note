function memoize(f) {
    var cache = {};
    return function () {
        var key = arguments.length + Array.prototype.join.call(arguments, ",");
        if (key in cache) {
            return cache[key]
        }
        else {
            return cache[key] = f.apply(this, arguments)
        }
    }
}