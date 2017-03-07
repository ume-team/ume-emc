// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Element from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import locale from 'element-ui/lib/locale/lang/zh-CN';
import Vue from 'vue';
import Http from 'vue-resource';

import App from '@/App';
import router from '@/common/router';
import Auth from '@/common/services/auth';
import CommonInterceptor from '@/common/interceptors/common.interceptor';
import UMERequestInterceptor from '@/common/interceptors/ume.request.interceptor';
import UMEResponseInterceptor from '@/common/interceptors/ume.response.interceptor';

Vue.config.productionTip = false;

// 使用中文语言加载Element UI
Vue.use(Element, { locale });
// 加载Service模块(vue-resource)
Vue.use(Http);
// 加载鉴权模块
Vue.use(Auth);
Vue.http.interceptors.push(UMERequestInterceptor);
Vue.http.interceptors.push(CommonInterceptor);
Vue.http.interceptors.push(UMEResponseInterceptor);
/* eslint-disable no-new */
new Vue({
  el: '#main',
  router,
  template: '<App/>',
  components: { App },
});
