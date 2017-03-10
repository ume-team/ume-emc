// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Element from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import locale from 'element-ui/lib/locale/lang/zh-CN';
import Vue from 'vue';

import App from '@/App';
import resource from '@/resource';
import router from '@/router';

Vue.config.productionTip = false;

// 使用中文语言加载Element UI
Vue.use(Element, { locale });

/* eslint-disable no-new */
new Vue({
  el: '#main',
  router,
  resource,
  template: '<App/>',
  components: { App },
});
