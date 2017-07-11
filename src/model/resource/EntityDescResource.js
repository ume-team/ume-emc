import UmeHttp from '../UmeHttp';

export default class EntityDescResource {
  /**
   * 取得指定Entity的定义和描述
   * @param  {String} entityId   Entity ID
   * @return {Object}
   */
  static getEmDescAndData(entityId, category, jsonInput) {
    const getEmDesc = {
      id: 'EMS10001',
      params: [entityId],
    };
    const getEntityData = {
      id: 'EMS20001',
      params: [category, entityId, jsonInput],
    };
    const serviceArray = [getEmDesc, getEntityData];
    return new Promise((resolve) => {
      UmeHttp.invokeMulti(serviceArray).then(([entityDesc, entityData]) => {
        resolve({
          entityDesc,
          entityData,
        });
      });
    });
  }
}
