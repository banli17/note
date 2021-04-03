<template>
  <div>
    son1
    {{money}}
    <button @click="change(-1)" v-if="type==1">son1方式1消费</button>

    <button @click="change2" v-if="type==2">son1方式2消费</button>

    <br>
    <GrandSon></GrandSon>

    <!--    自定义 v-model -->
    <button @click="$emit('changex',200)" v-if="type==3">v-model测试</button>

    <button @click="$emit('update:money',200)" v-if="type==4">点击</button>
  </div>
</template>

<script>
import GrandSon from "./GrandSon";

export default {
    name: 'son1',
    model: {
        prop: 'money',
        event: 'changex'
    },
    components: {
        GrandSon
    },
    // props 两种写法
    // props: [],
    props: {
        type: Number,
        money: {
            type: Number,
            default: 20
        },
        change: {
            type: Function
        }
    },
    methods: {
        change2() {
            this.$emit('click', -1)
        }
    }
}
</script>
