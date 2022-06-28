#### 1、介绍
> 官方定义：**Typed JavaScript at Any Scale，添加了类型系统的JavaScript，适用于任意规模的项目**，2012年10月由微软发布第一个版本，最新2020年8月发布了4.0版本（其中2015年5月vscode发布，2020年9月vue3.0发布，均采用TypeScript编写）

#### 2、特点
1. 具有类型系统，可以编译成JavaScript代码，支持任意浏览器、任意环境、任意系统，适用于任何规模的项目
> TypeScript的类型系统非常适用于大型项目，可带来更高的可维护性；又因为有强大的类型推论，大部分类型都不需要手动声明，所以同样适用于中小型项目
2. 静态类型
> 引申：类型系统按照【类型检查的时机】来分为静态类型和动态类型

> 动态类型是运行时才会进行类型检查，比如JavaScript，常见错误如【Uncaught TypeError: a.split is not a function】

> 静态类型是编译阶段就会进行检查，比如TypeScript
3. 弱类型
> 引申：类型系统根据【是否允许隐式类型转换】来分为强类型和弱类型

> TypeScript和JavaScript都允许隐式类型转换，所以都是弱类型

```js
// 例如以下代码在JavaScript和TypeScript都会正常打印
// 因为运行时数字1会隐式类型转换为字符串'1'
console.log(1+'1') // '11'
```
4. 在不断的积极开发完善中，并与ECMAScript标准保持同步
> ECMAScript语法进入stage3阶段（候选人阶段，即将定案）后，TypeScript就会实现它
5. 有很多编译选项，可以自己决定类型检查的严格程度，所以可以和JavaScript共存，支持旧的JavaScript项目渐进式迁移

#### 3、类型
数据类型包括：**boolean**、**number**、**string**、void、null、undefined、Symbol、BigInt（原始类型）、**Array**、Tuple、Enum、**Object**（非原始类型）、**any**、unknown、nerver（特殊类型）
> void：空值，表示没有任何返回值，TypeScript引入，只能赋值给undefined和null

> null和undefined：是所有类型的子类型，默认情况下可以赋值给任意类型

> any：任意类型，可以赋值给任意类型，可以进行任何操作，少用。***如果定义的时候没有赋值，则默认推断成any***

```js
let a;
a = 'fdd';
a = 1; // 不会报错
```


> Tuple：元组，和数组类似，是已知元素数量和类型的严格版数组

```js
let fdd: [string, number] = ['法大大', 7];
```
> Enum：枚举，取值被限定在一定范围内的场景，用enum关键字定义

```js
enum Directions = {up, down = 3, left, right}
// 默认从0开始赋值
console.log(Directions.up === 0)
// 可以反向映射
console.log(Directions[0] === up)
```
#### 4、重点语法
##### 接口interface：定义对象的类型

```js
interface Person {
    name: string;
    age?: number; // 可选属性，可为number或undefined
    [propName: string]: any; // 任意属性
}
let fdd: Person = {
    name: '法大大',
    age: '7',
    address: '深圳'
}
function getName(data: Person) {
    return `名称：${data.name}；年龄：${data.age}；地址：${data.address}`;
}
// 如果定义了任意属性，则确定属性和可选属性都必须为他的类型的子集
// 一个接口只能有一个任意属性

// 继承extends
interface VipPerson extends Person {
    isVip: boolean
}
```


##### 类class：定义一件事物的抽象特点，包括它的属性和方法

```js
class Animal {
    // 访问限定符
    public name; // 公有属性，默认值
    private age; // 私有属性，不能在外部访问
    protected address; // 受保护属性，在子类允许访问
    // 构造函数
    public constructor(name,age,address) {
        this.name = name;
        this.age = age;
        this.address = age;
    }
}
// 通过new生成类的实例，会自动调用构造函数
let cat = new Animal('tom',2,'sz');
console.log(cat.name) // tom
console.log(cat.age) // 报错
console.log(cat.address) // 报错

// Cat为Animal的子类，可以访问address
class Cat extends Animal {
    constructor(address) {
        // super关键字调用父类的构造函数和方法
        super(address);
        console.log(this.address)
    }
}
```

    
##### 类型别名type：给类型起个新名字

```js
// 可以理解为一个新的类型
type fdd = number | string; // 联合类型
let company: fdd; // 相当于 let company: number | string
```
##### 泛型Generic：不预先指定类型，只用字符占用，使用时再指定类型

```js
// 在函数名后面声明泛型变量T，会捕获传参的类型，供函数使用
function add1<T>(num: T): T {
    return num + 1;
}
add1(1) // 2
add1('1') // 11

function reverse<T, U>(arr: [T, U]): [U, T] {
    return [arr[1], arr[0]];
}
reverse(['fdd', 7]) // [7, 'fdd']
```



