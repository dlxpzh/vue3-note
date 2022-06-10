#### 问题集锦
1：vue-router
> setup没有this，无法访问this.$router和this.$route
```
// 在setup里使用
import { useRouter, useRoute } from 'vue-router';
......
const router = useRouter();
const route = useRoute();
router.push();
console.log(route.name)

// 在模板里可直接使用$router和$route
```

2：vite使用md文件作为路由
> vue2或者vue3使用md文件作为路由，需要依赖vue-markdown-loader

```
// 1：需要依赖vite-plugin-md

// 2：vite.config.ts配置
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import viteMarkdown from 'vite-plugin-md'; // 引用依赖
export default defineConfig({
  plugins: [vue({
    include: [/\.vue$/, /\.md$/], // 加上md文件
  }), viteMarkdown()]
})

//3：router.ts路由
{
    path: 'test',
    name: 'test',
    // @ts-ignore
    component: () => import('../pages/test.md')
},
```
3：
