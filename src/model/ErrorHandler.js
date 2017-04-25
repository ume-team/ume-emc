import ApplicationError from '@/model/ApplicationError';
import Util from '@/model/Util';

export default class ErrorHandler {
  static handleError(error, source) {
    let ret = null;
    const isErrorFromVue = source instanceof Object;

    if (error instanceof ApplicationError) {
      ret = error;
    } else if (error instanceof Object
      && Object.prototype.hasOwnProperty.call(error, 'message')) {
      ret = new ApplicationError(null, null, error.message);
    } else if (error instanceof String) {
      ret = new ApplicationError(null, null, error);
    }
    if (ret === null || ret === undefined
      || (!Util.isEmpty(ret) && Util.isEmpty(ret.message))
      // 生产环境下不显示具体的代码错误
      || (Util.isProdunctionEnv() && isErrorFromVue)) {
      ret = new ApplicationError('MAM004E');
    }

    // 对Vue.config.errorHandler接口进行实现的场合，Vue不会在控制台显示错误。
    if (isErrorFromVue) {
      /* eslint no-console: ["error", { allow: ["warn", "error"] }] */
      console.error(error);
    }
    return ret;
  }
}
