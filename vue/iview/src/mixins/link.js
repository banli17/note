import { oneOf } from '../utils/assist'

export default {
  props: {
    to: {
      type: [Object, String]
    },
    replace: {
      type: Boolean,
      default: false
    },
    target: {
      type: String,
      validator(value) {
        return oneOf(value, ['_blank', '_self', '_parent', '_top'])
      },
      default: '_self'
    },
    append: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    linkUrl() {
      const type = typeof this.to
      if (type !== 'string') {
        return null
      }
      if (this.to.includes('//')) {
        return this.to
      }
      const router = this.$router
      if (router) {
        const current = this.$route
        const route = router.resolve(this.to, current, this.append)
        return route ? route.href : this.to
      }
      return this.to
    },
  },
  methods: {
    handleOpenTo() {
      const router = this.$router
      let to = this.to
      if (router) {
        // 拼接出 to
        const current = this.$router
        const route = router.resolve(this.to, current, this.append)
        to = route ? route.href : this.to
      }
      window.open(to)
    },
    handleClick(new_window = false) {
      const router = this.$router
      if (new_window) {
        this.handleOpenTo()
      } else {
        if (router) {
          if (typeof this.to === 'string' && this.to.includes('//')) {
            window.location.href = this.to
          } else {
            this.replace ? this.$router.replace(this.to, () => { })
              : this.$router.push(this.to, () => { })
          }
        } else {
          window.location.href = this.to
        }
      }
    },
    handleCheckClick(event, new_window = false) {
      if (this.to) {
        // 如果写了 target 是新窗口打开
        if (this.target === '_blank') {
          this.handleOpenTo()
          return false  // 阻止默认 _blank 行为 和冒泡
        } else {
          event.preventDefault() // 阻止默认行为
          this.handleClick(new_window)
        }
      }
    }
  }
}
