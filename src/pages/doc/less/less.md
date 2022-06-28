## less文件 @import css文件时，打包后引用无效

#### 现象：op-web-ui里icon.less引用iconfont.css，在op-web项目不能直接获取
```js
// op-web-ui icon.less

@import 'iconfont/iconfont.css';
.op-icon {
	font-size: inherit;

	.op-icon_text {
		margin-left: 4px;
	}
}
.op-icon_loading {
	display: inline-block;
	animation: loading-rotate 2s linear infinite;
	@keyframes loading-rotate {
		100% {
			transform: rotate(360deg);
		}
	}
}
```
#### 原因：less文件直接引用css文件时，会无效

#### 解决：less提供了相关扩展，@import后跟上指令 (less) 即可解决

```js
@import (less) 'iconfont/iconfont.css';
```
#### *相关资料文档

> 为了在将Less文件编译生成CSS文件时，提高对外部文件的操作灵活性，还为@import指令提供了一些配置项

```js
@import (keyword) "filename";
```

| 选项（keyword） | 含义                                                 |
| --------------- | ---------------------------------------------------- |
| reference       | 使用文件，但不会输出其内容（即，文件作为样式库使用） |
| inline          | 对文件的内容不作任何处理，直接输出                   |
| less            | 无论文件的扩展名是什么，都将作为LESS文件被输出       |
| css             | 无论文件的扩展名是什么，都将作为CSS文件被输出        |
| once            | 文件仅被导入一次 （这也是默认行为）                  |
| multiple        | 文件可以被导入多次                                   |
| optional        | 当文件不存在时，继续编译（即，该文件是可选的）       |

