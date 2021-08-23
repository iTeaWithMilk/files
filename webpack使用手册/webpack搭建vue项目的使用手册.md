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

```
touch webpack.config.js

.
├── node_modules
├── package-lock.json
├── package.json
├── public
├── src
└── webpack.config.js
```



