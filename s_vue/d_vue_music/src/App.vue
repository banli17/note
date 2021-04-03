<template>
  <div id="app">
    <m-header></m-header>
    <router-view/>
  </div>
</template>

<script>
  import MHeader from 'components/m-header/m-header'

  export default {
    name: 'App',
    components: {
      MHeader
    }
  }
</script>

<style>

</style>
