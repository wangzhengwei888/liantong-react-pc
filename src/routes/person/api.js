import { get } from '../../utils/request';


export  function getMobileCode(values) {
  //POST /restApi/v1.0/getMobileCode     获取验证码
  return get('/memberApi/verify',values);
}

export  function getPurTemplateItemAPI(obj) {
  return get('/purtemplateApi/getPurTemplateItem',obj);
}

export  function deletePurTemplateAPI(id) {
  return get('/purtemplateApi/deletePurTemplate', { templateId:id });
}

export  function deletePurTemplateItemAPI(id) {
  return get('/purtemplateApi/deletePurTemplateItem', { itemId:id });
}


