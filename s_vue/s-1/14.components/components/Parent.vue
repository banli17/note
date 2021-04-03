<template>
  <div>
    <h2># parent</h2>

    attrs: {{$attrs}}
    <br>
    listeners keys: {{Object.keys($listeners)}}
    <button @click="$listeners.eat">触发 listeners 里的 eat</button>
    <br>

    <h3>通信方式1: 通过属性和方法的传递，来触发父组件方法</h3>
    <Son1 :money="money" :change="change" :type="1" @eatson1="eatson1"></Son1>

    <h3>通信方式2: 子组件 $emit，来触发父组件方法</h3>
    <!--    @click 相当于 vm.$on("click", change) -->
    <!--  .native 会将事件绑定到组件的根元素上 -->
    <Son1 :money="money" @click="change" :type="2"></Son1>

    <h3>数据同步：v-model: 默认是 value @input 的语法糖</h3>
    <input type="text" v-model="money">
    <input type="text" :value="money" @input="val =>money = value">
    <!--    :value=money @input=value=>money=value -->
    <Son1 v-model="money" :type="3"></Son1>

    <h3>.sync 是 :xx 和 @update:xx 的语法糖</h3>
    <Son1 :money="money" @update:money="val=>money=val" :type="4"></Son1>
    <Son1 :money.sync="money" :type="4"></Son1>

    <h3>$dispatch 的调用</h3>

    <h3>slot</h3>
    <Son2>hello</Son2>
    <Son2>
      <template slot="header">header</template>
      <template slot="footer">footer</template>
      <template>使用父组件的数据：{{money}}</template>
      <template slot-scope="{money1}">使用子组件的数据：{{money1}}，如果子组件没有 money，则使用父组件的 {{money}}</template>

      <!--      新版本，v-slot 只能用在 template 或组件上 -->
<!--      v-slot 可以简写为 # ，如 #header，但必须有名字header-->
      <template v-slot:header="{money1}">你好，{{money1}}</template>
    </Son2>
  </div>
</template>

<script>
import Son1 from './Son1'
import Son2 from './Son2'

export default {
    name: 'parent',
    props: ['a'],
    // inheritAttrs: false,
    provide() {
        return {
            parent: this
        }
    },
    data() {
        return {
            money: 100
        }
    },
    methods: {
        change(value) {
            this.money += value
        },
        eatson1() {
            console.log('parent eatson1')
        }
    },
    mounted() {
        console.log(this.$options.name)
    },
    components: {
        Son1,
        Son2,
    }
}
</script>
