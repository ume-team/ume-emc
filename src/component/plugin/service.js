import UI from '@/component/ui';
import UmeHttp from '@/model/UmeHttp';

function plugin(Vue) {
  if (plugin.installed) {
    return;
  }

  function callAPI(serviceId, serviceParam, config = {}) {
    const context = this;
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
          if (error.id === 'MAM002E') {
            const path = context.$router.currentRoute.path;
            // 跳转至登录画面进行登录
            context.$router.push({ name: 'Login', query: { path } });
          }
          // Firefox目前还不支持unhandledrejection。
          context.$root.handleError(error);
        }
      });
    });
  }

  function callMultiAPI(serviceArr, config = {}) {
    const context = this;
    const promiseArr = serviceArr.map(serviceObject =>
      callAPI.call(context, serviceObject.id, serviceObject.param, config));
    return Promise.all(promiseArr);
  }

  Object.defineProperties(Vue.prototype, {
    $service: {
      get() {
        const context = this;
        return {
          call: callAPI.bind(context),
          callMulti: callMultiAPI.bind(context),
        };
      },
    },
  });
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin);
}

export default plugin;
