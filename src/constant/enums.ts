// 标签 item
interface TabItem {
  id: number,
  name: string,
  icon: string,
  title: string,
  to: string
}

// 标签坞列表
export const TABBAR_LIST: TabItem[] = [
  { id: 1, name: 'home', icon: 'home-o', title: '首页', to: '/home/index' },
  // { id: 2, name: 'setting', icon: 'setting-o', title: '自定义', to: '/home/custom' },
  { id: 3, name: 'user', icon: 'user-o', title: '我的', to: '/home/mine' }
]

// 调试白名单
export const DEBUG_WHITE_LIST: string[] = ['development', 'teste']

// 路由白名单
export const ROUTE_WHITE_LIST: string[] = ['Login']
