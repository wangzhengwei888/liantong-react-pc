import { post, get } from '../../utils/request';


export  function goodsbatchlist(obj) {
  return get('/goodsApi/goodsbatchlist',obj);
}
