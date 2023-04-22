import router from '@/router'
import { storeToRefs } from 'pinia'
import { loginStore } from '@/store/login'
import { ROUTE_WHITE_LIST } from '@/constant/enums'

router.beforeEach((to: any, _from: any, next: any) => {
  const store = loginStore()
  const { token } = storeToRefs(store)
  const { name } = to
  const isInWhiteList = ROUTE_WHITE_LIST.includes(name);
  (token.value || isInWhiteList) ? next() : next({ name: 'Login' })
})
