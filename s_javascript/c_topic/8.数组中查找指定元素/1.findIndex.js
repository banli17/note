function isBigEnough(element) {
    return element >= 15;
}

let index = [12, 5, 8, 130, 44].findIndex(isBigEnough);  // 3
console.log(index)


