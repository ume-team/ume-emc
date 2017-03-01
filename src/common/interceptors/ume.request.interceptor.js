/* eslint no-param-reassign: ["error", { "props": false }] */
export default function (request, next) {
  request.url = `/api/${request.url}`;
  // TODO 鉴权
  next();
}
