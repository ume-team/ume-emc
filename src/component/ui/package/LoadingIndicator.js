import { Loading } from 'setaria-ui';
import Util from '@/model/Util';

let instance = null;

export default class {
  static show() {
    if (Util.isEmpty(instance)) {
      instance = Loading.service({
        fullscreen: true,
        text: Util.getConfigValue('LOADING_TEXT'),
      });
    }
  }

  static hide() {
    if (!Util.isEmpty(instance)) {
      instance.close();
      instance = null;
    }
  }
}
