import {  get,post,del } from '../../utils/request'
//s上传认证信息
export function saveAttachmentFileAPI(val){
 console.log(val)
 return get('/memberApi/saveAttachmentFile',val)
}
//上传历史记录
export function getAttachmentListAPI(val){
 console.log(val)
 return get('memberApi/getAttachmentList',val)
}
//启用/禁用资质
export function setUpdateAttachment(val){
 console.log(val)
 return get('memberApi/updateAttachment',val)
}
