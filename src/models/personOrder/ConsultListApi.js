import { post, get } from '../../utils/request';


//提交询价单页面上面的列表
export function consultListTop(){
    return get('/goodsApi/enquiryGoodsList',)
}

//询价单提交数据
export function subimtConsultList(data){
    return post('/goodsApi/subQuoteOrder',{data})
}

// /goodsApi/updateEnquiryGoodsNum 更新询价商品数量
export function updateEnquiryGoodsNumApi(val){
 console.log(val)
 return post('/goodsApi/updateEnquiryGoodsNum',val)
}
//删除询价商品 /goodsApi/deleteEnquiryGoods
export function deleteEnquiryGoodsAPI(goodsId){
 console.log({goodsId})
 return post('/goodsApi/deleteEnquiryGoods',{goodsId})
}




