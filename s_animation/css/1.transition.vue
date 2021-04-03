<template>
  <div>
    <div class="box transition1"></div>
  </div>
</template>

<script>
export default {};
</script>


<style scoped>
.box {
  width: 100px;
  height: 100px;
  background: #f50;
  margin-bottom: 10px;
}
.box:hover {
  width: 200px;
  height: 300px;
}
.transition1 {
  transition: width 1s ease, height 5s 1s;
}
</style>
