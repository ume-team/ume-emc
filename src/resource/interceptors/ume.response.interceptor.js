import Message from '@/model/Message';
import util from '@/model/util';

/* eslint no-param-reassign: ["error", { "props": false }] */
function successHandler(response) {
  const resData = response.data;
  // 返回业务异常的场合
  if (resData.resultCode !== 1) {
    const exceptions = util.isEmpty(resData.exceptions) ?
      [] : resData.exceptions;
    const errors = exceptions.map(({ id, message }) =>
        new Message(id, null, message));
    return Promise.reject(errors);
  }
  return resData.resultObject;
}

export default [successHandler];
