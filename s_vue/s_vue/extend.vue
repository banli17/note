<template>
  <div class="msg">
    {{msg}}
  </div>
</template>

<script>
export default {
    data() {
        return {
            msg: 'hello'
        }
    }
}
</script>

<style>
.msg {
  color: red;
  background: blue;
}
</style>
