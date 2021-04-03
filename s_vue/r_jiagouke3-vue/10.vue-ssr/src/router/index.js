import Vue from 'vue';
import VueRouter from 'vue-router';

import Foo from '../components/Foo.vue'

Vue.use(VueRouter);

// 目的为了服务端每次渲染 都可以调用此方法生成一个全新的路由实例

export default () => {
    const router = new VueRouter({
        mode: 'history',
        routes: [ // / Foo   /bar  Bar
            { path: '/', component: Foo },
            { path: '/bar', component: () => import( /* webpackChunkName: "group-bar" */ '../components/Bar.vue') }
        ]
    })
    return router;
}