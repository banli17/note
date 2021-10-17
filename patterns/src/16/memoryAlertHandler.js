const AlertHandler = require('./alertHandler')

class MemoryAlertHandler extends AlertHandler {
    constructor(...props) {
        super(...props)
    }

    check(statInfo) {
        console.log(this)
        if (statInfo.memory > this.rule.memory) {
            this.notify.warn('memory 爆了')
        } else {
            this.notify.info('memory 正常')
        }
    }
}
module.exports = MemoryAlertHandler