import Vue from 'vue';
import Router from 'vue-router';
import routerConfig from '@/data/router';

Vue.use(Router);

const router = new Router(routerConfig);

router.beforeEach((to, from, next) => {
  // 当目标画面需要鉴权的场合
  if (to.meta.auth === true) {
    // 当前用户没有登录的场合
    if (Vue.Auth.getToken() === '') {
      // 登录成功跳转链接
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
});

export default router;
