<template>
  <div>
    <div class="box1 box"></div>
    <div class="box2 box"></div>
  </div>
</template>

<script>
// const jQuery = require("jquery");
// const $ = jQuery;
import jQuery from "jquery";
window.jQuery = window.$ = jQuery;
import "velocity-animate/velocity.js";
export default {
  methods: {
    box1() {
      Velocity(
        $(".box1"),
        { opacity: 1, width: 300 },
        () => {
          console.log("动画结束了1");
        }
      );
    },
    box2() {
      $(".box2")[0].velocity(
        { opacity: 1, width: 300 },
        [250,15],
        () => {
          console.log("动画结束了2");
        }
      );
    }
  },
  mounted() {
    this.box1();
    this.box2();
  }
};
</script>

<style scoped>
.box {
  width: 100px;
  height: 100px;
}
.box1 {
  background: red;
}
.box2 {
  background: blue;
}
</style>
