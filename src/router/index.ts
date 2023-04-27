// router - intex.ts
import { storeToRefs } from 'pinia'
import { loginStore } from '@/store/login'
// append import
import newsRoutes from './modules/newsRouter'
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
      },
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('@/views/home/profile.vue'),
        meta: { title: '我的', showNavbar: false }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () =>
      import('@/views/login/login.vue'),
    meta: { title: '登录', showNavbar: false },
    beforeEnter: (_to: any, _from: any, next: any) => {
      const store = loginStore()
      const { token } = storeToRefs(store)
      token.value ? next('/') : next()
    }
  },
  {
    path: '/forgetPassword',
    name: 'ForgetPassword',
    component: () => import('@/views/login/forgetPassword.vue')
  },
  ...newsRoutes,
// append new router
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

export default router