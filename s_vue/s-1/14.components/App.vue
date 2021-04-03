<template>
  <div id="app">
    <!--    parent.$on('eat') -->
    <Parent @eat="eat" :a="a" :b="b" :c="c"></Parent>

    <button @click="$broadcast('eatson1', 'son1', 90)">哈哈测试$broadcast</button>
  </div>
</template>

<script>
import Parent from './components/Parent'

export default {
    name: 'parent',
    data() {
        return {
            a: 1,
            b: 2,
            c: 3
        }
    },
    methods: {
        eat() {
            console.log('parent 里的 eat', this)
        }
    },
    mounted() {
        console.log(this.$options.name)
    },
    components: {
        Parent
    }
}
</script>
