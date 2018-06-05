import React , { Component } from 'react';
import { connect } from 'dva';
import { Row, Col,Button,Input,Pagination,Carousel} from 'antd';
import { routerRedux } from 'dva/router';
import PropTypes from 'prop-types';

import { strollStore_Content } from './strollStore.less';
import Img from '../../components/Img/Img';
import Search from '../../components/Search/Search'
import Navigation from '../../components/Navigation/Navigation'

const Search1 = Input.Search;


class StrollStore extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }




  render() {
    const { goodsClass,navList} =this.props.home;
    const { storeListData } =this.props.app;
    const { strollStoreBanner } =this.props.strollStore;

    return (

      <div>
        <div><Search></Search></div>
        <div><Navigation data={goodsClass} navList ={navList}></Navigation></div>
        <div className={strollStore_Content} >

          <div className="head_img">
            <Carousel autoplay={true}>
              {strollStoreBanner.length > 0 && strollStoreBanner[0].advList.map((list,index)=>{
                return (
                  <Img key={index} src={list.resUrl} />
                )
              })}
            </Carousel>
          </div>
          <div className="strollStore_content" >
           <div className="content_img">
             <img style={{width:'100%'}} src={require('../../assets/shop_2_03.png')} />
           </div>
            <div className="strollStore_name">
              <div className="head">
                店铺名称
              </div>
              <div className="StoreName_content">
                {storeListData && storeListData.map((v,i)=>{
                  return <div className="Store_list clearfix" key={i} >
                    <a style={{color:'black'}} href={`/store/${v.storeId}`}>
                      <span style={{float:'left',
                        width:'58%',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'}} title={`${v.storeName}`}>{v.storeName}</span>
                      <span style={{float:'right',width:'40%'}}>商品数：<span style={{fontWeight:'bold',fontSize: '16px',verticalAlign: 'initial',color:'red'}}>{v.storeGoodsCount}</span></span>
                    </a>
                  </div>
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}


export default connect(({home,app,strollStore})=>({home,app,strollStore}),(dispatch,own)=>{return {dispatch,own}})(StrollStore);
