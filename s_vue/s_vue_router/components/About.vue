<template>
  <div>
    about
    <router-link to="/about/a">abouta</router-link>
    <router-link to="/about/b">aboutb</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
    name: 'about'
}
</script>
