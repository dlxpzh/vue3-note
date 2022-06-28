### 前端性能优化

### 字体优化

1、字体图标iconfont代替图片图标
> 应用：web项目

2、fontmin-webpack插件压缩字体文件

### 图片优化

##### 1、懒加载
> 先不设置src，等**出现在可视区域时**再设置src，或者等出现时再显示图片

##### 2、sprite（雪碧图、精灵图）
> 将小图片合并成一张大图片，根据background-position分割

##### 3、响应式图片
> 通过**media**属性设置根据屏幕大小自动加载合适的图片

```js
@media (min-width: 769px) {
    .bg {
        background-image: url(bg1080.jpg);
    }
}
@media (max-width: 768px) {
    .bg {
        background-image: url(bg768.jpg);
    }
}
```
##### 4、用css3（渐变、阴影等）代替图片
### 压缩文件

##### 1：webpack插件
- JavaScript：uglify-webpack-plugin
> 使用的是单线程压缩，涉及多个文件压缩时，需要一个一个压缩

> 进阶：多线程压缩 webpack-parallel-uglify-plugin
- CSS ：MiniCssExtractPlugin
> 应用：web-ui、mobile-ui
- HTML：HtmlWebpackPlugin
> 应用：web-ui、mobile-ui

##### 2、Gzip

- 前端压缩：**compression-webpack-plugin** 
- 服务器压缩：**Nginx gzip** 或 **Node compression**
> 原理：前端打包启用compression-webpack-plugin插件压缩静态资源，生成gz格式的文件；或服务端在Nginx开启Gzip压缩，则文件响应头Response Headers会有Content-Encoding: gzip的标识告诉浏览器去解析gzip文件，目前主流浏览器都支持解析gzip页面
```js
// 基于node
var compression = require('compression')
var app = express();
app.use(compression());
```

> 应用：web项目

一般经过gzip后，文件大小可以压缩60%以上
### CDN
> CDN（内容分发网络）是一组**分布在不同位置的web服务器节点**，可将源站内容分发至最接近用户，提高用户访问速度，一般针对静态资源（如音频、视频、图片等）

关键步骤是：本地DNS向全局负载均衡系统（GSLB）发送请求，然后**全局负载均衡系统**根据本地DNS的ip地址筛选出距离较近的**区域负载均衡系统**（SLB），再拿到符合条件的**缓存服务器**的ip地址返回给本地DNS，再发送给用户终端

> 【名词解释】DNS（Domain Name System 域名解析服务），把域名转换成为网络可以识别的ip地址，需要域名解析服务器


### 分包（split chunks）
> 解释：webpack4+功能，针对比较稳定的第三方库，单独提取出来作为缓存

设置splitChunks插件的cacheGroups选项
> 应用：web项目
### 减少重绘重排
### 代码逻辑后移
> 概念：主体请求需要提前，非主体请求需要后移，能尽快把主体渲染出来
### GPU渲染
> 针对比较复杂的动画，用css3来开启GPU加速，如transform

### SSR（Server Side Render 服务器渲染）
服务端渲染是指渲染过程在服务器端完成，将结果页面通过HTTP发送给客户端直接解析渲染

> 优缺点：更好的**SEO**（搜索引擎优化，为了网站关键词排名更靠前）、提高**首屏加载速度**，但会**占用更多的CPU资源**

> 前端应用：[vue插件vue-server-renderer](https://ssr.vuejs.org/zh/)、[基于vue的框架nuxt.js](https://www.nuxtjs.cn/guide)

### Web Worker
> 解释：JavaScript语言采用的是单线程模型，而Web Worker就是为JavaScript**创造多线程环境**，允许主线程创建Worker线程，然后将一些任务分配给Worker线程，**在主线程运行的同时，Worker线程在后台运行**，互不干扰，等完成后再把结果返回给主线程，从而达到主线程流畅运行的效果

多用于处理一些消耗性能的任务，用法见[教程](https://www.ruanyifeng.com/blog/2018/07/web-worker.html)