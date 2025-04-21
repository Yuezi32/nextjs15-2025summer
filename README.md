# 2025盛夏版：Next.js15+Antd5开发部署SSR网站速通教程

精心整理的适合初学者的 Next.js 15 速成教程。把知识点与实操相结合，把晦涩的概念变得通俗易懂。

手把手带你快速扎实基础、掌握实战，开发+部署，快速晋级Next.js 15高手。节约大量自己学习、摸索、爬坑的时间。

## 配套教程

📚📚本项目有详细的讲解教程，原文请关注我的微信公众号【卧梅又闻花】📚📚

[《2025盛夏版：Next.js15+Antd5开发部署SSR网站速通教程（上篇）》](https://mp.weixin.qq.com/s/BqtVtS1POYk-Rj3e49GmYQ)

[《2025盛夏版：Next.js15+Antd5开发部署SSR网站速通教程（下篇）》](https://mp.weixin.qq.com/s/BqtVtS1POYk-Rj3e49GmYQ)

先看下目录了解本教程都有哪些内容。

## 章节目录
```
1 创建Next.js项目
• 1.1 安装Next.js
• 1.2 关于App Router和Pages Router
• 1.3 关于Turbopack
• 1.4 项目目录结构
• 1.5 配置IDE的Typescript插件
• 1.6 配置路径别名
• 2 App Router（路由规则）
• 2.1 基本路由规则
• 2.2 页面组件的文件名规则
• 2.3 页面嵌套结构
• 3 搭建网站架构
• 3.1 设置全局HTML框架Layout
• 3.2 设置网站图标
• 3.3 精简项目
• 3.4 支持Sass/Scss
• 3.5 配置全局样式
• 3.6 引入Ant Design 5.x
• 3.6.1 安装Ant Design
• 3.6.2 兼容Next.js及React19
• 3.6.3 设置Antd为中文语言
• 3.7 关键知识点
• 3.7.1 为什么以上两个插件要运行在客户端
• 3.7.2 为什么不能在 layout.tsx 使用 "use client" 
• 3.7.3 服务端组件在什么情况下会转化为客户端组件
• 3.7.4 服务端组件与客户端组件的使用时机
• 3.7.5 如何查看组件是由客户端还是服务端渲染
• 3.7.6 关于样式命名规范
• 3.7.7 *.module.scss 与 *.scss的区别
• 3.8 自定义全局404页面
• 3.9 自定义全局异常页面
• 3.10 环境变量
• 3.11 删除全局背景色、环境变量和模拟异常测试代码
• 3.12 创建全局配置文件
• 3.13 封装客户端公用API库
• 3.14 Mock.js安装与使用
4 构建Login（登录）页面
• 4.1 页面构建并实现登录功能
• 4.2 知识点：适用于客户端组件useRouter路由hook
• 4.3 知识点：Image组件与img标签的使用
5 构建登录后的页面框架和公共组件
• 5.1 知识点：Router Group（路由组）
• 5.2 构建页面框架
• 5.3 路由守卫：服务端组件的登录鉴权
• 5.4 网站根目录重定向至Home页面
• 5.5 构建Header组件
• 5.6 构建左侧导航Sider组件
• 5.7 知识点：适用于客户端组件usePathname路由hook
• 6 构建Home页面
• 6.1 封装服务端公用API库
• 6.2 知识点：缓存机制（fetch请求记忆体）
• 6.3 知识点：基于route.tsx的服务端API端点
• 6.4 开发由服务端获取数据的组件
• 6.5 知识点：基于<Link>的路由跳转
7 构建Detail（文章详情）页面
• 7.1 知识点：动态路由（Dynamic Routes）
• 7.2 准备文章详情的模拟数据
• 7.3 开发Detail页面
8 构建About页面
• 8.1 知识点：并行路由（Parallel Routes）
• 8.2 开发About页面
• 8.2.1 构建About页面根路由
• 8.2.2 构建并行路由company1和company2
• 8.2.3 使用default页面解决并行路由的页面刷新问题
9 构建DetailModal（文章详情弹窗）
• 9.1 知识点：拦截路由（Intercepting Routes）
• 9.2 开发DetailModal（文章详情拦截路由弹窗）
10 暗色模式与主题色
• 10.1 全局换肤配置
• 10.2 创建用于主题换肤的ThemeProvider
• 10.3 引入ThemeProvider和读取全局主题状态
• 10.4 全局主题状态的变更：在Header组件中实现亮色/暗色模式切换
• 10.5 自建组件使用Antd的主题色：完善Sider
• 10.6 实现主题色切换
11 部署生产环境
• 11.1 在生产环境中保留Mock.js（用于演示）
• 11.2 在具有Node.js环境的本机或服务器运行生产环境
• 11.2.1 npm run build的作用
• 11.2.2 npm run start的作用
• 11.3 Docker学习推荐阅读
• 11.4 基于Docker的node镜像部署网站SSR生产环境
• 11.4.1 创建项目专用Network
• 11.4.2 编写项目dockerfile和compose文件
• 11.4.3 使用docker compose一键启动整体项目
• 11.4.4 相关的其他docker compose命令
12 其他说明
• 12.1真实项目生产环境
• 12.2 批量升级全部项目npm依赖包到最新版本
• 12.3 最终项目目录结构
13 教程Git源码
结束语
```

## 本教程的主要依赖包版本：
```
Node.js 22.14.0
next 15.3.1
antd 5.24.7
axios 1.7.9
mockjs 1.8.4
react 19.1.0
react-dom 19.1.0
@next/env 15.3.1
@ant-design/nextjs-registry 1.0.2
@ant-design/v5-patch-for-react-19 1.0.3
```


## 目录结构说明
```
├─ /.next                	<-- 项目的运行文件，执行npm run dev或npm run build后才会出现
├─ /.vscode                 <-- VSCode配置文件
├─ /node_modules
├─ /public               	<-- 静态资源目录
├─ /src						<-- 项目开发目录
|  ├─ /api                  <-- 公共API库目录
|  ├─ /app               	<-- App路由目录
|  ├─ /common               <-- 公共库目录(图片、样式等)
|  ├─ /components           <-- 公共组件库目录
|  ├─ globalConfig.tsx      <-- 全局配置文件
|  └─ mock.tsx              <-- 客户端组件mock数据
├─ .gitignore
├─ compose-nodejs-ssr.yaml  <-- SSR生产环境部署的docker compose文件
├─ dockerfile-nodejs-ssr    <-- SSR生产环境部署的dockerfile文件
├─ eslint.config.mjs		<-- ESLint配置文件
├─ next-env.d.ts			<-- 自动生成的TypeScript声明文件，执行npm run dev或npm run build后才会出现
├─ next.config.js			<-- Next.js配置文件
├─ package-lock.json
├─ package.json
├─ README.md
└─ tsconfig.json			<-- TypeScript编译配置文件
```

## 使用说明

安装项目依赖：
```
npm install
```

启动开发环境：
```
npm run dev
```

build项目：
```
npm run build
```

启动生产环境SSR（需先build）：
```
npm run start
```

启动Docker一键部署生产环境SSR：
```
docker compose -f ./compose-nodejs-ssr.yaml up -d
```
💖 得“鱼🐟”，不如会“渔🎣”，原文请关注我的微信公众号【卧梅又闻花】💖

[《2025盛夏版：Next.js15+Antd5开发部署SSR网站速通教程（上篇）》](https://mp.weixin.qq.com/s/BqtVtS1POYk-Rj3e49GmYQ)

[《2025盛夏版：Next.js15+Antd5开发部署SSR网站速通教程（下篇）》](https://mp.weixin.qq.com/s/BqtVtS1POYk-Rj3e49GmYQ)
