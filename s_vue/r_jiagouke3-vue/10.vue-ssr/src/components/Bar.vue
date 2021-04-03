<template>
    <div>
        bar <button @click="show">显示</button>
    </div>
</template>

<script>
export default {
    methods:{
        show(){
            alert(1)
        }
    }
}
</script>