import { Message, Notification } from 'element-ui';

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
   * 显示消息提示
   * 主要用于主动操作后的反馈提示（譬如用户新增成功或删除成功等情况）
   * @param  {String} options.type     消息类型
   * @param  {String} options.message  消息内容
   * @param  {Number} options.duration 显示时间, 毫秒。设为 0 则不会自动关闭
   * @param  {[type]} options.onClose  关闭时的回调函数
   * @return {Notification} Notification 实例 用于调用实例上的close函数关闭当前的Notification
   */
  static showMessage({ type = 'error', message = '' },
    { duration = 3000, onClose = null } = {}) {
    Message({
      type,
      title: UMEMessage.getTitleByMessageType(type),
      message,
      duration,
      onClose,
    });
  }

  /**
   * 显示通知
   * 主要用于系统级通知的被动提醒（譬如服务调用出现异常等情况）
   * @param  {String} options.type     消息类型
   * @param  {String} options.message  消息内容
   * @param  {Number} options.duration 显示时间, 毫秒。设为 0 则不会自动关闭
   * @param  {[type]} options.onClose  关闭时的回调函数
   * @return {Notification} Notification 实例 用于调用实例上的close函数关闭当前的Notification
   */
  static showNotify({ type = 'error', message = '' },
    { duration = 3000, onClose = null } = {}) {
    Notification({
      type,
      title: UMEMessage.getTitleByMessageType(type),
      message,
      duration,
      onClose,
    });
  }
}

export default UMEMessage;
