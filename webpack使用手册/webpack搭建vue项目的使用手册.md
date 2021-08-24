# webpack搭建vue项目的使用手册

​	最近想做一个基于`Vue`的项目，平时都是使用官方发布的`Vue-Cli`脚手架搭建项目，鉴于最近在学习`webpack`，打算使用`webpack`来搭建一个`Vue`项目。

## 准备工作

​	首先建立了一个名为`vue_demon`的文件夹，这里模仿`Vue-Cli`来构建一个文件树。

```
.
├── public
│   └── index.html
└── src
    ├── App.vue
    ├── assets
    │   └── logo.png
    ├── components
    │   └── HelloWorld.vue
    └── main.js
```

​	并执行`npm init`初始化项目进行基本的信息配置，也可执行`npm init -y`来使用默认值超速初始化。

## 安装`webpack`&`vue`

​	第一次需要在全局安装`webpack`

```
npm i -g webpack
```

​	在项目下安装`webpack`和`vue`

```
npm i -D webpack vue
```

​	后面项目构建时会要求安装`webpack-cli`，这里可以先装上

```
npm i -D webpack-cli
```

​	`tips`:

```
npm -D -S的区别:
-D: 同--save-dev，开发环境，会写入到devDependencies对象
-S: 同--save，生产环境，会写入到dependencies对象
npm i: 同npm install，但略有不同
-g: 全局安装
```

## `webpack`介绍

​	`webpack`是一款非常流行的前端项目的静态模块打包工具，可以将项目中所加载的模块进行打包，并且可以将一些浏览器不支持的语言进行转换。

​	其打包原理是找到入口文件，递归所有依赖并构建成一个依赖图，然后将项目中的所需的每一个模块组合成一个或多个`boundles`，它们均为静态资源。

### 基本配置

​	首先创建一个webpack.config.js文件

```js
touch webpack.config.js

.
├── node_modules
├── package-lock.json
├── package.json
├── public
├── src
└── webpack.config.js
```

​	webpack.config.js文件一般为如下配置：

```js
module.exports = {
  entry: {}, //入口文件
  output: {}, //出口文件
  mode, //模式
  module: {
    rules: [{}, {}, {}], //loader
  },
  plugins: {}, //插件
  devtool: {}, //工具
  devserver: {}, //服务
};
```

### 入口

​	这里设置`main.js`为入口文件，`webpack`为由此递归遍历该入口文件的所有依赖，本按顺序利用`loader`进行处理

```js
module.exports = {
	entry: './src/main.js'
}
```

​	`webpack`支持多个入口文件，这里先不做介绍

### 出口

```js
const path = require('path');

module.exports = {
	entry: './src/main.js',
	output: {
		filename: 'boundle.js',
		path: path.resolve(__dirname, 'dist')
	}
}
```

​	这里引入了`path`，它为`node.js`的内置包，用来处理路径，这里先不做详细介绍。这里会在根目录下自动创建一个`dist`文件夹，并创建`boundle.js`文件，下图省略了`node_modules`文件夹。

```js
.
├── dist //新增
│   └── boundle.js //新增
├── package-lock.json
├── package.json
├── public
│   └── index.html
├── src
│   ├── App.vue
│   ├── assets
│   │   └── logo.png
│   ├── components
│   │   └── HelloWorld.vue
│   └── main.js
└── webpack.config.js
```

### `mode`模式

- `none`不适用任何默认优化选项
- `development`
- `production`

### `module`下的`loader`

​	`Loader`可以说是`webpack`的灵魂所在，它将一切浏览器不支持的语言，处理成浏览器可以支持。丰富的`Loader`可以满足各个文件类型的加载需求。

​	`Loader`的工作方式为从右到左链式编译，上一个`Loader`值返回给下一个`Loader`，最后返回预期的结果。它可以是同步或异步函数，也可以使用`options`对象去配置参数。

```js
module: {
	rules: [
		{
			test: /\.xxx$/,//以xxx结尾的文件
			loader: 'xxx-loader',
			exclude: { 排除的路径 },
			include: { 包含的路径 },
			options: { Loader 配置 }
		}
	]
}
```

​	常用的`loader`:

#### 	`CSS`:

```js
npm i css-loader style-loader -D 
npm i less less-loaer -D
//解析css文件，如过使用less或sass等css预处理器，可添加相应的loader，这里假设使用less
module: {
	rules: [
		{
			test: /\.css$/,
			loader: ['style-loader', 'css-loader', 'less-loader']
		}
	]
}
```

#### 	`JS`:

​	用于`ES6`向`ES5`转换，向后兼容浏览器对`JavaScript`语言版本的支持

```
npm i -D babel-loader @babel/core @babel/preset-env
/* babel-loader：调用Babel处理js代码的转换，负责ES6语法转换
babel-core：为babel的核心包，包括核心功能
babel-preset-env：转码的预设方案，官网推荐
```

​	这里介绍几种配置方案

​	1.`webpack.config.js`

```js
module: {
	rules: [
		{
			test: /\.js$/,
			exclude: /(node_modules|bower_components)/, //排除不需要的文件，提速编译
			use: {
				loader: 'babel-loader',
				options: {
					presets: ['@babel/preset-env']
				}
			}
		}
	]
}
```

​	2.在根目录下创建`.babelrc`或者`babel.config.js`

```js
module: {
  rules: [
    test: /\.js$/,
    exclude: /(node_modules|bower_components)/,
    use: 'babel-loader'
  ]
}
// .babelrc

{
  "presets": ["@babel/present-env"]
}
// babel.config.js

module.exports = {
  presets: ["@babel/present-env"]
}
```







### Vue三件套

​	浏览器识别不了`vue`文件，所以需要下载相应的`loader`来转换浏览器能识别的语言

```js
npm i -D vue-loader //解析加载vue文件
npm i -D vue-template-compiler //配合vue-loader使用，用于将vue 2.0模版预编译为渲染函数(template => ast => render)，减少编译开销

//配置文件需要引入VueLoaderPlugin插件
webpack.config.js文件

const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
	module: {
		rules: [
			{
				test: /\.vue$/,
				use: 'vue-loader'
			}
		]
	}
	plugins: [
		new VueLoaderPlugin()
	]
}
```





