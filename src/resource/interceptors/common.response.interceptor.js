import Message from '@/model/Message';
import util from '@/model/util';

function successHandler(response) {
  return response;
}

function errorHandler(error) {
  let ret = error;
  // 服务未在指定时间内返回结果的场合
  if (error.message.indexOf('timeout of') === 0) {
    // 取得配置的服务调用超时时间
    const timeout = parseInt(util.getConfigValue('SERVICE_TIME_OUT'), 10) / 1000;
    ret = new Message('MAM003E', [timeout]);
  }
  return Promise.reject([ret]);
}
export default [
  successHandler,
  errorHandler,
];
