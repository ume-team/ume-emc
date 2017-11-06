// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Setaria from 'setaria';
import UI from '@/component/ui';
import router from '@/config/router';
import UserResource from '@/model/resource/UserResource';
import App from './App';

Vue.config.productionTip = false;
// 加载消息定义文件
Setaria.config.message = require('./config/message.json');
// 加载UI组件
Vue.use(UI);
// 加载路由组件
Vue.use(Setaria.plugin.Navigate);
const navi = new Setaria.plugin.Navigate(router);

// 检查用户是否登录
function isLogin(to, from, next) {
  // 当目标画面需要鉴权的场合
  if (to.meta.auth !== false) {
    // 当前用户没有登录的场合
    if (!UserResource.isLogin()) {
      // 登录成功后重新跳转至目标画面
      const path = to.path;
      next({
        name: 'Login',
        query: { path },
      });
    } else {
      next();
    }
  } else {
    next();
  }
}
// 注册全局导航钩子
navi.beforeEach(isLogin);

/* eslint-disable no-new */
new Vue({
  el: '#main',
  store: Setaria.plugin.store,
  router: navi,
  created() {
  },
  template: '<App/>',
  components: { App },
});
