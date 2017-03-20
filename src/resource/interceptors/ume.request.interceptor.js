import auth from '@/model/auth';

/* eslint no-param-reassign: ["error", { "props": false }] */
function successHandler(request) {
  // 设置Token
  request.headers.TOKEN = auth.getToken();
  return request;
}

export default [
  successHandler,
];
