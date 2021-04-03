export default {
    name: 'routeLink',
    props: {
        to: {
            type: String
        },
        tag: {
            type: String,
            default: 'a'
        }
    },
    methods: {
        handler(to) {
            this.$router.push(to)
        }
    },
    render() {
        const {tag, to} = this
        // jsx 里需要用 {this.$slots } 插入插槽
        return <tag onClick={this.handler.bind(this, to)}>{this.$slots.default}</tag>
    }
}
