import React, {Component} from 'react'
import {BodyHeadImg} from '../../components/Advertising/Advertising'
import {Breadcrumb, Checkbox, Row, Col, Pagination, Input, Button, Form, Modal, message} from 'antd'
import {Link} from 'dva/router'
import {connect} from 'dva'
import {fav_list} from './FavList.less'
import Img from "../../components/Img/Img"
import Search from '../../components/Search/Search'
import Navigation from '../../components/Navigation/Navigation'
import FavListFloor from './FavListFloor'

const FormItem = Form.Item;

class FavList extends Component {
 state = {
  value: 0,
  checkAll: false,
  moveToTop: false
 }
 handleSubmit = (e) => {
  e.preventDefault();
  this.props.form.validateFields((err, values) => {
   if (!err) {
    console.log('Received values of form: ', values);
    this.props.dispatch({type: "favList/searchFavGoods", payload: values})
   }
  });
 }

 // 选择商品
 checkGoods = (checkedGoods, checked) => {
  let value = {
   checkedGoods,
   checked
  }
  this.props.dispatch({type: 'favList/checkGoodsEFF', payload: value})
 }
 delGoods = (goodsId) => {
  const value = {
   goodsId: goodsId
  }
  console.log(value)
  Modal.confirm({
   title: '您确定要删除吗?',
   content: '',
   onOk: () => {
    console.log(value)
    this.props.dispatch({type: 'favList/deleteGoodsFavoritesEFF', payload: value});
   },
   onCancel() {
    console.log('取消');
   },
  });
 }
 //删除选中的商品
 delSelGoods = () => {
  let goodsId = [];
  this.props.favList.goodsFavoritesList.forEach(goods => {
   if (goods.checked) {
    goodsId.push(goods.goodsId);
   }
  })
  if (goodsId.length == 0) {
   message.info('请先选择商品', 1)
   return;
  }
  Modal.confirm({
   title: '提示',
   content: '确定删除吗',
   okText: '确定',
   cancelText: '取消',
   onOk: () => {
    let value = {
     goodsId: goodsId.join(',')
    }
    this.props.dispatch({type: 'favList/deleteGoodsFavoritesEFF', payload: value});
   },
   maskClosable: true
  });

 }
 //全选
 checkAll = (checked) => {
  this.props.dispatch({type: 'favList/checkAllEFF', payload: checked});
 }
 addCart = (goodsId, goodsPrice) => {
  let val = {
   goodsId: goodsId,
   count: 1,
   goodsPrice: goodsPrice,
   saveType: 0
  }
  console.log(val)
  this.props.dispatch({type: 'favList/addCart', val});
 }
 handleAddCarts = () => {
  let purTemplateItems = [];
  this.props.favList.goodsFavoritesList.forEach(function (v, index, array) {
   if (v.checked) {
    if(v.goodsStorePrice > 0 && v.isControlInfo == 1){
     purTemplateItems.push({goodsId: v.goodsId, newGoodsPrice: v.goodsStorePrice, goodsNum: 1, goodsSource: 0})
    }
   }
  });
  if (purTemplateItems.length == 0) {
   message.info('请先选择商品', 1)
   return;
  }
  this.props.dispatch({
   type: 'favList/getAddCartBachEFF',
   arr: purTemplateItems
  })

  if (this.props.initState) {
   this.setState({
    dataSource: []
   })
  }
 }

 getScroollHieght = () => {
  let winH = document.documentElement.clientHeight || document.body.clientHeight;
  // let documentH = document.documentElement.scrollHeight || document.body.scrollHeight;
  let dataTableH = this.refs.favListTab.offsetHeight;
  let ElescrollTop = document.body.scrollTop || document.documentElement.scrollTop;
  // console.log(dataTableH)
  // console.log(winH)
  // console.log(ElescrollTop)
  if (dataTableH > winH && ElescrollTop > 485) {
   this.setState({
    moveToTop: true
   })
  } else {
   this.setState({
    moveToTop: false
   })
  }
 }
 componentDidMount = () => {
  document.addEventListener("scroll", this.getScroollHieght, false);
 }
 componentWillUnmount = () => {
  document.removeEventListener("scroll", this.getScroollHieght, false)
 }

 render() {
  const {goodsFavoritesList, checkAll} = this.props.favList
  const {getFieldDecorator} = this.props.form;
  console.log(this.props.favList)
  return (
   <div>
    <Search></Search>
    <Navigation preson={true}>
     <div className={fav_list}>
     <div className="my_account_dynamic_Topimg"></div>
      <Breadcrumb separator=">" className='security_nav_bar'>
       <Breadcrumb.Item href="/presonAccunt/myAccount">我的账户</Breadcrumb.Item>
       <Breadcrumb.Item href="/personOrder/favList" style={{fontSize:'16px', fontWeight:'bold' }}>我的收藏夹</Breadcrumb.Item>
      </Breadcrumb>
      <div className="filter_bar">
       <Form onSubmit={this.handleSubmit} layout="inline">
        <FormItem labelCol={{span: 24}}>
         {getFieldDecorator('goodsName')(
          <Input placeholder="商品编号/名称"/>
         )}
        </FormItem>
        <FormItem>
         <Button type="primary" htmlType="submit" ghost>搜索</Button>
        </FormItem>
       </Form>
      </div>
      <div className="orderList_content">
       <Row className="orderList_content_head">
        <Col span={2}>
         <Checkbox
          onChange={(e) => this.checkAll(e.target.checked)}
          checked={checkAll}
         >
          全选
         </Checkbox></Col>
        <Col span={8}>基本信息</Col>
        <Col span={7}>商品属性</Col>
        <Col span={4}>交易信息</Col>
        <Col span={3}>操作</Col>
       </Row>
      </div>
      {goodsFavoritesList && goodsFavoritesList.length > 0 ?
       <div>
       <div ref='favListTab'>
        {goodsFavoritesList.map((list, index) => {
         return (<FavListFloor data={list || []} key={index} delGoods={this.delGoods} checkGoods={this.checkGoods}
                               addCart={this.addCart}></FavListFloor>)
        })}
       </div>
        {goodsFavoritesList && goodsFavoritesList.length > 0 ? <div className={this.state.moveToTop ? "gift_cart_settlement moveToTop" : "gift_cart_settlement"}>
       <Checkbox
       onChange={(e) => this.checkAll(e.target.checked)}
       checked={checkAll}
       >
       全选
       </Checkbox>
       <a onClick={() => this.delSelGoods()}>删除选中商品</a>
        {/* <span style={{color: '#3599BB'}}>查看全部收藏产品></span>*/}
       <button onClick={() => this.handleAddCarts()}>加入购物车</button>
       </div> : <p style={{textAlign: "center", margin: '10px'}}>无数据</p>}
       </div>
       : <p style={{textAlign: "center", margin: '10px'}}>无数据</p>
      }
     </div>
    </Navigation>
   </div>
  )
 }
}

export default connect(({favList}) => ({favList}), (dispatch) => {
 return {dispatch}
})(Form.create()(FavList))
