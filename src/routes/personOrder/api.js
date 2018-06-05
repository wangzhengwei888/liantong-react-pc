import { get ,post} from '../../utils/request';

// 打印pdf文件
export function printCartPDF(cartId){
    return get('/tradeApi/printCartPDF',cartId)
}
  
