import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import {  Link } from 'dva/router';
import {Button, Table, Icon, Modal, Tabs , message,Breadcrumb, Row, Col} from 'antd';
import GoodsBanner from './components/goodsBanner';
import ClassGoods from './components/classGoods';
import GoodsProfile from  './components/goodsProfile';
import GoodsProperty from  './components/goodsProperty';

import Search from '../../components/Search/Search';
import Navigation from '../../components/Navigation/Navigation'
import Img from '../../components/Img/Img';
import LeftNav from '../../components/LeftNav/LeftNav';

import { GoodsRecommed ,bottemDetail} from './api';
import { goods_box,  banne_box } from  './goodsDetail.less'
import {product_left_nav} from "../../components/LeftNav/LeftNav.less";
//import Link from "react-draft-wysiwyg/src/controls/Link/index";

const confirm = Modal.confirm;
const TabPane = Tabs.TabPane;

class GoodsDetail extends Component {
  constructor(props) {
    super(props);
    this.state={
      // goodsRecommed:[]
      count:1,
    }
  }

   columns = [
      {
        title: '商品编码',
        dataIndex: 'goodsErpCode',
        key: 'goodsErpCode',
        // render:(text, record, index) => (
        //   <div>{ index+1 }</div>
        // )
      },
      {
         title: '商品名称',
         dataIndex: 'goodsName',
         key: 'goodsName',
       },
      {
       title: '品牌',
       dataIndex: 'brandName',
       key: 'brandName',
      },
     {
       title: '规格',
       dataIndex: 'specName',
       key: 'specName',
       //render: text => <a href="#">{text}</a>,
     },
     {
       title: '包装',
       dataIndex: 'goodsSpec',
       key: 'goodsSpec',
     },
     {
       title: '市场价',
       dataIndex: 'goodsStorePrice',
       key: 'goodsStorePrice',
       render:text=><i style={{fontStyle:'normal'}}>{(text*1.00).toFixed(2)}</i>
     },
    //  {
    //    title: '成交价',
    //    dataIndex: 'classPath',
    //    key: 'classPath',
    //    //render: text => <a href="#">{text}</a>,
    //  },
     {
       title: '操作',
       dataIndex: '1',
       key: '1',
       render: (text, record, index) => {
        // to={`/goodsDetail/${record.goodsId}`}
        // onClick={this.addCart}
      //  console.log(record)
         return (
             <Row type="flex" justify="space-around">
               <Link style={{ color:'#3497ce' }} target="_blank" to={`/goodsDetail/${record.goodsId}`}>查看详情</Link>
             {/*  <p style={{ color:'#3497ce', cursor:'pointer' }}   onClick={()=>this.addCartXiang(record.goodsId,record.goodsStorePrice)}>购买</p>*/}
             </Row>
           )
       }
     }
   ];



   addCartXiang = (goodsId,goodsPrice) =>{
    let val ={
     goodsId:goodsId,
     count:this.state.count,
     goodsPrice:goodsPrice,
     saveType:0
    }
   //console.log(val.count)
    this.props.dispatch({type:'goodsDetail/addCart',val})
   }
   addGoodsFavorites =(goodsId) => {
    this.props.addGoodsFavorites(goodsId)
   }

  componentDidMount() {
    let { data } =this.props.goodsDetail;
  }
 addCart = (val) => {
   this.props.dispatch({type:'goodsDetail/addCart',val})
 }

 addGoodsFavorites = (goodsId) => {
 // console.log(goodsId)
  let goodsIds=goodsId
 // console.log(goodsIds)
  this.props.dispatch({type:'goodsDetail/addGoodsFavoritesEFF',goodsId:{goodsId:goodsId}})
}

//  addGoodsFavorites = (goodsId) =>{
//    this.props.dispatch({type:'goodsDetail/addGoodsFavoritesEFF',goodsId:goodsId})
//  }

//  relevantMore=(goodsId)=>{
//  relevantMore = (goodsId) =>{
    // let goodsId=goodsId;
  //   console.log(goodsId)
  //  this.props.dispatch({type:'goodsDetail/GetGoodsRecommed',goodsId:goodsId})
 // }


  render() {
    let { data ,isInfo,goodRecommedData} =this.props.goodsDetail;
     //console.log(goodRecommedData)
   //console.log(data[0]);
    console.log(goodRecommedData[0]);
    const { dispatch } = this.props;
    const {goodsRecommed} = this.state;
    if(!isInfo){
      return null
    }
    const goodsdetails=data[0];
    console.log(goodsdetails);
    return <div>
      <div><Search></Search></div>
      <div>
        <Navigation preson={false} >
          <div className="alls_guanggao_img"><Img style={{ width:'100%', height:"100%" }} src="upload/img/lmadv/1502347639097.jpg" /></div>

          <div className={goods_box}>
            {
              goodsdetails && <div>
                <div className={banne_box}>
                {/*
                  <div className="goodsDetail_crumbs">
                    <Breadcrumb separator=">">
                      <Breadcrumb.Item href="/">
                        <Icon type="home" />
                      </Breadcrumb.Item>
                      <Breadcrumb.Item href={`/store/${goodsdetails.storeId}`}>
                        <span>{goodsdetails.storeName}</span>
                      </Breadcrumb.Item>
                      <Breadcrumb.Item>
                        {goodsdetails.goodsName}
                      </Breadcrumb.Item>
                    </Breadcrumb>
                  </div>
                  */}
                  <div style={{position:'relative'}}>
                    {
                      goodsdetails.goodsCallyList && <GoodsBanner goodsdetails={goodsdetails}></GoodsBanner>
                    }


                    <GoodsProfile dispatch={ dispatch } addCart={this.addCart} addGoodsFavorites={this.addGoodsFavorites} goodsdetails={goodsdetails}></GoodsProfile>
                  </div>

                </div>


                {/*<div style={{ margin:'10px 0px' }}>以实际发货为准</div>*/}
                <GoodsProperty  goodsdetails={goodsdetails}></GoodsProperty>
                {/*<div className="card_container">
                 <Tabs type="card">
                 <TabPane tab="商品详细信息" key="1">
                 <div dangerouslySetInnerHTML={{ __html: goodsdetails.goodsProperty }}></div>
                 </TabPane>
                 <TabPane tab="商品说明书" key="2">
                 <div dangerouslySetInnerHTML={{ __html: goodsdetails.goodsProperty }}></div>
                 <p>Content of Tab Pane 2</p>
                 <p>Content of Tab Pane 2</p>
                 <p>Content of Tab Pane 2</p>
                 </TabPane>
                 </Tabs>
                 </div>*/}
                {/*<div className="class_goods_container">*/}
                  <Row  className="class_goods_container">
                    <Col span={12}>相关产品</Col>
                    <Col span={12} style={{ textAlign:'right'}}>
                       <Link title="查看更多" to={`/goodsDetail/relevantGoods/releventSearch/${goodsdetails.goodsId}`}
                        style={{ color: '#3599BB' }}> 查看更多相关产品>></Link>
                    </Col>
                  </Row>
                 {
                   goodRecommedData &&goodRecommedData[0]&&goodRecommedData[0].listApiGoods&&goodRecommedData[0].listApiGoods.length>0  ?
                     <Table bordered pagination={false} className="goodsDetail_tuijian"  dataSource={goodRecommedData[0].listApiGoods.slice(0,10)} rowKey={record => record.goodsId} columns={this.columns} />

                      :null
                 }
                   {/*</div>*/}

                {/*{*/}
                  {/*goodsdetails.recommendList && <ClassGoods goodsRecommed={goodsdetails.recommendList}></ClassGoods>*/}
                {/*}*/}

              </div>
            }
          </div>
        </Navigation>
      </div>
    </div>;
  }
}
GoodsDetail.propTypes = {}
export default connect(({goodsDetail})=>({goodsDetail}),(dispatch,own)=>{return {dispatch,own}})(GoodsDetail);
