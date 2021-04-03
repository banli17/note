const reg = /a/g
const str = 'helloanihaoahia'

while (true) {
    let match = reg.exec(str)
    console.log(match, reg.lastIndex)
    if (!match) break
}

// [ 'a', index: 5, input: 'helloanihaoahia' ] 6
// [ 'a', index: 9, input: 'helloanihaoahia' ] 10
// [ 'a', index: 11, input: 'helloanihaoahia' ] 12
// [ 'a', index: 14, input: 'helloanihaoahia' ] 15
// null 0