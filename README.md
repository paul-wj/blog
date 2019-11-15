## 前台： react全家桶 + antd
## 后台：koa2 + mysql + ioredis &nbsp;&nbsp;[(博客后台git地址)](https://github.com/paul-wj/blog-amdin)

> 一个及其简洁的个人博客系统、个人玩耍使用、想到好玩的就写！！

- 前后台分离式开发（当前为前台仓库）。
- 博客样式基本为`antd`框架样式，少部分自定义样式。
- 具备了代码高亮、文章评论功能的个人博客...

* 我的博客地址: [汪小二的博客](https://www.wangjie818.wang/)

[![LICENSE](https://img.shields.io/badge/license-Anti%20996-blue.svg)](https://github.com/996icu/996.ICU/blob/master/LICENSE)&nbsp;&nbsp;[![996.icu](https://img.shields.io/badge/link-996.icu-red.svg)](https://996.icu)

### 实现功能

- [x] 前台：主页 + 搜索页 + 分类页 + 标签页 + 统计页
- [x] 后台：文章管理
- [x] 响应式、回到顶部、`markdown` 代码高亮
- [x] 用户可以评论与回复
- [x] 全局消息通知系统（socket.io）

### 技术栈
- 前端 （基于 `create-react-app eject` 后的配置）

  - react v16.8.5 + `redux` + `react-router4`
  - `marked highlight.js howler`
  - `webpack` 打包公共静态资源改为cdn（本人服务器带宽太小，解决首屏加载过慢问题）
  - `axios` 封装
  - `socket.io`

## 博客预览
### pc 端

![](https://user-gold-cdn.xitu.io/2019/10/28/16e10fc272ad8640?imageView2/2/w/480/h/480/q/85/interlace/1)

### 移动端

![](https://user-gold-cdn.xitu.io/2019/10/28/16e10fdcb979cf6c?imageView2/2/w/480/h/480/q/85/interlace/1)

## 项目结构

### 目录结构
```js
.
│
├─config                // 构建配置
├─public                // html 入口
├─scripts               // 项目脚本
└─src                   // 前端项目源码
   ├─conf               // 配置目录
   ├─lib         	   // 工具目录
   ├─static             // 静态文件目录
   ├─redux              // redux 目录
   ├─router             // 路由目录
   ├─views              // 视图层
   ├─  App.js           // 全局app入口文件
   ├─  index.js         // 主入口文件
   └─...

```

## 使用这个项目
```bash
git clone https://github.com/paul-wj/blog.git

## 安装依赖以及开启开发模式
cd react-first
yarn
yarn dev


## 打包前端
cd react-blog
yarn build
```
PS : 觉得不错的伙伴可以给个 star ~~~ 或者 fork 下来看看哦。如果有什么建议，也可以提 issue 哦
