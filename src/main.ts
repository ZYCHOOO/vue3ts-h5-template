import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Vant from 'vant'
import 'vant/lib/index.css'
import { initMockServer } from '@/mock/index'
import { initEruda } from '@/utils/tools'
// 引入 pinia
import { createPinia } from 'pinia'
// 引入 pinia 数据持久化插件
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import 'virtual:svg-icons-register'
import installComponents from '@/components/index'
import '@/router/permission'

import '@/styles/index.less'

initMockServer()
initEruda()

const app = createApp(App)
installComponents(app)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app
  .use(Vant)
  .use(pinia)
  .use(router)
  .mount('#app')

