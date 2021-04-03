<template>
  <div>
    <div style="border:1px solid red">
      <div class="box translate"></div>
    </div>
    <div style="border:1px solid red">
      <div class="box translate1"></div>
    </div>
    <div style="width:200px;height:200px;border:1px solid red;position:relative">
      <div class="box translate2"></div>
    </div>
    <div style="width:200px;height:200px;border:1px solid red;position:relative">
      <div class="box skewy"></div>
    </div>
    <div style="width:200px;height:200px;border:1px solid red;position:relative">
      <div class="box skewy skew-origin-left-top"></div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.box {
  width: 100px;
  height: 100px;
  background: #ccc;
  margin-bottom: 30px;
}
.translate {
  transform: translate(10px);
}
.translate1 {
  transform: translate(10px, 10px);
}
.translate2 {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.skewy {
  transform: skewY(10deg);
}

.skew-origin-left-top {
  transform-origin: 0px 0px;
}
</style>


