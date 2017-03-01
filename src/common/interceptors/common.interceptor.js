import { Loading, Message } from '@/common/services/ui';
import Util from '@/common/util';

/**
 * 显示/隐藏Loading
 * @param  {Boolean} value Loading标示
 */
function toggleLoading(value) {
  if (value) {
    Loading.service({ fullscreen: true });
  } else {
    Loading.service({ fullscreen: true }).close();
  }
}

/* eslint no-param-reassign: ["error", { "props": false }] */
export default function (request, next) {
  // 显示Loading
  toggleLoading(true);
  // 设置超时时间
  request.timeout = Util.getConfigValue('SERVICE_TIME_OUT') || 1000;

  next((response) => {
    // 隐藏Loading
    toggleLoading(false);
    // 出现网络异常的场合
    if (!response.ok) {
      Message({
        type: 'error',
        message: '服务调用出现网络错误，无法调用指定服务，请检查网络',
      });
    }
  });
}
