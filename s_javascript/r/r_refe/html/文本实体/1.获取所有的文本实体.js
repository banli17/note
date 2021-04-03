const fs = require('fs')
const fsPromise = fs.promises

async function readAll(fileList) {
    let tasks = fileList.map((file) => {
        return fsPromise.readFile(file)
    })
    return Promise.all(tasks).then(data => {
        let qs = []
        data.forEach((d) => {
            d.toString().replace(/(&#[\w\W]*?;)">/g, function (a, b) {
                qs.push(b)
            })
        })
        return qs
    })
}


let fileList = [
    './xhtml-lat1.ent',
    './xhtml-symbol.ent',
    './xhtml-special.ent'
]
readAll(fileList).then((data) => {
    console.log(data.length)
})