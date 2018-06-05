import { get } from '../../utils/request';

/*添加购物车*/
export  function addCart(goodsId,count,specId,saveType,goodsPrice) {
  //POST /restApi/v1.0/getMobileCode     获取验证码
  return get('/cartapi/addCart',{
    goodsId,count,specId,saveType,goodsPrice
  });
}
/*商品推荐*/
export  function GoodsRecommed() {
  return get('/goodsApi/GoodsRecommed',{

  });
}
/*商品详情*/
export  function bottemDetail(goodsId) {

  return get('/goodsApi/bottemDetail',{
    goodsId
  });
}
/*获取规格ID、规格的价钱和库存，根据商品ID和规格值得IDS*/
export  function getSpecByGoodsIdAndSpecIds(goodsId,specIds) {
  return get('/goodsApi/getSpecByGoodsIdAndSpecIds',{
    goodsId,
    specIds
  });
}
/*根据规则id获取规格值*/
export  function specValue(specId) {
  return get('/goodsApi/specValue',{
    specId
  });
}

// 打印COApdf文件
export function printCoaPDF(val){
  return get('/goodsApi/printCoaPDF',val)
}
// /goodsApi/printCoaPDF

// 打印MSDSpdf文件
export function printMSDSPDF(val){
  return get('/goodsApi/printCsdsPDF',val)
}
// /goodsApi/printCsdsPDF
// /goodsApi/printCsdsPDF
