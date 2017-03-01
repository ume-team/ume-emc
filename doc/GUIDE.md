# 开发手册

## 工程结构
    .
    ├── build/                      # webpack配置文件
    │   └── ...
    ├── config/
    │   ├── index.js                # 部署配置文件
    │   └── ...
    ├── src/
    │   ├── main.js                 # 应用程序主入口文件（对第三方Library进行加载）
    │   ├── App.vue                 # 应用程序主页面
    │   ├── components/             # **画面开发目录**
    │   │   └── EntityCreate        # 元数据新增画面
    │   │   └── EntitySearch        # 元数据检索画面
    │   │   └── EntityUpdate        # 元数据修改画面
    │   │   └── ...
    │   └── assets/                 # 模块资源（由Webpack管理）
    │       └── ...
    ├── static/                     # 静态资源
    ├── test/                       # 测试Case目录
    │   └── unit/                   # 单体测试
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
### [Sublime Text3的配置手册 - 未完成](#)

## 编码规约
[JavaScript Style Guide](https://github.com/airbnb/javascript)
    如上编码规约已在eslintrc.js中进行配置（使用支持ESLINT的IDE即可获得代码检查功能）
