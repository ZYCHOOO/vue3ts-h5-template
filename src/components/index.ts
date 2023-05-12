import { App } from 'vue'
import FloatBtn from './FloatBtn/index.vue'
import NewsItem from './NewsItem/index.vue'
import SvgIcon from './SvgIcon/index.vue'
// import new components

const components = {
  FloatBtn,
  NewsItem,
  SvgIcon,
  // add new components
}

export default(app: App) => {
  for (const key in components) {
    app.component(key, components[key])
  }
}

