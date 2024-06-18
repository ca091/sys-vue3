import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import directives from '@/plugins/directives'
import theme from '@/plugins/theme'
// event
import { registerMainEvents } from '@/plugins/event'
// UI
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// style
import '@/assets/stlyes/common.less'
import '@/assets/stlyes/index.less'

createApp(App)
  .use(router)
  .use(directives)
  .use(theme)
  .use(ElementPlus)
  .mount('#app')

registerMainEvents()