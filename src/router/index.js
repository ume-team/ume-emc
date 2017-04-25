import Vue from 'vue';
import Router from 'vue-router';
import routerConfig from '@/config/router';
import Auth from '@/model/Auth';

Vue.use(Router);

const router = new Router(routerConfig);

/**
 * 判断用户登录状态
 * @param  {RouteConfig}   to    目标路由对象
 * @param  {RouteConfig}   from  当前导航正要离开的路由对象
 * @param  {Function}      next  管道钩子
 */
function isLogin(to, from, next) {
  // 当目标画面需要鉴权的场合
  if (to.meta.auth !== false) {
    // 当前用户没有登录的场合
    if (!Auth.isLogin()) {
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
// 注册全局鉴权路由钩子
router.beforeEach(isLogin);

export default router;
