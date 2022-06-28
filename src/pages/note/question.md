#### 问题集锦
**1：vue-router**
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
**2：reactive与ref赋值问题**

```
// 问题代码
let activeItem = reactive({
	{
		name: 'vue3',
		id: 'vue',
		authors: 'Evan You',
	}
});
const update = (item) => {
    activeItem = item;
}
return {
    activeItem,
    update
}
...
<div v-for="item in list" @click="update(item)">
    <div :class="{active: activeItem.id === item.id}">{{item.name}}</div>
</div>
...
```

> 问题：由reactive声明的对象，不能直接赋值，否则会失去其响应式特性，而ref声明的变量可以直接赋值且不影响其响应式特性

```
// 原因：
// reactive声明的响应式对象会被赋值对象代理，操作代理对象需要有代理对象的前缀，直接覆盖会丢失响应式
// 解决：
// 与ref类似，给值添加一个属性（如value），使其指向同一个地址
let activeItem = reactive({
	value: {
		name: 'vue3',
		id: 'vue',
		authors: 'Evan You',
	},
});
activeItem.value = item;
// 或者直接用ref
let activeItem = ref({
	name: 'vue3',
	id: 'vue',
	authors: 'Evan You',
});
activeItem.value = item;
```


**3：vite使用markdown文件作为路由**
> 注意：使用webpack构建（如vue2项目）时，需要依赖vue-markdown-loader

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
**4：markdown文件解析**

- 支持在线编辑md文件
> 使用v-md-editor组件，支持在线编辑、预览等功能

```
// 注意点
// 1：v-md-editor没有typescript类型声明文件，需要新增声明文件xxx.d.ts
declare module "@kangc/v-md-editor";

// 2：高亮显示用prismjs插件，如果是typescript项目，则需要安装@types/prismjs
"@types/prismjs": "^1.26.0",

// 3：针对预览功能，此组件以字符串的形式传入md文件
// Vite针对静态资源可以使用?raw后缀标识来处理成字符串引入
import test from './test.md?raw';
<v-md-preview :text="less"></v-md-preview>
```
- md文件转为vue组件使用

- md文件解析成html显示在浏览器页面

- md文件高亮显示

**5：typescript声明文件**
> 随着ts的推广及广泛应用，现在大多数库都已经默认支持ts（**拥有ts声明文件**），但也有部分没有支持，如**在ts文件使用这些库**，就需要注意以下3种情况

```
// 1：如果已有ts声明文件，则直接安装引用，如组件库element-plus、echarts
"element-plus": "^2.2.0", // package.json
import ElementPlus from 'element-plus' // main.ts
app.use(ElementPlus)

//2：本身不包含ts声明文件，则首先查看是否由@types/xxx提供，如prismjs
"@types/prismjs": "^1.26.0", // package.json
import prism from 'prismjs' // main.ts

// 3：如果没有@types/xxx相关库，则需要手动写声明文件，如@kangc/v-md-editor
"@kangc/v-md-editor": "^2.3.15",
import VueMarkdownEditor from '@kangc/v-md-editor'; // main.ts
declare module "@kangc/v-md-editor"; // markdown.d.ts
```
[怎么查看是否有声明文件呢？](https://www.npmjs.com/package/package)