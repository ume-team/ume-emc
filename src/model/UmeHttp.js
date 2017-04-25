import Auth from '@/model/Auth';
import ApplicationError from '@/model/ApplicationError';
import Util from '@/model/Util';
import Http from './Http';

/**
 * 处理Ts服务的异常
 * @param  {Array} exceptions 服务端异常
 * @return {ApplicationError} 客户端异常
 */
function createAppErrByServerException(exceptions) {
  let ret = null;
  let errorId = 'MAM007E';
  let errorParam = null;
  let errorMessage = null;
  // 系统异常的场合
  if (exceptions.some(item => item.id === 'SEMSG-DEFAULT')) {
    errorId = 'MAM007E';
  // 鉴权失败的场合
  } else if (exceptions.some(item => item.id === 'SEMSG-AUTH-FAIL')) {
    errorId = 'MAM005E';
  // 登录状态超时的场合
  } else if (exceptions.some(item => item.id === 'SEMSG-TIMEOUT')) {
    errorId = 'MAM002E';
  // 其它的场合
  } else {
    errorId = exceptions[0].id;
    errorParam = null;
    errorMessage = exceptions[0].message;
  }
  ret = new ApplicationError(errorId, errorParam, errorMessage);
  return ret;
}

export default class UmeHttp {
  /**
   * 执行指定服务
   * @param  {String}  serviceId    服务ID(EMWS00001)
   * @param  {Array}   serviceParam 服务参数信息
   * @param  {Object}  config       服务配置信息
   * @return {Promise} Promise
   */
  static invoke(serviceId, serviceParam = [], config = {}) {
    const umeConfig = config;
    // Headers
    umeConfig.headers = {
      TOKEN: Auth.getToken(),
    };
    // Url
    const url = Util.getConfigValue('PROXY_KEY') + serviceId;
    // 默认使用POST
    const method = Util.isEmpty(umeConfig.method) ? 'post' : umeConfig.method;
    // 超时时间
    umeConfig.timeout = Util.getConfigValue('SERVICE_TIME_OUT');

    return new Promise((resolve, reject) => {
      // 调用指定服务
      Http[method](url, serviceParam, umeConfig).then((res) => {
        const resData = res.data;
        // 收到错误信息的场合
        if (resData.resultCode !== 1) {
          const exceptions = Util.isEmpty(resData.exceptions) ?
            [] : resData.exceptions;
          const error = createAppErrByServerException(exceptions);
          reject(error);
        }
        resolve(resData.resultObject);
      }).catch((error) => {
        reject(error);
      });
    });
  }
}
