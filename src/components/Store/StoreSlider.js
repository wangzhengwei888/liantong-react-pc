/**
 * Created by 10400 on 2017/8/14.
 * 店铺首页页面-头部
 */
import React , { Component } from 'react';
import {Carousel,Icon  } from 'antd';
import { connect } from 'dva';
import {} from '../../routes/store/store.less';
import Img from '../../components/Img/Img';
class  StoreIndexHeader extends Component{
  constructor(props){
    super(props);
    this.state={

    }
  }
  //加入收藏
  collect =()=>{
    const storeId = this.props.data[0].storeId;
    let v = {
      storeId:storeId,
      favType:2
    }
    this.props.dispatch({type:"store/storeCollectionEFF",payload:v});
  }
//取消收藏
  nocollect=()=>{
    const storeId = this.props.data[0].storeId;
    let v = {
      storeId:storeId
    }
    this.props.dispatch({type:"store/cancleCollectionEFF",payload:v});
  }

  render (){
    const {data} = this.props;

    let isFav = this.props.store.isFavData;
    return (

      <div className="store_top_r">
        {data.length > 0 && <div>
          <div className="silde_logo">
            <Img src={data[0].storeLogo ? `${data[0].storeLogo}` : "/upload/img/store/0/1504690841511.jpg"} />
            <p>综合评价：<span style={{color:'#fc2a2b'}}>{`${data[0].storeCredit}分`}</span></p>
          </div>
          {isFav == 0 ? <div className="collectBtn collectBtn_bg" onClick={this.collect}>收藏</div> :
            <div className="collectBtn collectBtn_bg1" onClick={this.nocollect}>已收藏</div>
          }

          <ul className="store_list1">
            <li><h2>动态评价</h2></li>
            <li><p>{`描述相符：${data[0].storeDesccredit}分`}<Icon type="arrow-up" style={{color:'#fc2a2b',fontSize:'12px',paddingLeft:'2px'}}/></p></li>
            <li><p>{`服务态度：${data[0].storeServicecredit}分`}<Icon type="arrow-up" style={{color:'#fc2a2b',fontSize:'12px',paddingLeft:'2px'}}/></p></li>
            <li><p>{`发货速度：${data[0].storeDeliverycredit}分`}<Icon type="arrow-down" style={{color:'#fc2a2b',fontSize:'12px',paddingLeft:'2px'}}/></p></li>
          </ul>
          <ul className="store_list2">
            <li><h2>店铺信息</h2></li>
            <li><p>创建时间：2016-2-19</p></li>
            <li><p>{`所在地：${data[0].areaInfo} ${data[0].storeAddress}`}</p></li>
            <li><p>商品数量：<span style={{color:'#fc2a2b'}}>{data[0].storeGoodsCount}</span>件商品</p></li>
            <li><p>收藏数量：<span style={{color:'#fc2a2b'}}>{data[0].storeCollect}</span>人收藏</p></li>
          </ul>
        </div> }

      </div>
    )
  }
}
export default connect(({store})=>({store}),(dispatch,own)=>{return {dispatch,own}})(StoreIndexHeader);
