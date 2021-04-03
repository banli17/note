<template>
    <div>
        foo {{$store.state.username}}
    </div>
</template>

<script>
export default {
    asyncData(store){ // 服务端执行 
        // 此方法 1） 必须放在页面级组件使用  2） 这个方法必须返回一个promise
        return store.dispatch('changeName');
    },  
    mounted(){ // 只在客户端执行
        // this.$store.dispatch("changeName");
    }
}
</script>

<style scoped>
    div{
        background: red;
    }
</style>


// 单元测试 
// 周日一天 ts
// 周三单元测试
// 周五 vue3 各种原理 响应式原理 + diff算法
// vue3 + ts实战