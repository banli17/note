let name = '板栗17'

const zeroPad = num => (num + '').padStart(8, 0)
// 1. 将名字转为二进制
function textToBinary(text) {
    return text.split('').map(char => {
        return zeroPad(char.charCodeAt(0).toString(2))
    }).join(' ')
}

const binaryToZeroWidth = binary => (
    binary.split('').map(binaryNum => {
        const num = parseInt(binaryNum, 10)
        if (num === 1) {
            return 'U+200B'   // U+200B
        } else if (num === 0) {
            return 'U+200C'
        }
        return 'U+200D'
    }).join('U+FEFF')
)



const zeroWidthToBinary = string => {
    console.log(string.split(''))
    return string.split('').map(char => {
        if(char === 'U+200B') return 1
        if(char === 'U+200C') return 0
        return ' '
    }).join('')
}

console.log(zeroWidthToBinary(binaryToZeroWidth(textToBinary(name))))