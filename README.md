# ume-web

> UME FrontEnd System
基于Vue.js系列 + Element UI的元数据系统

## 开发所需软件

1. NodeJS
> 用于安装项目所需的第三方依赖包和在本地进行前端的开发与调试。
[安装包下载地址](https://nodejs.org/zh-cn/download/)
[安装说明](http://www.runoob.com/nodejs/nodejs-install-setup.html)

2. Git
> 版本管理工具。用于下载项目的代码和在开发时进行代码和文档的版本管理。
[安装说明](https://git-scm.com/book/zh/v2/%E8%B5%B7%E6%AD%A5-%E5%AE%89%E8%A3%85-Git)

## 安装步骤
``` bash
# 下载工程到本地
git clone https://github.com/ume-team/ume.js.git
# 进入工程目录
cd ume.js
# 安装项目依赖
npm install
```

## 本地开发
``` bash
# 在./config/dev.env.js中修改TARGET_WEBSERVICE_SERVER为自己所使用的后端服务地址
例:
修改
# TARGET_WEBSERVICE_SERVER: '"http://example.com/"'
为
TARGET_WEBSERVICE_SERVER: '"http://www.myservice.com/api"'

# 启动服务器
npm run dev
```

## 部署生产
``` bash
// 执行构建命令，在dist文件夹内生成合并和压缩后的代码
npm run build
```

## 开发手册
[开发手册](https://github.com/bluejfox/ume.js/blob/master/doc/GUIDE.md)

## 浏览器支持
支持各种主流浏览器(Chrome, Firefox, Safari)和Internet Explorer 9+.

## 依赖包列表
* [vue](https://github.com/vuejs/vue)
* [vuex](https://github.com/vuejs/vuex)
* [vue-resource](https://github.com/pagekit/vue-resource)
* [element-ui](https://github.com/ElemeFE/element) - A Vue.js 2.0 UI Toolkit for Web.

## 开发前需要掌握的知识
* [ES6](http://es6.ruanyifeng.com/)

## ToDo

### 公共模块
- [X] 鉴权
- [ ] 消息处理
- [ ] UME服务调用
- [ ] 用户状态管理
- [X] 菜单控件作成
- [ ] 元数据列表控件作成
- [ ] 元数据表单控件作成

### 业务画面
- [ ] 元数据查询画面(包含元数据删除功能)
- [ ] 元数据新增画面
- [ ] 元数据修改画面

## License
MIT
