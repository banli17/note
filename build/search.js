var fs = require('fs')
var path = require('path')

class Search {
    constructor(dirname) {
        this.dirname = path.join(__dirname, dirname)
        this.allMd = {}
    }

    init() {
        this.getAllMd(this.dirname)
        this.outputJson()
    }

    outputJson() {
        fs.writeFile(path.join(__dirname,'../static/search.json'), JSON.stringify(this.allMd), function (err, data) {
            if (err) {
                throw err
            }else{
                console.log('search.json 写入文件成功')
            }
        })
    }

    // 递归遍历目录下所有的.md文件
    getAllMd(dirname) {
        var data = fs.readdirSync(dirname)
        data.map(item => {
            var filePath = path.join(dirname, item)
            var stats = fs.statSync(filePath)
            var isMd = stats.isFile() && /\.md$/.test(filePath)
            var isDir = stats.isDirectory()

            if (isMd) {
                var fileData = fs.readFileSync(filePath, 'utf8')
                var title = fileData.match(/^.+?\n/)
                if (title) {
                    var url = filePath.replace(path.join(__dirname, 'static'), '').replace(/\.md$/, '').replace(/\\/g, '/')
                    this.allMd[url] = {
                        title: encodeURIComponent(title).replace(/^%23/, '').trim(),
                        content: encodeURIComponent(fileData),
                        url: url
                    }
                }
            } else if (isDir) {
                this.getAllMd(filePath)
            }
        })
    }
}

var search = new Search('../static')
search.init()
