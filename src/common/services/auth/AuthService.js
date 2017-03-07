import Vue from 'vue';
import util from '@/common/util';

/* eslint no-param-reassign: ["error", { "props": false }] */
export default class AuthService {
  constructor() {
    this.authObj = {
      token: '',
      userInfo: {},
    };
  }

  login(loginId, password) {
    return new Promise((resolve, reject) => {
      Vue.http.post('EMWS00001', [loginId, password]).then((res) => {
        // 鉴权成功的场合
        const resData = res.body;
        // 储存Token
        this.authObj.token = resData.token;
        // 储存用户信息
        this.authObj.userInfo = resData;
        resolve(res);
      }).catch((res) => {
        reject(res);
      });
    });
  }

  // logout() {

  // }

  isLogin() {
    return !util.isEmpty(this.authObj.token);
  }

  getUserInfo() {
    return this.authObj.userInfo;
  }

  getToken() {
    return this.authObj.token;
  }

  // check() {

  // }

  // fetchUserInfo() {

  // }
}
