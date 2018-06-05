import { post, get } from '../../utils/request';


//getOrderInvoiceList获取发票列表
export function getOrderInvoiceListApi(){
 return post('/tradeApi/getOrderInvoiceList')
}
//保存发票信息saveOrderInvoice
export function saveOrderInvoiceAPI( value ){
 console.log(value)
 return post('/tradeApi/saveOrderInvoice',value,'json')
}
