import Message from '@/model/Message';

function successHandler(response) {
  return response;
}

function errorHandler() {
  return Promise.reject([new Message('MAM001E')]);
}
export default [
  successHandler,
  errorHandler,
];
