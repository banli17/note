<template>
  <div>
    grandSon
    <div>
      {{ parent.money }}
      <button @click="parent.change(10)">点击</button>
    </div>
    <button @click="$dispatch('eat', 'parent', 300)">孙子button dispatch</button>
  </div>
</template>

<script>
export default {
    inject: ['parent'],
    data() {
        return {}
    }
}
</script>
