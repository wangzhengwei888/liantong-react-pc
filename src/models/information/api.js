import { post, get } from '../../utils/request';

//新闻中心和导航数据
export function informationIndexAPI (){
  return get('contentExhibitionApi/index ',{});
}
//资讯详情页数据
export function informationDetailedAPI (contentId){
  // console.log(val)
  return get('contentExhibitionApi/detailed',{contentId});
}
//资讯列表页数据
export function articleListAPI (val){
  // console.log(val)
  return get('contentExhibitionApi/articleList',val);
}
//评价列表
export function evaluationAPI (val){
  return get('contentExhibitionApi/commentList ',val);
}

