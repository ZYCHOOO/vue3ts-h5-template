// router - intex.ts
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    redirect: '/home/index',
    component: () => import(/* webChunkName: 'hoome' */ '@/views/home/home.vue'),
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () =>
          import(/* webpackChunkName: 'home-index' */ '@/views/home/index.vue'),
        meta: { title: '首页', showNavbar: false }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () =>
      import(/* webpackChunkName: "login" */ '@/views/login/login.vue'),
    meta: { title: '登录', showNavbar: false }
  },
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

export default router