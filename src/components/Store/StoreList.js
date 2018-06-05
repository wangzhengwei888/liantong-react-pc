/**
 * Created by 10400 on 2017/8/14.
 * 店铺首页页面-头部
 */
import React , { Component } from 'react';
import {Carousel,Icon,Pagination  } from 'antd';
import {} from '../../routes/store/store.less';
import Img from '../../components/Img/Img';
import LoginBtn from '../../components/loginBtn/loginBtn';
class  StoreIndexHeader extends Component{
  constructor(props){
    super(props);
    this.state={
    }
  }


  render (){
    const {goodsNewList,goodsSaleList} = this.props;
    let arr = window.location.pathname.split("/").slice(1,3);
    let storePath = arr.join("/");
    return (
      <div className="store_list">
        <div className="list_new_Arrivals list_content">
          <div className="new_Arrivals_top">
            <div className="img-iocn1"></div><span>新品推荐</span><a href={`/${storePath}/result/goodsName/`}>更多></a>
          </div>
          <div className="list_content_product">
            <ul>
              {!!goodsNewList && goodsNewList.map((newList,i)=>{
                return <li key={i}>
                  <a href={'/goodsDetail/' + newList.goodsId}>
                    <Img src={`${newList.goodsImage}`} />
                  </a>
                  <a href={'/goodsDetail/' + newList.goodsId}>
                    <p className="pro_title">{newList.goodsName}</p>
                  </a>
                    <p className="pro_specifications">规格：{newList.dosageFormName}</p>
                    <div className="pro_purchasing clearfix">
                      <div style={{float:'left'}}>采购价：</div>
                      <span><LoginBtn isChannelPrice={newList.isChannelPrice} useClass='smallBtn' title={newList.channelPrice} /></span>
                    </div>
                    <p className="pro_retai">零售价：￥<span style={{color:'#ff0000',fontWeight:'600'}}>{newList.goodsStorePrice}</span></p>

                </li>
              })}

            </ul>
          </div>
        </div>
        <div className="list_new_Arrivals list_content">
          <div className="new_Arrivals_top">
            <div className="img-iocn2"></div><span>热销商品</span><a href={`/${storePath}/result/goodsName/`}>更多></a>
          </div>
          <div className="list_content_product">
            <ul>
              {!!goodsSaleList && goodsSaleList.map((v,i)=>{
                return <li key={i}>
                  <a href={'/goodsDetail/' + v.goodsId} >
                    <Img src={`${v.goodsImage}`} />
                  </a>
                  <a href={'/goodsDetail/' + v.goodsId} >
                    <p className="pro_title">{v.goodsName}</p>
                  </a>
                    <p className="pro_specifications">规格：{v.specName}</p>
                    <div className="pro_purchasing "><div style={{float:'left',}}>采购价：</div><span><LoginBtn isChannelPrice={v.isChannelPrice} useClass='smallBtn' title={v.channelPrice}/></span></div>
                    <p className="pro_retai">零售价：￥<span style={{color:'#ff0000',fontWeight:'600'}}>{v.goodsStorePrice}</span></p>

                </li>
              })}
            </ul>
          </div>
        </div>

      </div>
    )
  }
}
export default StoreIndexHeader;
