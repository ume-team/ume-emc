# 开发手册

## 工程结构
    .
    ├── build/                      # webpack配置文件
    │   └── ...
    ├── config/                     # 部署配置文件
    │   ├── index.js
    │   └── ...
    ├── dist/                       # 编译文件输出目录
    ├── src/
    │   ├── component/              # 组件
    │   │   ├── entity/             # 公共远程服务调用模块
    │   │   │   ├── EntityCreate    # 元数据新增画面
    │   │   │   ├── EntitySearch    # 元数据检索画面
    │   │   │   └── EntityUpdate    # 元数据修改画面
    │   │   ├── menu/               # 公共远程服务调用模块
    │   │   │   ├── UmeMenu         # 菜单组件
    │   │   │   └── UmeMenuItem     # 菜单子项目组件
    │   │   └── ...
    │   ├── config/                 # 应用配置文件（路由定义，消息等）
    │   ├── model/                  # 业务模型
    │   │   ├── util/               # 公共函数模型
    │   │   ├── auth                # 鉴权模型
    │   │   └── ui                  # 通知相关组件模型
    │   ├── resource/               # 公共远程服务调用模块
    │   │   └── interceptors/       # 远程服务调用钩子
    │   ├── router/                 # 公共路由模块
    │   │   └── interceptors/       # 全局路由钩子
    │   ├── assets/                 # 模块资源（由Webpack管理）
    │   │   └── ...
    │   ├── main.js                 # 应用程序主入口文件（对第三方Library进行加载）
    │   └── App.vue                 # 应用程序主页面
    ├── static/                     # 静态资源
    ├── test/                       # 测试Case目录
    │   ├── unit/                   # 单体测试
    │   │   ├── specs/              # test spec files
    │   │   ├── index.js            # test build entry file
    │   │   └── karma.conf.js       # test runner config file
    ├── .babelrc                    # babel配置文件
    ├── .eslintrc.js                # eslint配置文件
    ├── .editorconfig               # 代码格式定义文件（定义Tab, 文件编码等）
    ├── index.html                  # SPA的壳
    └── package.json                # 部署脚本和第三方Library

## 开发环境
推荐使用[Sublime Text 3](https://www.sublimetext.com/3)进行开发。

    Sublime Text3的配置手册 - 未完成

## 编码规约
[JavaScript Style Guide](https://github.com/airbnb/javascript)

    如上编码规约已在eslintrc.js中进行配置（使用支持ESLINT的IDE即可获得代码检查功能）

``` bash
1.可以被实例化的类必须使用大写字母开头。
```

## 时序图
### 系统初始化
![系统初始化](https://cdn.rawgit.com/bluejfox/ume.js/master/doc/imgs/SystemInitialSequence.svg "")

## 公共组件

公共组件：
[Element.UI](http://element.eleme.io/#/zh-CN/component/layout)

自定义组件：
暂无

## 路由

路由配置文件：config/router.js
``` bash
强调：config/generate_route目录下的路由文件为自动生成而得，无非必要的情况下不允许修改。
```

路由部分基于[vue-router](https://router.vuejs.org/zh-cn/essentials/getting-started.html)进行实现。



## 消息处理

``` JavaScript
//可按如下方式使用Message类
//1.在config/message.js文件中按照如下规则定义或使用消息
// M[Message Catagory]XXX[Message Type]
// Message Catagory:
//   AM Application Message
//   CM Common Message
//   BM Bussiness Message
// Message Type:
//   E Error
//   I Info
//   W Warning
//2.关键字可使用{数字}的方式进行定义。
const MESSAGE = {
  MCM001I: '{0}数据已成功新增。',
  MCM002I: '{0}数据已成功修改。',
  MCM003I: '{0}数据已成功删除。',
};
//3.在代码中通过实例化model/Message的方式取得指定的消息
import Message from '@/model/Message';
import ui from '@/model/ui';
ui.UMEMessage.showMessage(new Message('MCM002I', ['用户']));
```

## 模版生成
UME系统可基于指定格式的Excel文件进行画面模版的生成，用于提高开发效率和进行定制化开发。
生成的文件主要有两种：
1. 画面Vue文件。
> 位于component/下，同一资源的组件放置于同一目录中。
``` JavaScript
// 譬如对于用户资源，主要生成4个Vue文件。
// 创建用户组件
component/user/UserCreate.vue
// 用户表单组件
component/user/UserForm.vue
// 用户查询组件（包含用户删除操作）
component/user/UserSearch.vue
// 用户修改组件
component/user/UserUpdate.vue
```
2. 路由定义。
> 1.中定义的资源组件的路由定义位于config/generate_route下的一个单独文件内。
> 并由config/generate_route/index.js引用
``` JavaScript
// 仍然拿用户资源来举例，在config/generate_route下会生成user.js文件。
// index.js
import user from './user';

const generateRoute = {
  route: [],
};
// 加载user
generateRoute.route = generateRoute.route.concat(user);

export default generateRoute.route;
```
``` JavaScript
// user.js
import UserCreate from '@/component/user/UserCreate';
import UserUpdate from '@/component/user/UserUpdate';
import UserSearch from '@/component/user/UserSearch';

const USER_ROUTE = [
  {
    path: '/user/create',
    name: 'UserCreate',
    component: UserCreate,
  },
  {
    path: '/user/update/:USER_ID',
    name: 'UserUpdate',
    component: UserUpdate,
  },
  {
    path: '/user/search/:USER_ID?',
    name: 'UserSearch',
    component: UserSearch,
  },
];

export default USER_ROUTE;
```
