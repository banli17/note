class Timeline {
    constructor() {
        this.animations = []
        this.requestID = null
        this.bindTick = this.tick.bind(this)

        this.pauseTime = null
        this.state = 'inited'
    }

    tick() {
        const t = Date.now() - this.startTime

        const animations = this.animations.filter(animation => !animation.finished)
        for (let animation of animations) {
            let { object, property, template, start, end, timingFunction, duration, delay, addTime } = animation
            let progression = timingFunction((t - delay - addTime) / duration) // 0-1 的数，百分比
            // 超出时间了
            if (t > duration + delay + addTime) {
                progression = 1
                animation.finished = true
            }
            // 根据进度获取值
            let value = animation.valueFromProgress(progression) // 当前的值
            object[property] = template(value)
        }
        if (animations.length) {
            this.requestID = requestAnimationFrame(this.bindTick)
        }
        // console.log('tick')
    }

    pause() {
        if (this.state !== 'playing')
            return

        if (this.requestID !== null) {
            this.state = 'paused'
            this.pauseTime = Date.now()
            cancelAnimationFrame(this.requestID)
            this.requestID = null
        }
    }

    resume() {
        if (this.state !== 'paused')
            return

        this.state = 'playing'
        this.startTime += Date.now() - this.pauseTime
        this.tick()
    }

    start() {
        if (this.state !== 'inited')
            return

        this.state = 'playing'
        this.startTime = Date.now()
        this.tick()
    }

    restart() {
        this.pause()
        this.animations = []
        this.requestID = null
        this.pauseTime = null

        this.start()
    }

    add(animation, addTime) {
        this.animations.push(animation)
        animation.finished = false

        if (this.state === 'playing') {
            // 立即添加到 timeline 中，让 box2 动起来
            animation.addTime = addTime !== void 0 ? addTime : Date.now() - this.startTime
        } else {
            // 0 表示立即追上， addTime 是添加的时间
            animation.addTime = addTime !== void 0 ? addTime : 0
        }
    }
}

class Animation {
    constructor(object, property, template, start, end, duration = 5000, delay = 0, timingFunction) {
        this.object = object
        this.property = property
        this.template = template
        this.start = start
        this.end = end
        this.duration = duration
        this.delay = delay
        this.timingFunction = timingFunction
        // || ((start, end) => {
        //     return (t) => {
        //         return start + (t / duration) * (end - start)
        //     }
        // });
    }
    valueFromProgress(progression) {
        return start + progression * (end - start)
    }
}

class ColorAnimation {

}
export { Timeline, Animation }