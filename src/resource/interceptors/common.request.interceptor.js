function successHandler(request) {
  return request;
}

function errorHandler(response) {
  return response;
}

export default [
  successHandler,
  errorHandler,
];
