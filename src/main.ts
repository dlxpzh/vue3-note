import { createApp } from 'vue';
// import ElementPlus from 'element-plus';
import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import createCopyCodePlugin from '@kangc/v-md-editor/lib/plugins/copy-code/index';
import Prism from 'prismjs';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
// import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import App from './App.vue';
import { store, key } from './store';
import router from './router';
import axios from 'axios';
import split from './components/split';

// markdown编辑
VueMarkdownEditor.use(vuepressTheme, createCopyCodePlugin(), {
	Prism,
});
// markdown预览
VMdPreview.use(vuepressTheme, {
	Prism,
});
const app = createApp(App);
app.use(router);
app.use(VueMarkdownEditor);
app.use(VMdPreview);
app.use(split as any);
app.config.globalProperties.$axios = axios;
// elementUI
// app.use(ElementPlus, { size: 'small', zIndex: '3000' });
app.use(store, key).mount('#app');
// el-icon处理
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
	app.component(key, component);
}
