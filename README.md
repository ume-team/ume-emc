# ume-web

> UME FrontEnd System

## Install
``` bash
# install dependencies
npm install
```

## Quick Start
``` bash
# modify TARGET_WEBSERVICE_SERVER's value which in ./config/dev.env.js file
e.g:
# TARGET_WEBSERVICE_SERVER: '"http://example.com/"'
TARGET_WEBSERVICE_SERVER: '"http://www.myservice.com/api"'

# serve with hot reload at localhost:5000
npm run dev
```

## Development Guide
[开发手册](https://github.com/bluejfox/ume.js/blob/master/doc/GUIDE.md)

## Browser Support
Modern browsers and Internet Explorer 9+.

## Internal Dependencies
* [vue](https://github.com/vuejs/vue)
* [vuex](https://github.com/vuejs/vuex)
* [vue-resource](https://github.com/pagekit/vue-resource)
* [element-ui](https://github.com/ElemeFE/element) - A Vue.js 2.0 UI Toolkit for Web.

## Learning
* [ES6](http://es6.ruanyifeng.com/)

## ToDo

### 公共模块
- [X] 鉴权
- [ ] 消息处理
- [ ] UME服务调用
- [ ] 用户状态管理
- [X] 菜单控件作成
- [ ] 元数据列表控件作成
- [X] 元数据表单控件作成

### 业务画面
- [ ] 元数据查询画面(包含元数据删除功能)
- [ ] 元数据新增画面
- [ ] 元数据修改画面

## License
MIT
