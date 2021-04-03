console.log("\u0061")  // a
console.log("\u0062")  // b
console.log("\uD842\uDFB7")  // b
console.log("\u20BB7")  // b
console.log("\u{20BB7}")  // b

console.log("\135")  // b

console.log(7 * 16 + 10)  // 122


console.log(0xFFFF)


var s = '𠮷a'
console.log(s.charAt(0))  // 乱码
console.log(s.charAt(1))
console.log(s.charCodeAt(0))  // 55362
console.log(s.charCodeAt(1))  // 57271
console.log(s.charCodeAt(2))  // 97
console.log(String.fromCharCode(134071))  // ஷ

console.log(s.codePointAt(0))  // 134071
console.log(s.codePointAt(1))  // 57271
console.log(s.codePointAt(2))  //97

console.log('--------')

function charCodeAt(str = '', index = 0) {
    let chars = []
    for (let ch of str) {
        chars.push(ch.codePointAt(0).toString(16))
    }
    return chars[index]
}

console.log(charCodeAt('𠮷a', 0))
console.log(charCodeAt('𠮷a', 1))

function is32Bit(c) {
    return c.codePointAt(0) > 0xFFFF;
}

is32Bit("𠮷") // true
is32Bit("a") // false

console.log(String.fromCodePoint(0x20BB7))
console.log(String.fromCodePoint(0x78, 0x1f680, 0x79) === 'x\uD83D\uDE80y')  //'x\uD83D\uDE80y'
