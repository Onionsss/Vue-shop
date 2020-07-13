import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import { TOKEN } from "@/constant/Constant.js"

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/home',
        name: "Home",
        component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue'),
        redirect: '/welcome',
        children: [
            {
                path: '/welcome',
                name: 'welcome',
                component: () => import('../views/other/Welcome.vue'),
            },
            {
                path: '/users',
                name: 'users',
                component: () => import('../views/user/Users.vue'),
            }
        ]
    }

]

const router = new VueRouter({
    routes
})

//路由守卫
router.beforeEach((to, from, next) => {

    //如果是登录 放行
    if (to.path === "/login") return next();
    let token = sessionStorage.getItem(TOKEN)
    if(!token) return next("/login")
    next()
})

export default router
