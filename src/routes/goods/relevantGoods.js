//相关产品列表页
import React, {Component} from 'react';
import {connect} from 'dva';
import {Row,message, Col, Button, Icon, Breadcrumb, Menu, Dropdown,Pagination, Input, Select,Modal} from 'antd';
import {routerRedux,Link} from 'dva/router';
import {getFullUrl} from '../../utils/common';
import PropTypes from 'prop-types';
import GoodsShow_one from '../home/goodsShow_one'
import {BodyHeadImg} from '../../components/Advertising/Advertising'
import Search from '../../components/Search/Search';
import Navigation from '../../components/Navigation/Navigation'
import Img from '../../components/Img/Img';
import { GoodsRecommed ,bottemDetail} from './api';
import { goods_box,  banne_box ,peoductSearch_Content} from  './relevantGoods.less'
import {product_left_nav} from "../../components/LeftNav/LeftNav.less";
import pathToRegexp from 'path-to-regexp';

const InputGroup = Input.Group;
const Option = Select.Option;



class RelevantGoods extends Component {
 constructor(props) {
  super(props)
  this.state = {

    sortField: '',  //搜索排序
    sortOrder: 'asc',//asc
    pageSize: '10',
    count: '0',
    isLoading: true,
    min: '',
    max: '',
    update: false
  }

 }


//相关商品加入购物车
 addCarshop = (goodsId, channelPrice, count) => {
   console.log(goodsId, channelPrice, count);
   let val ={
    goodsId:goodsId,
    count:count,
    goodsPrice:channelPrice,
   }
  this.props.dispatch({type: 'goodsDetail/addCart', val});
 }


//相关商品加入收藏
addGoodsFavorites = (goodsId) => {
  this.props.dispatch({type:'goodsDetail/addGoodsFavoritesEFF',goodsId:{goodsId:goodsId}})
}

 //加入询价单
 goInquiry = (goodsId,count) => {
  let vals ={
    goodsId:goodsId,
    num:count,
   }
   // console.log(goodsId,count)
   this.props.dispatch({ type:'goodsDetail/addInquiryEFF' , val:{ goodsId:goodsId,num:count} });
}


 onChange = (pageNumber) => {
  var val={};
  var str=window.location.href;
  var num=str.indexOf("relevantGoods");
   str=str.substr(num);
  var arr=str.split("/");

  if(arr[1]!='releventSearch'){
      val.searchType=arr[1];
      val.keyword=arr[2];

      val.pageNo=pageNumber;
      val.pageSize='10';
      val.sortField=this.state.sortField;
      val.sortOrder=this.state.sortOrder;
      
      this.props.dispatch({type: 'goodsDetail/goodsListSearchEEF', val:val })
  }
  else{
    val.goodsId=arr[2];
    val.pageNo=pageNumber;
    val.pageSize='10';
    val.sortField=this.state.sortField;
    val.sortOrder=this.state.sortOrder;
    this.props.dispatch({type: 'goodsDetail/GetGoodsRecommedEEF', val:val })
  }

  // val.goodsId=arr[1];
  // val.pageNo=pageNumber;
  // val.pageSize='10';
  // val.sortField=this.state.sortField;
  // val.sortOrder=this.state.sortOrder;
  // this.props.dispatch({type: 'goodsDetail/GetGoodsRecommedEEF', val:val })
 }

 goodsSort = (sortField) => {
  var val={};
  var str=window.location.href;
  var num=str.indexOf("relevantGoods");
   str=str.substr(num);
  var arr=str.split("/");
  // val.goodsId=arr[1];
  
  console.log(arr)
   
  if(arr[1]!='releventSearch'){
    val.searchType=arr[1];
    val.keyword=arr[2];
    if (sortField) {
      this.setState({
        sortField: sortField,
        sortOrder: this.state.sortOrder == 'asc' ? 'desc' : 'asc',
        update: true,
       })
       val.sortField=sortField;
       val.sortOrder=this.state.sortOrder;
       this.props.dispatch({type: 'goodsDetail/goodsListSearchEEF', val:val })
    }else {
      this.setState({
        sortField: sortField,
        update: true,
       })
       this.props.dispatch({type: 'goodsDetail/goodsListSearchEEF', val:val })
    }
  }else{
    val.goodsId=arr[2];
    if (sortField) {
      this.setState({
        sortField: sortField,
        sortOrder: this.state.sortOrder == 'asc' ? 'desc' : 'asc',
        update: true,
       })
       val.sortField=sortField;
       val.sortOrder=this.state.sortOrder;
       this.props.dispatch({type: 'goodsDetail/GetGoodsRecommedEEF', val:val })
    }else {
      this.setState({
        sortField: sortField,
        update: true,
       })
       this.props.dispatch({type: 'goodsDetail/GetGoodsRecommedEEF', val:val })
    }
  
  }

  // if (sortField) {
  //   this.setState({
  //     sortField: sortField,
  //     sortOrder: this.state.sortOrder == 'asc' ? 'desc' : 'asc',
  //     update: true,
  //    })
  //    val.sortField=sortField;
  //    val.sortOrder=this.state.sortOrder;
  //    this.props.dispatch({type: 'goodsDetail/GetGoodsRecommedEEF', val:val })
  // }else {
  //   this.setState({
  //     sortField: sortField,
  //     update: true,
  //    })
  //    this.props.dispatch({type: 'goodsDetail/GetGoodsRecommedEEF', val:val })
  // }
 }
 deleteGoodsFavorites = (goodsId) => {
  Modal.confirm({
   title: '确定要取消收藏吗？',
   content: '',
   onOk: () => {
    this.props.dispatch({type: 'goodsDetail/deleteGoodsFavoritesEFF', goodsId:{goodsId:goodsId}});
   },
   onCancel() {

   },
  })
 }
 SwitchList1 = () => {
  this.setState({
   Switch: 1
  })
 };
//  switch1 = () => {
//   return (
//    this.props.goodsList.data && this.props.goodsList.data.length ?
//     <GoodsShow_two goodsList={this.props}/> : <div></div>
//   )
//  }
 onKeyDown1 = (e) => {
  console.log(e.target.value)
  let val = e.target.value
  this.setState({
   min: val
  })
 }

 onKeyDown2 = (e) => {
  console.log(e.target.value)
  let val = e.target.value
  this.setState({
   max: val
  })
 }

 onPriceIndex = () => {

  var val={};
  var str=window.location.href;
  var num=str.indexOf("relevantGoods");
   str=str.substr(num);
  var arr=str.split("/");

  if(arr[1]!='releventSearch'){
    val.searchType=arr[1];
    val.keyword=arr[2];
    let  minimumPrice= this.state.min || '';
    let  maximumPrice= this.state.max || '';
  
    val.minimumPrice=minimumPrice;
    val.maximumPrice=maximumPrice
    this.setState({
      update: true,
     })
     this.props.dispatch({type: 'goodsDetail/goodsListSearchEEF', val:val })

  }else{
    val.goodsId=arr[2];
    let  minimumPrice= this.state.min || '';
    let  maximumPrice= this.state.max || '';
  
    val.minimumPrice=minimumPrice;
    val.maximumPrice=maximumPrice
    this.setState({
      update: true,
     })
    this.props.dispatch({type: 'goodsDetail/GetGoodsRecommedEEF', val:val })
  }

  // val.goodsId=arr[1]
  // let  minimumPrice= this.state.min || '';
  // let  maximumPrice= this.state.max || '';

  // val.minimumPrice=minimumPrice;
  // val.maximumPrice=maximumPrice
  // this.setState({
  //   update: true,
  //  })
  // this.props.dispatch({type: 'goodsDetail/GetGoodsRecommedEEF', val:val })
 }



 render() {
  let num1 = 0;
  let num2 = 0;

     let { goodRecommedData} =this.props.goodsDetail;
  //const {peoductSearchBannerData} = this.props.goodsList;

  // const {goodsList} = this.props;
  // let {shopListObj} = goodsList;
  // console.log(goodRecommedData)
  return (
     <div>

       <div><Search></Search></div>
       <Navigation preson={false}>
        <div  className={peoductSearch_Content}>
        <div className="accurate_Topimg"></div>
          <div className="sizer">
                <div className="div1"  style={{width:'8%'}}>排序方式：</div>
                <div className={this.state.sortField == '' ? 'active div1' : ' div1'} onClick={() => this.goodsSort('')}>
                默认</div>

                <div className={this.state.sortField == 'goodsStorePrice' ? 'active div1' : ' div1'}
                    onClick={() => this.goodsSort('goodsStorePrice')}>
                价格<Icon
                type={this.state.sortOrder == 'asc' && this.state.sortField == 'goodsStorePrice' ? 'arrow-up' : 'arrow-down'}/>
                </div>
                <div className='div3'>
                <div className='div3_box'>
                  <InputGroup compact>
                  <Input onKeyUp={(e) => {
                    this.onKeyDown1(e)
                  }} style={{width: 100, textAlign: 'center'}} placeholder="最低价"/>
                  <Input style={{width: 24, borderLeft: 0, margin: '0px 0px', pointerEvents: 'none', backgroundColor: '#fff'}}
                          placeholder="--" disabled/>
                  <Input onKeyUp={(e) => {
                    this.onKeyDown2(e)
                  }} style={{width: 100, textAlign: 'center', borderLeft: 0}} placeholder="最高价"/>
                  </InputGroup>
                </div>
                <Button onClick={this.onPriceIndex}>确认</Button>
                </div>
                <div className="div2">
                <div style={{float: 'right', height: '100%', margin: '0px 6px'}}>

                  <div>总共<span style={{
                  color: '#3497CE',
                  margin: '0px 6px'

                  }}>{ goodRecommedData && goodRecommedData[0]&&
                      goodRecommedData[0].listApiGoods && goodRecommedData[0].totalRows ?
                      goodRecommedData[0].totalRows: 0}
                      </span>条记录
                  </div>
                </div>
                </div>
          </div>

          {/*页面*/}
          <div>
              <div style={{"flexWrap": "wrap", display: 'flex'}}>
                  <div style={{borderBottom: '1px solid #ddd', width: '100%', height: '20px'}}></div>
                    {
                      goodRecommedData && goodRecommedData[0] && goodRecommedData[0].listApiGoods.length>0 ?
                      goodRecommedData[0].listApiGoods.map((list, index) => {
                      return <GoodsShow_one key={index} index={index} img={list}
                       addCart={(goodsId, goodsPrice, count) => {this.addCarshop(goodsId, goodsPrice, count)}}
                       addGoodsFavorites={this.addGoodsFavorites}
                       deleteGoodsFavorites={this.deleteGoodsFavorites}
                       goInquiry={(goodsId, count) => {this.goInquiry(goodsId,count)}}
                       />
                      }) : <div></div>
                    }
              </div>
             {/*分页*/}
              {
                goodRecommedData && goodRecommedData[0] && goodRecommedData[0].listApiGoods && goodRecommedData[0].listApiGoods.length>0 ?
                  <div className="cantent_paging">
                    <Pagination showQuickJumper
                                defaultCurrent={1}
                                defaultPageSize={12}
                                total={ goodRecommedData && goodRecommedData[0] && goodRecommedData[0].listApiGoods.length>0  &&goodRecommedData[0].totalRows}
                                onChange={this.onChange}/>
                  </div> : <p style={{textAlign: 'center', marginTop: '40px', color: '#ccc'}}>没有查找到您要的商品</p>
                }

          </div>
        </div>
       </Navigation>
    </div>





  );
 }
}


export default connect(({goodsDetail, app,goodsList}) => ({goodsDetail, app,goodsList}), (dispatch, own) => {
 return {dispatch, own}
})(RelevantGoods);
