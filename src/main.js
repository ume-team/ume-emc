// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from '@/App';
import UI from '@/component/ui';
import ErrorHandler from '@/model/ErrorHandler';
import Util from '@/model/Util';
import UmeHttp from '@/model/UmeHttp';
import router from '@/router';

// 加载公用UI控件
Vue.use(UI);
// 生产环境的场合
if (Util.isProdunctionEnv()) {
  // 不显示Vue日志和警告
  Vue.config.silent = true;
  // 不显示Vue产品信息
  Vue.config.productionTip = false;
}

function handleAppError(error, source) {
  // 取得错误内容
  const errorMessage = ErrorHandler.handleError(error, source);
  // 显示错误
  UI.Notice.showMessage(errorMessage);
}

Vue.config.errorHandler = handleAppError;
window.onerror = handleAppError;

/* eslint-disable no-new */
new Vue({
  el: '#main',
  router,
  template: '<App/>',
  components: { App },
  methods: {
    /**
     * 调用远程服务
     * @param  {String} serviceId    服务ID
     * @param  {Array}  serviceParam 参数
     * @param  {Object} config       配置信息
     */
    callService(serviceId, serviceParam, config = {}) {
      return new Promise((resolve, reject) => {
        // 显示全屏Loading
        UI.LoadingIndicator.show();
        // 调用远程服务
        UmeHttp.invoke(serviceId, serviceParam, config).then((res) => {
          resolve(res);
          // 隐藏全屏Loading
          UI.LoadingIndicator.hide();
        }).catch((error) => {
          // 隐藏全屏Loading
          UI.LoadingIndicator.hide();
          // 调用方希望对错误进行处理的场合
          if (config.isShowError === false) {
            reject(error);
          } else {
            // 登录超时的场合
            if (error.id === 'MAM002E') {
              const path = router.currentRoute.path;
              // 跳转至登录画面进行登录
              router.push({ name: 'Login', query: { path } });
            }
            handleAppError(error);
          }
        });
      });
    },
    /**
     * 对错误进行整理并显示错误消息
     * @param  {*} error 错误对象
     */
    handleError(error) {
      handleAppError(error);
    },
  },
});
