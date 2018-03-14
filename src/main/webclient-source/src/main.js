// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import { router, store } from 'setaria';
import UI from '@/component/ui';
import '@/model/store';
import App from './App';

// 加载UI组件
Vue.use(UI);

/* eslint-disable no-new */
new Vue({
  el: '#main',
  router,
  store,
  template: '<App/>',
  components: { App },
});
