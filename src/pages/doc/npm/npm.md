## 介绍
> npm（Node Package Manager）nodejs包管理器

- 依赖包类型

```js
// 生产环境依赖
"dependencies": {
    "@fdd-op/web-ui": "2.0.7",
	"@fdd/op-mobile-ui": "0.2.2",
}
// 开发环境依赖
"devDependencies": {
    "eslint": "^8.10.0",
    "typescript": "~4.1.5",
}
// 同行依赖 安装插件指定的依赖包，防止依赖包不一致
"peerDependencies": {
    "vue": "^2.7.0"
}
```

- 语义化版本规范 Semantic Versioning (semver)
```js
"vue": "~2.*", // ^ ~ > = < x *
```

## 常用命令

```js
npm i <package> -S
npm i <package> -D
npm list（npm ls）
npm view <package> versions
npm update
npm outdated
```

## npm install 原理

> node依赖包经过什么步骤安装到node_modules中？

1. 首先会构建依赖树
2. 将依赖包的版本区间解析为具体的版本号
3. 从[registry仓库](https://registry.npmjs.org/)下载对应版本的依赖tar包到本地离线镜像
4. 将依赖包从离线镜像解压到本地缓存
5. 再将依赖从本地缓存拷贝到node_modules并生成package-lock.json文件

## npm *vs* yarn *vs* pnpm

- npm发展历程


```js
npm1+  -> 嵌套结构
1. 依赖层级太深，会导致文件路径过长（window系统文件路径不超过260字符）
2. 多个包之间有公共依赖包，会重复多次，占据较大磁盘空间
3. 运行速度慢

npm3+  -> 扁平结构
1. 扁平化算法复杂性高，比较耗时
2. 依赖有多个版本时，只会提升一个，其他还是会复制多次
3. 依赖结构的不确定性
4. 幽灵依赖 -> 可以非法访问没有声明过依赖的包

npm5+  -> 加了lockfiles
1. resolved安装来源
1. integrity校验包完整性的哈希值
```

- yarn

```js
1. 扁平结构
2. 离线模式offline（已经缓存的依赖不需要网络连接）
3. yarn.lock
```

- pnpm（performant npm）
> 基于内容寻址的文件系统来存储磁盘上所有的文件
```js
- inode 索引节点
- 硬链接(hard link) - 多个文件名指向同一个索引节点（全局store）
- 软链接（符号链接）(symbolic link) - 一个文件A，文件内容指向另一个文件路径B
- node模块解析算法会忽略符号链接，指向真正的链接
- 离线模式offline
- pnpm store prune
- monorepo
```
