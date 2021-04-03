<template>
  <div id="app">
 珠峰今年: {{$store.state.name}}
    {{$store.state.age}}

  我的年龄:{{ $store.getters.myAge}}

  <button @click="$store.state.name = 'ol'"></button>
  修改同步年龄  <button @click="$store.commit('changeAge',12)">修改年龄</button>
  修改异步年龄 <button @click="$store.dispatch('changeAge',5)">修 改年龄</button>  <br>
  ----------------------------- <br>

  <div>
  a: {{$store.state.a.name}} {{$store.state.a.age}}
   <br>----------------------------- <br>
  b: {{$store.state.b.name}}{{$store.state.b.age}}
  
  </div>
  </div>
</template>

<script>
// vue3 里面用不到辅助函数了 mapState mapMuatain mapActions....
export default {
  mounted(){
  }
}
</script>