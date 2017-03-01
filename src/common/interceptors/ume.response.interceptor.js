import { Message } from '../services/ui';

/* eslint no-param-reassign: ["error", { "props": false }] */
export default function (request, next) {
  next((response) => {
    // 服务正常执行的场合
    if (response.ok) {
      const resData = response.data;
      // 返回业务异常的场合
      if (resData.resultCode !== 1) {
        Message({
          type: 'error',
          message: resData.message || '出现业务异常！',
        });
      }
    }
    return response;
  });
}
