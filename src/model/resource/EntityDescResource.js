import { util } from 'setaria';
import UmeHttp from '../UmeHttp';

export default class EntityDescResource {
  /**
   * 取得指定Entity的定义和描述
   * @param  {String} entityId   Entity ID
   * @return {Object}
   */
  static getEmDesc(entityId) {
    return UmeHttp.invoke('EMS10001', [entityId]);
  }

  /**
   * 取得指定Entity的定义和描述
   * @param  {String} entityId   Entity ID
   * @return {Object}
   */
  static getEmData(entityId, condition) {
    const jsonInput = condition;
    if (util.isEmpty(jsonInput.theSQLCondition)) {
      delete jsonInput.theSQLCondition;
    }
    return UmeHttp.invoke('EMS20001', ['Retrieve', entityId, jsonInput]);
  }

  /**
   * 根据搜索条件取得指定Entity数据的数量
   * @static
   * @param {any} entityId
   * @param {any} condition
   * @memberof EntityDescResource
   */
  static getEmDataCount(entityId, condition) {
    const jsonInput = condition;
    if (util.isEmpty(jsonInput.theSQLCondition)) {
      delete jsonInput.theSQLCondition;
    }
    return UmeHttp.invoke('EMS20001', ['Count', entityId, jsonInput]);
  }
}
