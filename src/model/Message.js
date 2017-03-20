import umeMessage from '@/config/message';
import util from '@/model/util';

function formatMessage(id, params) {
  let ret = util.isEmpty(umeMessage[id]) ? '' : umeMessage[id];
  if (!util.isEmpty(ret) && !util.isEmpty(params)) {
    params.forEach((item, index) => {
      ret = ret.split(`{${index}}`).join(params[index]);
    });
  }
  return ret;
}

function getMessageType(id) {
  let ret = '';
  const type = id.charAt(id.length - 1);
  switch (type) {
    case 'E':
      ret = 'error';
      break;
    case 'W':
      ret = 'warning';
      break;
    case 'I':
      ret = 'info';
      break;
    default:
      ret = 'error';
  }
  return ret;
}

export default class {
  constructor(id, params, message) {
    this.id = id;
    this.type = getMessageType(id);
    this.params = params;
    this.message = formatMessage(this.id, this.params);
    if (util.isEmpty(this.message) && !util.isEmpty(message)) {
      this.message = message;
    }
  }

  getMessage() {
    return this.message;
  }

  toString() {
    return this.message;
  }
}
