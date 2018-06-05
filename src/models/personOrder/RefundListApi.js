import { post, get } from '../../utils/request';

//退货申请列表
export function returnListApi(obj){
 return get('/orderApi/returnList',obj);
}


