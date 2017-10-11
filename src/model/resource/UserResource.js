import Setaria, { util } from 'setaria';
import UmeHttp from '../UmeHttp';

// 用户信息
// let userObject = null;

export default class User {
  /**
   * 登录
   * @param  {String}  userId   用户Id
   * @param  {String}  password 密码
   * @return {Promise}
   */
  static login(userId, password) {
    return new Promise((resolve, reject) => {
      // 调用鉴权服务
      UmeHttp.invoke('EMS00001', [userId, password]).then((res) => {
        Setaria.plugin.store.commit('common/user', res);
        Setaria.plugin.store.commit('common/token', res.token);
        resolve(res);
      }).catch((err) => {
        reject(err);
      });
    });
  }

  /**
   * 登出
   * @return {Promise}
   */
  static logout(userId) {
    return UmeHttp.invoke('EMS00002', [userId]);
  }

  /**
   * 取得当前用户信息
   * @static
   * @returns
   * @memberof User
   */
  static getUser() {
    return Setaria.plugin.store.state.common.user;
  }

  /**
   * 判断当前用户是否登陆
   * @return {Boolean} 当前用户已经登陆的场合，返回true
   */
  static isLogin() {
    return !util.isEmpty(Setaria.plugin.store.state.common.token);
  }
}
