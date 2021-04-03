<template>
  <div>
    <slot name="header" money1="headermoney1"></slot>
    <div>son2</div>
    <slot name="footer"></slot>
    <!--    匿名插槽-->
    <slot :money1="200"></slot>
  </div>
</template>

<script>
export default {}
</script>
