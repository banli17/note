const path = require('path')
const fs = require('fs')
const promisify = require('util').promisify
const stat = promisify(fs.stat)
const readdir = promisify(fs.readdir)
const Handlebars = require('handlebars')

const source = fs.readFileSync('./tpl/dir.tpl.html')
const template = Handlebars.compile(source.toString())

module.exports = async(req, res) => {
	const filePath = path.join(process.cwd(), req.url)
	try {
		const stats = await stat(filePath)
		if (stats.isFile(filePath)) {
			fs.createReadStream(filePath).pipe(res)
			return
		}
		if (stats.isDirectory(filePath)) {
			const files = await readdir(filePath)
			res.status = 200
			res.setHeader('Content-Type', 'text/html')
			// res.end(files.join(','))
			const data = {
				title: filePath,
				filePath,
				files: files.map(file=> {
					return {
						title: file
					}
				})
			}
			console.log(files)
			res.end(template(data))
		}
	} catch (ex) {
		res.status = 404
		res.setHeader('Content-Type', 'text/plain')
		res.end(`${filePath} not found`)
	}
}