📱⚡️ 基于 vite4 + Vue3.2 + TypeScript + pinia + mock + less + vantUI + viewport 适配 + axios 封装的移动端基础模版

## 前言
* vue-cli 移动端模版地址：https://github.com/ZYCHOOO/vue3-h5-template
* vite-vue 移动端模版地址：https://github.com/ZYCHOOO/vue3ts-h5-template
* 想试着用下 vite 和 ts，增加一下知识储备，利用空余时间对先前的 vue-cli 移动端模版进行重构，不得不说 vite 真的很香，速度提升了好多👍

> Vite（法语意为 "快速的"，发音 /vit/，发音同 "veet"）是一种新型前端构建工具，能够显著提升前端开发体验。它主要由两部分组成：一个开发服务器，它基于 原生 ES 模块 提供了 丰富的内建功能，如速度快到惊人的 模块热更新（HMR）;一套构建指令，它使用 Rollup 打包你的代码，并且它是预配置的，可输出用于生产环境的高度优化过的静态资源。

### 开发启动速度对比
- vue-cli

![vue-cli开发启动速度.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2f21f3bf74704975a910d5494d46bef8~tplv-k3u1fbpfcp-watermark.image?)

- vite-vue

![vite-vue开发启动速度.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0a273e8fdc154b7084091a268701d790~tplv-k3u1fbpfcp-watermark.image?)


## 项目介绍

### 项目安装&启动
```bash
git clone https://github.com/ZYCHOOO/vue3ts-h5-template.git

cd vue3ts-h5-template

npm install

npm run dev
```

## <span id="catalogue">目录</span>

- [环境变量配置](#env)
- [viewport 适配](#viewport)
- [全局 less 样式](#less)
- [适配苹果底部安全距离](#phonex)
- [proxy 跨域配置](#proxy)
- [使用 mock 数据](#mock)
- [axios 封装及接口拦截](#axios)
- [pinia 使用](#pinia)
- [vue-router](#router)
- [plop 自动化](#plop)
- [内置组件](#components)


### <span id="env">⚙️ 环境变量配置</span>

`package.json` 里的 `scripts` 配置 `dev` `staging` `production`，通过 `--mode xxx` 来执行不同环境

- 通过`npm run dev`执行`vite`
- 通过`npm run build`执行`vue-tsc && vite build`
- 通过`npm run staging`执行`vite --mode staging`
- 通过`npm run production`执行`vite --mode production`

```javascript
  "scripts": {
    "plop": "plop",
    "dev": "vite",
    "build": "vue-tsc && vite build",
    "preview": "vite preview",
    "staging": "vite --mode staging",
    "production": "vite --mode production"
  },
```

#### 环境变量

- 在`.env.xxx`文件中，变量命名必须要以`VITE_`开头
- 在项目中通过 `import.meta.env` 获取

[🔙 返回顶部](#catalogue)

### <span id="viewport">⚙️ viewport 适配</span>

- postcss-px-to-viewport 文档： <https://github.com/evrone/postcss-px-to-viewport/blob/master/README_CN.md>

```
npm i -D postcss-px-to-viewport autoprefixer
```

```javascript
module.exports = {
  plugins: {
    // 用来给不同的浏览器自动添加相应前缀，如-webkit-，-moz-等等
    autoprefixer: {
      overrideBrowserslist: ['Android 4.1', 'iOS 7.1', 'Chrome > 31', 'ff > 31', 'ie >= 8']
    },
    'postcss-px-to-viewport': {
      unitToConvert: 'px', // 要转化的单位
      viewportWidth: 375, // UI设计稿的宽度
      unitPrecision: 6, // 转换后的精度，即小数点位数
      propList: ['*'], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
      viewportUnit: 'vw', // 指定需要转换成的视窗单位，默认vw
      fontViewportUnit: 'vw', // 指定字体需要转换成的视窗单位，默认vw
      selectorBlackList: ['wrap'], // 指定不转换为视窗单位的类名，
      minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
      mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
      replace: true, // 是否转换后直接更换属性值
      exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配
      landscape: false // 是否处理横屏情况
    }
  }
}
```

[🔙 返回顶部](#catalogue)

### <span id="less">⚙️ 全局 less 样式</span>

vue 的思想就是组件化，在每个`.vue`页面的样式要想独立开来，可以添加 scoped 属性，使当前样式只能在当前 vue 文件中生效，使各个组件的样式互不污染。

```css
  <style lang="less">
    /** global style */
  </style>
  <style lang="less" scoped>
    /** local style */
  </style>
```

#### 目录结构

vue3ts-h5-template 所有全局样式都在`@/styles`目录下设置

```
│  ├─ styles ---------------- 项目样式
│     ├─ components	--------- 组件样式
│     ├─ views -------------- 页面样式
│     ├─ index.less ---------- 全局通用样式
│     ├─ mixins.less	--------- 全局mixins样式
│     └─ variables.less ------ css变量
```

`vite.config.ts`添加全局样式配置

```javascript
  css: {
    // css 预处理器
    preprocessorOptions: {
      // provide global variables
      less: {
        additionalData: `
          @import "@/styles/mixins.less";
          @import "@/styles/variables.less";
        `
      }
    }
  }
```

#### 全局 mixins 样式

在`mixins.less`中写好了常用的样式，如 flex 布局的上下左右居中，超出宽度省略等

```less
.flex-row {
  display: flex;
  flex-direction: row;
}

.flex-column {
  display: flex;
  flex-direction: column;
}

.flex-wrap {
  display: flex;
  flex-wrap: wrap;
}

.flex-align-center {
  display: flex;
  align-items: center;
}

.flex-justify-center {
  display: flex;
  justify-content: center;
}

.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

// 单行省略
.ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

// 多行省略
.multiline-ellipsis(@lineNum) {
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: @lineNum;
  -webkit-box-orient: vertical;
}
```

[🔙 返回顶部](#catalogue)

### <span id="phonex">⚙️ 适配苹果底部安全距离</span>

在`index.html`的 meta 中添加`viewport-fit=cover`

#### vant 自带安全区适配

[底部指示条的适配](https://vant-contrib.gitee.io/vant/#/zh-CN/advanced-usage#di-bu-an-quan-qu-gua-pei)

Vant 中部分组件提供了 safe-area-inset-top 或 safe-area-inset-bottom 属性，设置该属性后，即可在对应的机型上开启适配

```html
<!-- 在 head 标签中添加 meta 标签，并设置 viewport-fit=cover 值 -->
<meta
  name="viewport"
  content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, viewport-fit=cover"
/>

<!-- 开启顶部安全区适配 -->
<van-nav-bar safe-area-inset-top />

<!-- 开启底部安全区适配 -->
<van-number-keyboard safe-area-inset-bottom />
```

#### 全局 mixins 样式

在`mixins.less`中有写好的样式，可直接用

```less
// 底部安全区域适配
.bottom-safe-area {
  padding-bottom: constant(safe-area-inset-bottom); /*兼容 IOS<11.2*/
  padding-bottom: env(safe-area-inset-bottom); /*兼容 IOS>11.2*/
}
```

[🔙 返回顶部](#catalogue)

### <span id="proxy">⚙️ proxy 跨域配置</span>

在`vite.config.ts`的 proxy 中配置相应参数

```typescript
  server: {
    proxy: {
      '/api': { // 匹配请求路径，
        target: 'http://v.juhe.cn/toutiao', // 代理的目标地址
        // 开发模式，默认的127.0.0.1,开启后代理服务会把origin修改为目标地址
        changeOrigin: true,
        // secure: true, // 是否https接口
        // ws: true, // 是否代理websockets

        // 路径重写，**** 如果你的后端有统一前缀(如:/api)，就不开启；没有就开启
        //简单来说，就是是否改路径 加某些东西
        rewrite: (path) => path.replace(/^\/api/, '')
      },
    }
  },
```

[🔙 返回顶部](#catalogue)

### <span id="mock">⚙️ 使用 mock 数据</span>

mock 请求的封装采用的是[vue-element-admin 的 mock 请求封装](https://panjiachen.github.io/vue-element-admin-site/zh/guide/essentials/mock-api.html#swagger)

- index.js

```javascript
import Mock from 'mockjs'
import { getEnvValue } from '@/utils/index'
import login from './login'

const mocks = [...login]
function mockXHR() {
  Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
  Mock.XHR.prototype.send = function () {
    if (this.custom.xhr) {
      this.custom.xhr.withCredentials = this.withCredentials || false

      if (this.responseType) {
        this.custom.xhr.responseType = this.responseType
      }
    }
    this.proxy_send(...arguments)
  }

  function XHR2ExpressReqWrap(respond) {
    return function (options) {
      let result = null
      if (respond instanceof Function) {
        const { body, type, url } = options
        result = respond({
          method: type,
          body: JSON.parse(body),
          query: url
        })
      } else {
        result = respond
      }
      return Mock.mock(result)
    }
  }

  for (const i of mocks) {
    Mock.mock(
      new RegExp(i.url),
      i.type || 'get',
      XHR2ExpressReqWrap(i.response)
    )
  }
}

export function initMockServer () {
  const NEED_MOCK = getEnvValue('VITE_APP_NEED_MOCK')
  if (NEED_MOCK === 'true') {
    mockXHR()
  }
}
```

- login.js

```javascript
import { getQueryString } from '@/utils/index'

const tokens = {
  admin: { token: 'admin-token' },
  editor: { token: 'editor-token' }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: '超级管理员',
    gender: 1,
    mobile: '13500000000'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor',
    gender: 2,
    mobile: '13700000000'
  }
}

export default [
  // user login
  {
    url: '/user/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username]

      // mock error
      if (!token) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.'
        }
      }

      return {
        code: 200,
        data: token
      }
    }
  },

  // get user pofile
  {
    // eslint-disable-next-line no-useless-escape
    url: '/user/profile\.*',
    type: 'get',
    response: config => {
      const token = getQueryString(config.query, 'token')
      const info = users[token]

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 200,
        data: info
      }
    }
  },

  // user logout
  {
    url: '/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 200,
        data: 'success'
      }
    }
  }
]
```

在`main.ts`中引入 initMockServer，根据`.env.*`文件中的`VITE_NEED_MOCK`参数来判断是否用 mock 数据

```typescript
import { initMockServer } from '@/mock/index'
initMockServer()
```

[🔙 返回顶部](#catalogue)

### <span id="axios">⚙️ axios 封装及接口拦截</span>

- httpEnums.js

  `constant/httpEnums.js`内含有 http 相应状态码、状态码、白名单的枚举

```javascript
export default {
  // http响应状态码
  HTTP_STATUS: {
    // 1xx，临时响应
    TEMP_RESPOND: {
      Continue: 100, // 服务器通知浏览器之前一切正常，请客户端继续请求，如果请求结束，可忽略
      SwitchingProtocal: 101 // 针对请求头的Upgrade返回的信息。表明服务器正在切换到指定的协议
    },
    // 2xx，成功
    SUCCESS: {
      Ok: 200, // 请求成功
      Created: 201, // 常用于POST，PUT 请求，表明请求已经成功，并新建了一个资源。并在响应体中返回路径
      Accepted: 202, // 请求已经接收到，但没有响应，稍后也不会返回一个异步请求结果。 该状态码适用于等待其他进程处理或者批处理的场景
      NoAuthoritativeInformation: 203, // 表明响应返回的元信息（meta-infomation）和最初的服务器不同，而是从本地或者第三方获取的
      NoContent: 204, // 请求没有数据返回，但是头信息有用。用户代理(浏览器)会更新缓存的头信息
      ResetContent: 205, // 告诉用户代理（浏览器）重置发送该请求的文档
      ParticalContent: 206 // 客户端使用Range请求头时，返回该状态码
    },
    // 3xx，重定向
    REDIRECT: {
      MultipleChoice: 300, // 返回多个响应，需要浏览器或者用户选择
      MovedPermanently: 301, // 请求资源的URL被永久的改变，新的URL会在响应的Location中给出。浏览器到新的URL重新请求资源，因为有些客户端会把请求方式method改成GET。所以该状态码建议GET和HEAD方法中使用。搜索引擎会更新地址到资源的链接（SEO中‘link-judge’被发送到新的URL）
      Found: 302, // 请求资源的URL被暂时修改到Location提供的URL。未来可能还会有新的修改。览器会根据新的URL重新请求资源。有些客户端会把方法method改为GET，建议在GET和HEAD方法中使用。搜索引擎不会更改URL到资源的。
      SeeOther: 303, // 服务通过返回的响应数据指导客户端通过GET方法去另一个URL获取资源。通常用于POST或者PUT的请求返回结果，重定向到信息提示页面或者进度展示页面。重定向页面的方法是GET方法。
      NotModified: 304, // 资源未变更。服务器根据请求头判断，需要资源未修改，只返回响应头；否则将资源一起返回。
      TemporaryRedirect: 307, // 临时重定向。基本和302相同。唯一的区别是这个状态码严格禁止浏览器到新URL请求资源时修改原来的请求方式和请求体。
      PermanentRedirect: 308 // 永久重定向。基本和301相同。但是严格禁止修改请求方式和请求体。
    },
    // 4xx，请求错误
    REQUEST_ERROR: {
      BadRequest: 400, // 请求语法有问题，服务器无法识别。
      UnAuthorized: 401, // 客户端未授权该请求。缺乏有效的身份认证凭证，一般可能是未登陆。登陆后一般都解决问题。
      Forbidden: 403, // 服务器拒绝响应。权限不足。
      NotFound: 404, // URL无效或者URL有效但是没有资源。
      MethodNotAllowed: 405, // 请求方式Method不允许。但是GET和HEAD属于强制方式，不能返回这个状态码。
      NotAccepted: 406, // 资源类型不符合服务器要求。
      ProxyAuthorizationRequired: 407, //  需要代理授权。
      RequestTimeout: 408, // 服务器将不再使用的连接关闭。响应头会有Connection: close。
      UpgradeRequired: 426 // 告诉客户端需要升级通信协议。
    },
    // 5xx，服务器错误
    SERVER_ERROR: {
      InternalServerError: 500, // 服务器内部错误，未捕获。
      BadGateway: 502, // 服务器作为网关使用时，收到上游服务器返回的无效响应。
      ServiceUnavailable: 503, // 无法服务。一般发生在因维护而停机或者服务过载。一般还会伴随着返回一个响应头Retry-After: 说明恢复服务的估计时间。
      GateTimeout: 504, // 网关超时。服务器作为网关或者代理，不能及时从上游服务器获取响应返回给客户端。
      HttpVersionNotSupported: 505 // 发出的请求http版本服务器不支持。如果请求通过http2发送，服务器不支持http2.0，就会返回该状态码。
    }
  },
  // http状态码
  CODES: {
    Success: 200,
    UnAuthorized: 401
  },
  // http状态码白名单，在具体业务中处理
  ERRCODE_WHITE_LIST: []
}
```

- request.ts

  `utils/request.ts` 封装了 axios，开发者需要根据后台接口做修改

```typescript
import axios from 'axios'
import { storeToRefs } from 'pinia'
import { loginStore } from '@/store/login'
import { showNotify } from 'vant'
import httpEnums from '@/constant/httpEnums'
import { getEnvValue } from '@/utils/index'

// create an axios instance
const request = axios.create({
  baseURL: getEnvValue('VITE_APP_BASE_API'),
  timeout: 10000
})

const requestArr = [request]

// 一段时间内的提示显示的防抖，防抖时间设置为5秒
let errMsgDebounceTimer: any = null
const errMsgDebounceWait = 5000

requestArr.forEach((service) => {
  const store = loginStore()
  const { token } = storeToRefs(store)
  // request interceptor
  service.interceptors.request.use(
    async (config) => {
      if (token.value) {
        config.headers.Authorization = `Bearer ${token.value}`
      }
      return config
    },
    (error) => {
      // do something with request error
      console.log(error) // for debug
      return Promise.reject(error)
    }
  )

  // response interceptor
  service.interceptors.response.use(
    async (response) => {
      const res = response.data
      const statusCode = res.code || response.status

      // blob文件流
      if (res instanceof Blob) {
        return res
      }

      // 成功
      if (statusCode === httpEnums.CODES.Success) {
        return res
      }

      // token失效
      if (statusCode === httpEnums.CODES.UnAuthorized) {
        return Promise.reject(new Error('token过期！'))
      }

      const errMsg = res.message || res.msg

      showNotify({
        message: errMsg || 'Error',
        type: 'danger',
        duration: 5 * 1000
      })
      return Promise.reject(new Error(errMsg || 'Error'))
    },
    async (error) => {
      console.log('err' + error) // for debug

      // 定时器提示报错的防抖
      const errorDebounceHandler = (errorMessage: string) => {
        if (errMsgDebounceTimer) clearTimeout(errMsgDebounceTimer)
        const callNow = !errMsgDebounceTimer
        errMsgDebounceTimer = setTimeout(() => {
          errMsgDebounceTimer = null
        }, errMsgDebounceWait)

        if (callNow) {
          showNotify({
            message: errorMessage,
            type: 'danger',
            duration: errMsgDebounceWait
          })
        }
      }

      const errorData = error.response.data
      const errorStatus = error.response.status

      if (errorStatus === httpEnums.HTTP_STATUS.REQUEST_ERROR.UnAuthorized) {
        errorDebounceHandler(error.message)
      } else if (
        errorData.code ===
        httpEnums.HTTP_STATUS.SERVER_ERROR.InternalServerError
      ) {
        // 500特殊处理
        return Promise.reject(error)
      } else {
        errorDebounceHandler(error.message)
        return Promise.reject(error)
      }
    }
  )
})

export { request }
```

#### 接口管理

在`api/`下管理各个模块接口，以`loginApi.js`为例

```typescript
import { LoginData, ProfileParams } from "./types"
import { request } from '@/utils/request'

export const apiLogin = (data: LoginData) => {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export const apiGetProfile = (params: ProfileParams) => {
  return request({
    url: '/user/profile',
    method: 'get',
    params
  })
}

export const apiLogout = () => {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
```

#### 调用方式

以`login.vue`为例

```javascript
  import { reactive, toRefs } from 'vue'
  import { apiLogin } from '@/api/loginApi'
  setup () {
    const loginForm = reactive({ username: '', password: '' })
    const { username, password } = toRefs(loginForm)
    const result = await apiLogin({ username: username.value, password: password.value })
    const { token } = result.data
  }
```

[🔙 返回顶部](#catalogue)

### <span id="pinia">⚙️ pinia 使用</span>

- 文档：https://pinia.vuejs.org/

pinia 的特点：
1. 支持 vue2 和 vue3，两者都可以使用 pinia；
2. 语法简洁，支持 vue3 中 setup 的写法，不必像 vuex 那样定义 state、mutations、actions、getters 等，可以按照 setup Composition API 的方式返回状态和改变状态的方法，实现代码的扁平化；
3. 支持 vuex 中 state、actions、getters 形式的写法，丢弃了 mutations，开发时候不用根据同步异步来决定使用 mutations 或 actions，pinia 中只有 actions；
4. 对 TypeScript 支持非常友好。

#### pinia 的使用

```
npm install pinia
```

```typescript
import { ref } from 'vue'
import { defineStore } from 'pinia'
import { apiGetProfile } from '@/api/loginApi'

export const userStore = defineStore('user', () => {
  const profile = ref()

  const getProfile = async(token: string) => {
    const res = await apiGetProfile({ token })
    profile.value = res.data
  }

  const clearProfile = () => {
    profile.value = null
  }

  return { profile, getProfile, clearProfile }
})
```
通过 `storeToRefs` 拿到响应式数据

```javascript
import { storeToRefs } from 'pinia'

const { profile } = storeToRefs(user)
console.log(profile.value)
```

#### pinia 持久化

- 文档：https://github.com/prazdevs/pinia-plugin-persistedstate

通过 `pinia-plugin-persistedstate` 来实现数据持久化

```
npm i pinia-plugin-persistedstate
```

```typescript
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
```

```typescript
import { ref } from 'vue'
import { defineStore } from 'pinia'

export const loginStore = defineStore('login', () => {
  const token = ref<string>('')

  const setToken = (val: string) => {
    token.value = val
  }

  const resetToken = () => {
    token.value = ''
  }

  return { token, setToken, resetToken }
}, {
  persist: true
})
```

[🔙 返回顶部](#catalogue)

### <span id="router">⚙️ vue-router</span>

在`router/modules`下管理各个路由。以`newsRouter.js`为例

```typescript
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
```

#### 路由守卫

路由守卫分为全局守卫、单个路由守卫、组件内部守卫，在模版中用到了全局和单个路由守卫，用于登录鉴权

- 全局守卫

```typescript
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
```

- 单个路由守卫

```typescript
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
```

[🔙 返回顶部](#catalogue)

### <span id="plop">⚙️ plop 自动化</span>

通过指令可通过 plop 快速生成相关文件，方便开发

```
npm run plop view

npm run plop component

npm run plop api
```

在 `plopfile.cjs` 中定义了三个生成器，分别是 `页面` `组件` `api`

```javascript
const apiGenerator = require('./plop-templates/generators/apiGenerator.cjs')
const viewGenerator = require('./plop-templates/generators/viewGenerator.cjs')
const componentGenerator = require('./plop-templates/generators/componentGenerator.cjs')
//  Plop 入口文件 需要导出一个函数
// 此函数接收一个 plop 对象，用于创建生成器任务

module.exports = plop => {
  plop.setHelper('lowerCase', (val) => {
    return val.toLowerCase()
  })
  plop.setHelper('pascalCase2Line', (val) => {
    arr = val.split('')
    arr[0] = arr[0].toLowerCase()
    return arr.join('').replace(/([A-Z])/g,"-$1").toLowerCase()
  })
  plop.setHelper('firstUpper', (val) => {
    const arr = val.split('')
    arr[0] = arr[0].toUpperCase()
    return arr.join('')
  })
  // 指定一个生成器
  // 第一个参数是指定生成器名称
  // 第二个参数是用来定义生成的具体可选项

  // 生成页面
  plop.setGenerator('view', viewGenerator)

  // 生成api
  plop.setGenerator('api', apiGenerator)

  // 生成component
  plop.setGenerator('component', componentGenerator)
}
```

![自动化创建组件.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7ed7929bdf604c2b94ec0f100fb84575~tplv-k3u1fbpfcp-watermark.image?)

![自动化创建api.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8ce8d15f06b04ea7ac5c067bc7c0834c~tplv-k3u1fbpfcp-watermark.image?)

![自动化创建页面.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/68eda6db18754b2cb407c0e267b3942d~tplv-k3u1fbpfcp-watermark.image?)

[🔙 返回顶部](#catalogue)

### <span id="components">⚙️ 内置组件</span>

在 v1.0.1 版本更新了模版的内置组件。分别是 `FloatBtn` `NewsCell` `SvgIcon` `VirtualList` 组件。

![floatBtn.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c4759c21cbf44924adfc804acb806d6f~tplv-k3u1fbpfcp-watermark.image?)

![newsCell.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ee0f03e4ebc244d897f2a15227be6d49~tplv-k3u1fbpfcp-watermark.image?)

![svgIcon.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ede0285ab1c3484aa472d2384b4e96f7~tplv-k3u1fbpfcp-watermark.image?)

![virtualList.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4071be6831f84a42a2ab4a4ca0a6138d~tplv-k3u1fbpfcp-watermark.image?)
