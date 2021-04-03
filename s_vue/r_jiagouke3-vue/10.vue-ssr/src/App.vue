<template>
  <div id="app">
    <!-- 客户端渲染   history.pushState-->
    <router-link to="/" >foo</router-link>
    <router-link to="/bar">bar</router-link>

  <!-- 服务端渲染  对服务器发请求 -->
  <a href="/bar">服务端渲染</a>

    <router-view></router-view>
  </div>
</template>

<script>
import Bar from "./components/Bar.vue";
import Foo from "./components/Foo.vue";
export default {
  components: {
    Bar,
    Foo,
  },
};
</script>