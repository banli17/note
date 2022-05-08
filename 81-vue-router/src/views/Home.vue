<template>
  <div>
    <div>Home content</div>
    <!-- <div>{{ vdata.num }}</div> -->
    <div>{{ Math.random() }}</div>
    <button @click="add">add</button>
  </div>
</template>

<script>
import Vue from "vue";
const vdata = Vue.observable({
  num: 1,
});
export default {
  created() {
    this.vdata = vdata;
  },
  methods: {
    add() {
      this.vdata.num++;
    },
  },
  updated() {
    console.log("updated");
  },
};
</script>
