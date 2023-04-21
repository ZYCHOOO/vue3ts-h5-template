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
    component: () => import('@/views/home/home.vue'),
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () =>
          import('@/views/home/index.vue'),
        meta: { title: '首页', showNavbar: false }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () =>
      import('@/views/login/login.vue'),
    meta: { title: '登录', showNavbar: false }
  },
  {
    path: '/forgetPassword',
    name: 'ForgetPassword',
    component: () => import('@/views/login/forgetPassword.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

export default router