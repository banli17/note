const {
  ConcatSource
} = require('webpack-sources')

class FooterPlugin {
  constructor(option) {
    console.log('FooterPlugin constructor: ', option);
    this.option = option
  }

  apply(compiler) {
    compiler.hooks.compilation.tap('FooterPlugin', compilation => {
      compilation.hooks.processAssets.tap('FooterPlugin', () => {
        for (const chunk of compilation.chunks) {
          for (const file of chunk.files) {
            console.log('file', file)
            const comment = `/* ${this.option.banner} */`
            compilation.updateAsset(file, old => new ConcatSource(old, '\n', comment))
          }
        }
      })
    })
  }
}

module.exports = FooterPlugin
