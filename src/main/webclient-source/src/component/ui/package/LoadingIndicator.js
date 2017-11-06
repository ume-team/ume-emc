import { util } from 'setaria';
import { Loading } from 'setaria-ui';
import BizUtil from '@/model/BizUtil';

let instance = null;

export default class {
  static show() {
    if (util.isEmpty(instance)) {
      instance = Loading.service({
        fullscreen: true,
        text: BizUtil.getConfigValue('LOADING_TEXT'),
      });
    }
  }

  static hide() {
    if (!util.isEmpty(instance)) {
      instance.close();
      instance = null;
    }
  }
}
