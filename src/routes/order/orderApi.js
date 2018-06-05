import { post, get } from '../../utils/request';

/*保存或修改发票信息*/
export  function addInvoice(invTitle,invContent,invState) {
  //POST /restApi/v1.0/getMobileCode     获取验证码
  return get('/invoiceApi/addInvoice',{
    invTitle,
    invContent,
    invState});
}
/*保存订单*/
export  function saveorder(cartIds,addressId,paytype,freight,invoiceId,isPd) {
  //POST /restApi/v1.0/getMobileCode     获取验证码
  return get('/orderApi/saveorder',{
    cartIds,addressId,paytype,freight,invoiceId,isPd
  });
}
