function makeRandom(seed) {
    return function () {
        seed = (seed + 0.125) % 1.0
        return seed
    }
}
console.log(Date.now());

let random = makeRandom(Date.now() * Math.pow(10, -13))
for (let i = 0; i < 100; i++) {
    console.log(parseFloat(process.hrtime.bigint().toString()) % 9999);
}

