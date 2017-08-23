import Setaria, { ApplicationError, Http, util } from 'setaria';
import BizUtil from './BizUtil';

/**
 * 处理Bd服务的异常
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

/**
 * 创建Get请求的Url
 * @param  {String}  serviceId    服务ID(EMWS00001)
 * @param  {Array}   serviceParam 服务参数信息
 * @return {String}
 */
function createGetUrl(serviceId, serviceParam) {
  // Url
  const url = BizUtil.getConfigValue('PROXY_KEY');
  const requestData = JSON.stringify(serviceParam);
  return `${url}/${serviceId}/${requestData}`;
}

/**
 * 抛出异常处理
 *
 * @param  {Object} error 拥有message键值的对象
 */
function throwError(error) {
  throw error;
}

// 服务正常执行成功的状态码
const SERVICE_EXEC_SUCCESS_CODE = 0;

export default class UmeHttp {
  /**
   * 调用指定服务
   * @param  {String}  serviceId    服务ID(WS001)
   * @param  {Array}   serviceParam 服务参数信息
   * @param  {Object}  config       服务配置信息（isShowError[Boolean] 是否显示异常）
   * @return {Promise} Promise
   */
  static invoke(serviceId, serviceParam = [], config = {}) {
    const umeConfig = config;
    // Headers
    umeConfig.headers = {
      TOKEN: Setaria.plugin.store.state.common.token,
    };
    // Url
    let url = BizUtil.getConfigValue('PROXY_KEY') + serviceId;
    // 默认使用POST
    const method = util.isEmpty(umeConfig.method) ? 'post' : umeConfig.method;
    // GET的场合，创建GET请求的URL
    if (method.toLowerCase() === 'get') {
      url = createGetUrl(serviceId, serviceParam);
    }
    // 超时时间
    if (umeConfig.timeout === undefined || umeConfig.timeout === null) {
      // 设置默认值
      umeConfig.timeout = BizUtil.getConfigValue('SERVICE_TIME_OUT');
    }
    if (util.isString(umeConfig.timeout)) {
      umeConfig.timeout = parseInt(umeConfig.timeout, 10);
    }
    // 设置加载提示状态
    Setaria.plugin.store.commit('common/loading', true);
    return new Promise((resolve, reject) => {
      // 调用指定服务
      Http[method](url, serviceParam, umeConfig).then((res) => {
        // 重置加载提示状态
        Setaria.plugin.store.commit('common/loading', false);
        const resData = res.data;
        // 收到错误信息的场合
        if (resData.resultCode !== SERVICE_EXEC_SUCCESS_CODE) {
          const exceptions = util.isEmpty(resData.exceptions) ?
            [] : resData.exceptions;
          const error = createAppErrByServerException(exceptions);
          if (config.isShowError === false) {
            reject(error);
          } else if (Object.hasOwnProperty.call(window, 'onunhandledrejection')) {
            reject(error);
          // 浏览器不支持unhandledrejection的场合
          } else {
            throw error;
          }
        }
        resolve(resData.resultObject);
      }).catch((error) => {
        // 重置加载提示状态
        Setaria.plugin.store.commit('common/loading', false);
        if (config.isShowError === false) {
          reject(error);
        } else {
          throwError(error);
        }
      });
    });
  }

  /**
   * 同时通过异步的方式调用多个服务
   * @example
   * 如果想调用WS001和WS002两个服务，可以使用如下方式调用：
   * const ws001 = {
   *  id: 'WS001',
   *  params: [aaa],
   * };
   * const ws002 = {
   *  id: 'WS002',
   *  params: [bbb],
   * };
   * const serviceArr = [ws001, ws002];
   * UmeHttp.invokeMulti(serviceArr).then((res) => {})
   * 如上res数组内的第一个元素为WS001服务的返回值，其他以此类推。
   * @param  {Array}  serviceArr  服务列表
   * @param  {Object} [config={}] 配置信息
   * @return {Promise}
   */
  static invokeMulti(serviceArr, config = {}) {
    const promiseArr = serviceArr.map(serviceObject =>
      UmeHttp.invoke(serviceObject.id, serviceObject.params, config));
    return Promise.all(promiseArr);
  }
}
