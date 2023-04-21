import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Vant from 'vant'
import 'vant/lib/index.css'
// 引入 pinia
import { createPinia } from 'pinia'
// 引入 pinia 数据持久化插件
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app
  .use(Vant)
  .use(pinia)
  .use(router)
  .mount('#app')

