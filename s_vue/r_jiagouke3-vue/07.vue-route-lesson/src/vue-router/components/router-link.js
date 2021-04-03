export default {
    name:'router-link',
    props:{
        to:{
            type:String,
            required:true
        },
        tag:{
            type:String,
            default:'a'
        }
    },
    render(h){ // _c
        let tag = this.tag;

        return <tag onClick={()=>{
            this.$router.push(this.to); // this指向当前组件实例
        }}>{this.$slots.default}</tag>; // jsx 会被编译成js语法
        // return h(this.tag,{},this.$slots.default + 'ok')
    }
}
// https://cn.vuejs.org/v2/guide/render-function.html