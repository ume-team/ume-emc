// import Vue from 'vue';

/* eslint no-param-reassign: ["error", { "props": false }] */
export default function (request, next) {
  request.url = `/api/${request.url}`;
  // if (Vue.Auth.getToken() !== '') {

  // }
  next();
}
