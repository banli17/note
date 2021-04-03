export function mapState(arr) {
    let obj = {}
    arr.forEach(key => {
        obj[key] = this.$store.state[key]
    })
    return obj
}

export function mapGetters(arr) {
    let obj = {}
    arr.forEach(key => {
        obj[key] = this.$store.getters[key]
    })
    return obj
}
