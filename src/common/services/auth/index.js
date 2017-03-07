import Auth from '@/common/services/auth/AuthService';

/* eslint no-param-reassign: ["error", { "props": false }] */
function install(Vue) {
  const auth = new Auth();
  Vue.Auth = auth;
  Vue.prototype.$auth = auth;
}
export default install;
