import { Notification } from 'element-ui';

/* eslint class-methods-use-this: ["error",
  { "exceptMethods": ["getTitleByMessageType"] }] */
class UMEMessage {
  /**
   * 根据消息类型取得通知窗口标题
   * @param  {String} type 消息类型
   * @return {String} 通知窗口标题
   */
  static getTitleByMessageType(type) {
    let ret = '';
    switch (type) {
      case 'error':
        ret = '错误';
        break;
      case 'warning':
        ret = '警告';
        break;
      case 'info':
        ret = '提示';
        break;
      default:
        ret = '错误';
    }
    return ret;
  }

  /**
   * 显示消息
   * @param  {String} options.type    消息类型
   * @param  {String} options.message 消息内容
   */
  static show({ type = 'error', message = '' }) {
    Notification({
      type,
      title: UMEMessage.getTitleByMessageType(type),
      message,
      duration: 3000,
    });
  }
}

export default UMEMessage;
