<template>
  <div id="app">
    <Bar></Bar>
    <Foo></Foo>
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