/**
 * UME鉴权模块
 * @version 1.0
 * @author HanL
 */
import resource from '@/resource';
import util from '@/model/util';

/* eslint no-param-reassign: ["error", { "props": false }] */
export default {
  authObj: {
    token: '',
    userInfo: {},
  },

  /**
   * 登录处理
   * @param  {String}  loginId  用户ID
   * @param  {String}  password 用户密码
   * @return {Promise} Promise
   */
  login(loginId, password) {
    return new Promise((resolve) => {
      // 执行鉴权服务
      resource.invoke('EMWS00001', [loginId, password]).then((res) => {
        // 储存Token
        this.authObj.token = res.token;
        // 储存用户信息
        this.authObj.userInfo = res;
        resolve(res);
      });
    });
  },

  /**
   * 登出处理
   * @return {Promise} Promise
   */
  logout() {
    return new Promise((resolve) => {
      const userId = this.getUserInfo().user.userId;
      resource.invoke('EMWS00002', [userId]).then((res) => {
        this.authObj.token = '';
        this.authObj.userInfo = {};
        resolve(res);
      });
    });
  },

  /**
   * 取得登录状态
   * @return {Boolean} 已经登录的场合，返回true，否则返回false
   */
  isLogin() {
    return !util.isEmpty(this.authObj.token);
  },

  /**
   * 取得当前用户信息
   * @return {Object} 当前用户信息
   */
  getUserInfo() {
    return this.authObj.userInfo;
  },

  /**
   * 取得当前Token值
   * @return {String} 当前Token值
   */
  getToken() {
    return this.authObj.token;
  },

  // check() {

  // },

  // fetchUserInfo() {

  // },
};
