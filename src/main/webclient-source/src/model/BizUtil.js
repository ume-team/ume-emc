import { util } from 'setaria';
import envConfig from '../../config';

export default class BizUtil {
  static getConfigValue(key) {
    const env = util.isProdunctionEnv() ? 'build' : 'dev';
    const result = envConfig[env].env[key];
    return result ? result.replace(/"/g, '') : '';
  }
}
