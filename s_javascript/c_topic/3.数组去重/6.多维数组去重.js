var array = [1, 2, 1, [1, 1, 2], [3, 3, 4]];

function unique(array) {
    var res = [];
    for (var i = 0, len = array.length; i < len; i++) {
        var current = array[i];

        if (Array.isArray(array[i])) {
            res.push(unique(array[i]))
        } else if (res.indexOf(current) === -1) {
            res.push(current)
        }

    }
    return res;
}

console.log(unique(array)); // [1, 2, [1, 2], [3, 4]]
