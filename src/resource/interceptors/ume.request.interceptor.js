import auth from '@/model/auth';

/* eslint no-param-reassign: ["error", { "props": false }] */
export default function (request, next) {
  request.url = `/api/${request.url}`;
  // 设置Token
  request.headers.set('TOKEN', auth.getToken());
  next();
}
