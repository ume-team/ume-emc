import UI from '../services/ui';

function showServiceErrorNotification(errMessage, errDuration = 3000) {
  UI.Notification({
    type: 'error',
    title: '服务异常',
    message: errMessage,
    duration: errDuration,
  });
}

/* eslint no-param-reassign: ["error", { "props": false }] */
export default function (request, next) {
  next((response) => {
    // 服务正常执行的场合
    if (response.ok) {
      const resData = response.data;
      // 返回业务异常的场合
      if (resData.resultCode !== 1) {
        const exceptions = resData.exceptions || [];
        if (exceptions.length > 0) {
          // Element-UI错误，直接循环调用会出现提醒消息重叠的现象
          exceptions.forEach((exception) => {
            setTimeout(() => {
              showServiceErrorNotification(exception.message);
            }, 100);
          });
        } else {
          showServiceErrorNotification('服务调用出现不明错误!');
        }
        response.ok = false;
      } else {
        response.data = resData.resultObject;
      }
    }
    return response;
  });
}
