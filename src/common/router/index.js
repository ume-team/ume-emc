import Vue from 'vue';
import Router from 'vue-router';
import routerConfig from '@/data/router';

import AuthInterceptor from '@/common/router/interceptors/auth.interceptor';

Vue.use(Router);

const router = new Router(routerConfig);

// 注册全局鉴权路由钩子
router.beforeEach(AuthInterceptor);

export default router;
