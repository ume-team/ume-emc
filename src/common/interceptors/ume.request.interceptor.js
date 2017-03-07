import Vue from 'vue';

/* eslint no-param-reassign: ["error", { "props": false }] */
export default function (request, next) {
  request.url = `/api/${request.url}`;
  // 设置Token
  request.headers.set('TOKEN', Vue.Auth.getToken());
  next();
}
