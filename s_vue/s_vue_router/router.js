import Vue from 'vue'
import VueRouter from "./vue-router";
import Home from './components/Home'
import About from './components/About'
import AboutA from './components/AboutA'
import AboutB from './components/AboutB'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'hash',
    routes: [
        {
            path: '/',
            component: Home
        },
        {
            path: '/about',
            component: About,
            children: [
                {
                    path: 'a',
                    component: AboutA,
                    children: [
                        {
                            path: 'a2',
                            component: AboutA
                        }
                    ]
                },
                {
                    path: 'b',
                    component: AboutB
                },
            ]
        }
    ]
})

router.matcher.addRoutes([{
    path: '/about',
    component: About,
    children: [
        {
            path: 'c',
            component: AboutB
        }
    ]
}])

router.beforeEach((to, from, next) => {
    console.log(1)
    next()
})

router.beforeEach((to, from, next) => {
    console.log(2)
    setTimeout(() => {
        next()
    }, 1000)
})

export default router
