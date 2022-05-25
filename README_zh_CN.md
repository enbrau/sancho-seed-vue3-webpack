# Sancho Seed Vue3 Webpack

[English](README.md) | 中文

## 概述

Sancho Seed Vue3 Webpack 基于 Webpack 和 Vite，目的是为了提供一个轻量的不含UI组件库的开箱即用前端脚手架。基于 Sancho Seed Vue3 Webpack, 你可以很容易地初始化你的项目。你剩下要做的就是选择一个你喜欢的UI组件库，或者你自己来。

如果你想使用 Vite，你也可以参考 [Sancho Seed Vue3 Vite](https://github.com/enbrau/sancho-seed-vue3-vite) 这个项目. [Sancho Seed Vue3 Webpack](https://github.com/enbrau/sancho-seed-vue3-webpack) 与 [Sancho Seed Vue3 Vite](https://github.com/enbrau/sancho-seed-vue3-vite) 具有相同工程结构和工程特性设计。

## 特性

- 已内置常用功能

  Vue Router, Vuex, I18n, Axios, Mock Server 等已经安装并配置好。 像 dayjs 或 lodash 等常用函数库已加载为 Vue3 全局变量，方便调用。  

- 多种开发和打包模式

- "丢入即可"  

  你可以将 `route`, `store`, `i18n`, `hooks` and `mock` 等类型的文件丢入特定的文件夹，脚手架会自动加载他们。  

- 项目级钩子  

  我们为项目中不同类型的生命周期提供了特定的钩子，比如 `Vue 实例化前` 或 `Axios 请求发送的前后` 等等。  

- 通用函数

## 安装与运行

```
# 安装
npm install

# 基于 Mock Server 开发
npm run dev

# 基于真实后端服务开发
npm run dev:online

# 生产打包
npm build
```

## 链接

[Vite](https://vitejs.dev/)  [Vuex](https://next.vuex.vuejs.org/)  [Vue3]()
