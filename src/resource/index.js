/**
 * UME Restful服务调用模块
 * @version 1.0
 * @author HanL
 */
import axios from 'axios';
import Message from '@/model/Message';
import ui from '@/model/ui';
import util from '@/model/util';
import CommonRequestInterceptor from '@/resource/interceptors/common.request.interceptor';
import CommonResponseInterceptor from '@/resource/interceptors/common.response.interceptor';
import UMERequestInterceptor from '@/resource/interceptors/ume.request.interceptor';
import UMEResponseInterceptor from '@/resource/interceptors/ume.response.interceptor';
import router from '@/router';

// 创建实例
const axiosInstance = axios.create({
  baseURL: util.getConfigValue('PROXY_KEY'),
  timeout: util.getConfigValue('SERVICE_TIME_OUT'),
});

/**
 * 显示／隐藏Loading
 * @param  {Boolean} isShowLoading true的场合，显示Loading
 */
function toggleLoading(isShowLoading) {
  if (isShowLoading === true) {
    ui.Loading.service({ fullscreen: true });
  } else {
    ui.Loading.service({ fullscreen: true }).close();
  }
}

function isSessionTimeout(errors) {
  return errors.some(item => item.id === 'SEMSG-AUTH-FAIL');
}

/**
 * 远程服务登录超时处理
 */
function doSessionTimeout() {
  const WAIT_TIME = 3;
  // 使用系统通知的方式显示错误信息
  ui.Notification({
    title: '错误',
    message: new Message('MAM002E', [WAIT_TIME]).getMessage(),
    type: 'error',
    duration: WAIT_TIME * 1000,
    onClose: () => {
      const path = router.currentRoute.path;
      router.push({ name: 'Login', query: { path } });
    },
  });
}

const resource = {
  /**
   * 执行指定服务
   * @param  {String}  serviceId    服务ID(EMWS00001)
   * @param  {Array}   serviceParam  服务参数信息
   * @param  {Object}  config       服务配置信息
   * @return {Promise} Promise
   */
  invoke(serviceId, serviceParam = [], config = {}) {
    const umeConfig = config;
    // 显示Loading
    if (config.isShowLoading !== false) {
      toggleLoading(true);
    }
    // Url
    umeConfig.url = serviceId;
    // 默认使用POST
    umeConfig.method = util.isEmpty(umeConfig.method) ? 'post' : umeConfig.method;
    // method为POST, PUT, DELETE, PATCH场合
    if (umeConfig.method.toLowerCase() !== 'get') {
      umeConfig.data = serviceParam;
    // GET的场合，使用params
    } else {
      umeConfig.params = serviceParam;
    }

    return new Promise((resolve, reject) => {
      // 调用指定服务
      axiosInstance(umeConfig).then((res) => {
        // 隐藏Loading
        if (umeConfig.isShowLoading !== false) {
          toggleLoading(false);
        }
        resolve(res);
      // 服务调用出现错误的场合
      }).catch((errors) => {
        // 隐藏Loading
        if (umeConfig.isShowLoading !== false) {
          toggleLoading(false);
        }
        // 显示错误信息
        if (umeConfig.isShowError !== false && !util.isEmpty(errors)) {
          // Session过期的场合
          if (isSessionTimeout(errors)) {
            doSessionTimeout();
          // 其它的场合
          } else {
            // Element.UI的BUG，显示的消息同步连续调用会出现消息重叠现象
            errors.forEach((err) => {
              setTimeout(() => {
                ui.UMEMessage.show(err);
              }, 0);
            });
          }
        }
        reject(errors);
      });
    });
  },
};

// 加载拦截器
// 公共请求数据处理拦截器
axiosInstance.interceptors.request.use(...CommonRequestInterceptor);
// 公共返回数据处理拦截器
axiosInstance.interceptors.response.use(...CommonResponseInterceptor);
// UME服务调用请求数据处理拦截器
axiosInstance.interceptors.request.use(...UMERequestInterceptor);
// UME服务调用返回数据处理拦截器
axiosInstance.interceptors.response.use(...UMEResponseInterceptor);

export default resource;
