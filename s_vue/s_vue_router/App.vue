<template>
  <div id="app">
    <router-link to="/">home</router-link>
    <router-link to="/about">about</router-link>
    <router-view a="1"></router-view>
  </div>
</template>

<script>
export default {
    mounted() {
        console.log(this.$router)

        console.log('------this.$vnode-----')
        console.log(this.$vnode )
        console.log(this._vnode)
    }
}
</script>
