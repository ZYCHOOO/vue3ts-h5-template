import { App } from 'vue'
import FloatBtn from './FloatBtn/index.vue'
import NewsCell from './NewsCell/index.vue'
import SvgIcon from './SvgIcon/index.vue'
import VirtualList from './VirtualList/index.vue'
// import new components

export const components = {
  FloatBtn,
  NewsCell,
  SvgIcon,
  VirtualList,
// add new components
}

export default(app: App) => {
  for (const key in components) {
    app.component(key, components[key])
  }
}

