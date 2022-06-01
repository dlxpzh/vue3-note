import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from './App.vue'
import { store, key } from './store'
import router from './router'

const app = createApp(App);
app.use(router)
app.use(ElementPlus, { size: 'small', zIndex: '3000' })
app.use(store, key).mount('#app')
// el-icon处理
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
