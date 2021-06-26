import Button from './components/button'
import Message from './components/message'
const components = {
  Button,
  ButtonGroup: Button.ButtonGroup,
}

const iview = {
  ...components,
  iButton: Button
}

function install(Vue) {
  // Vue.use(plugin) 会给 plugin 增加 .installed 属性 true
  if (install.installed) return

  Object.keys(iview).forEach(key => {
    Vue.component(key, iview[key])
  })

  Vue.prototype.$IVIEW = {
  }

  Vue.prototype.$Message = Message
}

const API = {
  version: process.env.VERSION,
  install,
  ...components,
}

export default API
