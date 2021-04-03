const fs = require('fs')
const path = require('path')

let res = []

function traversal(dir) {
    let files = fs.readdirSync(dir)
    files.forEach(file => {
        let filepath = path.join(dir, file)
        try {
            let stat = fs.statSync(filepath)
            if (stat.isDirectory()) {
                console.log('gg', filepath)
                traversal(filepath)
            } else {
                res.push(file)
            }
        } catch (e) {
            // link文件打不开
            if (e.code === 'ENOENT' && !!fs.readlinkSync(filepath)) {
                res.push(filepath)
            } else {
                console.error('err', error)
            }
        }
    })
    return res.map(file => path.basename(file))
}

traversal('../')

console.log(res)

console.log(path.basename('./1.转义字符.js'))