<template>
  <div id="app">
    age: {{age}} <br>
    {{$store.getters.doubleAge}} <br>
    {{$store.getters.doubleAge}} <br>
    {{$store.getters.doubleAge}} <br>
    {{$store.getters.doubleAge}} <br>
    <!--    {{$store.state.a.age}} <br>-->
    <button @click="$store.state.age = 13">修改</button>
    <button @click="$store.commit('syncSetAge', 10)">同步修改</button>
    <button @click="$store.dispatch('asyncSetAge', 5)">异步修改</button>
    <button @click="$store.dispatch('c/syncSetAge', 5)">namespace c修改</button>
  </div>
</template>
<script>
import {mapState} from 'vuex'

export default {
    name: 'App',
    computed: {
        age2: this.$store.getters.age,
        ...mapState(['age'])
    },
    mounted() {
        console.log(this.$store)
        console.log('this.$parent', this.$parent.$options.name)
    },
    components: {}
}
</script>

<style>

</style>
