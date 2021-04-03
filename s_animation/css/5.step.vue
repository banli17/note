<template>
  <div>
    <div class="box"></div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
@keyframes wave {
  0% {
    background-position: 0 0;
  }
  20% {
    background-position: -135px 0;
  }
}
.box {
  width: 135px;
  height: 135px;
  background: url("./5.1.png") no-repeat;
  background-position: 0 0;
  animation: wave steps(1, end) 3s infinite;
  /* animation: wave steps(1, start) 1s forwards infinite; */
}
</style>

