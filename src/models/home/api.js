import {  get,post } from '../../utils/request';


///line/list 获取企业专线列表接口  enter_id
export function getLineList(obj) {
 return get('/line/list',obj);
}
