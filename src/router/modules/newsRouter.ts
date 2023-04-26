import { RouteRecordRaw } from "vue-router"

const routes: Array<RouteRecordRaw> = [
  {
    path: '/newsDetail/:id',
    name: 'NewsDetail',
    component: () => import('@/views/news/newsDetail.vue'),
    meta: { title: '新闻详情' }
  }
]

export default routes