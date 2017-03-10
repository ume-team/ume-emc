import Vue from 'vue';

export default function (to, from, next) {
  // 当目标画面需要鉴权的场合
  if (to.meta.auth === true) {
    // 当前用户没有登录的场合
    if (!Vue.Auth.isLogin()) {
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
