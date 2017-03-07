import _ from 'lodash';
import moment from 'moment';
import 'moment/locale/zh-cn';
import config from '../../config';


function getConfigValue(key) {
  const env = process.env.NODE_ENV === 'production' ? 'build' : 'dev';
  const result = config[env].env[key];
  return result ? result.replace(/"/g, '') : '';
}

function getNow(format = 'LL') {
  return moment().format(format);
}

function isEmpty(value) {
  return _.isEmpty(value);
}

function isEqual(value, other) {
  return _.isEqual(value, other);
}

function cloneDeep(objects) {
  return _.cloneDeep(objects);
}

export default {
  getConfigValue,
  getNow,
  isEmpty,
  isEqual,
  cloneDeep,
};
