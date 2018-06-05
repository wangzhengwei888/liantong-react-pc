/**
 * Created by b2b2c on 2017/9/8.
 */
import React, {Component} from 'react';
import {connect} from 'dva';
import {Row, Col, Button, Icon, Breadcrumb, Menu, Dropdown, Modal, Form, Input, message} from 'antd';
import {Pagination,} from 'antd';
import {routerRedux} from 'dva/router';
import {getFullUrl } from '../../utils/common';
import {isLogin} from '../../utils/request'
import Stepper from '../../components/Stepper/Stepper';
import Img from '../../components/Img/Img';
import LoginBtn from '../../components/loginBtn/loginBtn'
import Price from '../../components/Price/price'
import PropTypes from 'prop-types';
import { IMAGE_DOMAIN } from '../../utils/common';
import defaultPhoto from '../../assets/defaultPhoto.jpeg';

const FormItem = Form.Item;

// const DemoBox = props => <p className={`height-${props.value}`}>{props.children}</p>;

class GoodsShow_one extends Component {
 constructor(props) {
  super(props)
  this.state = {
   visible: false,
   goodsId: '',
   none1: true,
   none2: true,
 //  count:1,
  }
  this.isLogin = isLogin();
 }

 /*改变购买数量*/
 onChangeNum = (val) => {
  console.log(val)
  this.setState({
   count: val
  })
 }
//  addCarshop = (goodsId, goodsPrice, count) => {
//   // const {goodsList}=this.props;
//   // console.log(goodsList);
//   this.props.goodsList.dispatch({
//    type: 'goodsList/addCartEFF',
//    goodsId: goodsId,
//    goodsPrice: goodsPrice,
//    count: count,
//    specId: '',
//    saveType: '',
//   });
//   this.props.goodsList.dispatch({type: 'app/getcartCountEFF'});
//   // setTimeout(this.props.dispatch({type:'app/getcartCountEFF'}),2000);
//  }
//相关商品加入购物车
 addCarshop = (goodsId,goodsPrice) => {

  let _this = this
  let timer = setTimeout(function(){
   _this.props.addCart(goodsId,goodsPrice,_this.state.count);
  },310)
 }
 //相关商品加入收藏
 addGoodsFavorites = (goodsId) => {
//   console.log(goodsId)
  if(this.isLogin){
   this.props.addGoodsFavorites(goodsId);
  }else{
   message.warning('请登录',1.5,()=>{})
  }
 }


 goInquiry=(goodsId,count='1')=>{
  if(this.isLogin){
    this.props.goInquiry(goodsId,count);
   }else{
    message.warning('请登录',1.5,()=>{})
   }
 }


 //删除收藏
 deleteGoodsFavorites = (goodsId) =>{
  if(this.isLogin){
   this.props.deleteGoodsFavorites(goodsId)
  }else{
   message.warning('请登录',1.5,()=>{})
  }
 }



 showModal = (goodsId) => {
//   console.log(goodsId)
  this.setState({
   visible: true,
   goodsId: goodsId
  });
 }


  // //加入询价单
  // goInquiry =(goodsId,count)=>{

  //   let vals ={
  //     goodsId:goodsId,
  //     num:count,
  //    }
  //    // console.log(goodsId,count)
  //    this.props.dispatch({ type:'goodsDetail/addInquiryEFF' , val:{ goodsId:goodsId,num:count} });

  // }




 handleCancel = (e) => {
  this.setState({
   visible: false,
  });
 }

 handleOk = (e) => {
  this.props.form.validateFields((err, values) => {
//    console.log(this.props)
   if (!err) {
    console.log(values.remark);
    if (!values.remark || values.remark.trim() == '') {
     message.info('备注信息不能为空');
     return;
    }
    if (!values.applyUser || values.applyUser.trim() == '') {
     message.info('联系人姓名不能为空');
     return;
    }
    if (!values.tel || values.tel.trim() == '') {
     message.info('联系人手机号不能为空');
     return;
    }
    if (!/^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/.test(values.tel.replace(/\s/g, ''))) {
     message.info('手机号格式不正确');
     return;
    }
    this.props.goodsList.dispatch({type: 'app/applyChannelEFF', goodsId: this.state.goodsId, ...values});
    this.setState({
     visible: false,
    });
   }
  });

 }




 render() {
  const formItemLayout = {
   labelCol: {span: 6},
   wrapperCol: {span: 14},
  };
  const imgSrc1 = this.state.none1;
  const imgSrc2 = this.state.none2 ? '../../assets/view_details_b.png' : '../../assets/view_details_h.png';
  const {getFieldDecorator} = this.props.form;
  const {img = [], index,init,key} = this.props;
  // console.log(this.props)
  let {visible} = this.state;



  return (
   <div key={key} style={{"flexWrap": "wrap", display: 'flex', width: '100%'}}>

    {/*return(*/}
    <div className="content_goods">
     <Row type="flex" justify="space-between" style={{width: '100%', fontSize: '.9rem'}}>
      <Col span={4}>
       <div className="goods_img">
          <a href={`/goodsDetail/${img.goodsId}`} target="_blank ">
            <Img src={img.goodsImage}/>
          </a>
       </div>
      </Col>
      <Col span={20}>
        <Col span={24} style={{overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis'}}>
         <a href={`/goodsDetail/${img.goodsId}`} target="_blank ">
          <span style={{fontWeight: '600', cursor: 'pointer', fontSize: '1rem'}}>{img.goodsName}</span></a>
        </Col>
        <Col span={24}>
         <Col span={7}>
          <Row type="flex" align="top">
           <Col span={24} style={{overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis'}}>
            {(img.brandName && img.goodsSerial) ?
             <p>品牌/原厂货号：<span>{img.brandName}/{img.goodsSerial}</span></p> :
             (img.brandName) ? <p>品牌：<span>{img.brandName}</span></p> :
              (img.goodsSerial) ? <p>原厂货号：<span>{img.goodsSerial}</span></p> : null
            }
            {(img.goodsErpCode) ? <p>国药编码：<span>{img.goodsErpCode}</span></p> : null}
            {(img.specName) ? <p>规格：<span>{img.specName}</span></p> : null}
            {(img.goodsSpec) ? <p>包装：<span>{img.goodsSpec}</span></p> : null}
            {(img.storageCondition && img.shippingCondition) ?
             <p>储存/运输条件：<span>{img.storageCondition}/{img.shippingCondition}</span></p> :
             (img.storageCondition) ? <p>储存条件：<span>{img.storageCondition}</span></p> :
              (img.shippingCondition) ? <p>运输条件：<span>{img.shippingCondition}</span></p> : null
            }
           </Col>
          </Row>
         </Col>
         <Col span={11}>
          <Row type="flex" justify="space-around" align="top">
           <Col span={12}>
            <div>

            </div>
            { img.isReagent == '1' ?
             <div>
              {(img.casNo) ? <p>CAS号：<span>{img.casNo}</span></p> : null}

              {(img.dangerousNature) ? <p>危险性质：<span dangerouslySetInnerHTML={{ __html: img.dangerousNature }}></span></p> : null}
              {(img.controlInfo) ? <p>管制信息：<span style={{color: 'red'}} dangerouslySetInnerHTML={{ __html: img.controlInfo }}></span></p> : null}
             </div>
             : img.isReagent == '0' && img.goodsDescription ?
                <p
                  style={{display:'inline-block'}}
                  >
                    <span   className='describe' dangerouslySetInnerHTML={{ __html: img.goodsDescription.length > 80 ? img.goodsDescription.substr(0,80) + "..." : img.goodsDescription}}></span>
                </p>
               : null
            }
           </Col>
           <Col span={9}>
            <div style={{display: 'flex', flexWrap: 'wrap'}}>
             <div style={{float: 'left',}}>成交价：</div>
             <Price  pj={img.goodsStorePrice} bz={img.SCurrency} bj={img.SCurrencyPrice} scj={false}/>
            </div>
            <div style={{display: 'flex', flexWrap: 'wrap'}}><div style={{float: 'left',}}>市场价：</div><Price pj={img.goodsStorePrice} bz={img.SCurrency} bj={img.SCurrencyPrice} scj={true}/></div>
            <p>库存：<span>{img.goodsShowStorage}</span></p>
            {/*{*/}
             {/*img.activityApiVo && img.activityApiVo.couponList && img.activityApiVo.couponList.isActivity == 1 ?*/}
            {/*<div className='shop-cuxiao'>*/}
               {/*<a>劵*/}
                {/*<p className='shop-cuxiao_content'>*/}
                 {/*{*/}
                  {/*img.activityApiVo.couponList.activityRuleList.map((i, v) => {*/}
                   {/*return <span key={v}> <i>{i.ruleDescription}</i><b></b><br/></span>*/}
                  {/*})*/}
                 {/*}*/}
                {/*</p>*/}
               {/*</a>*/}
            {/*</div>: null*/}
            {/*}*/}
            <div className='shop-cuxiao'>
             {
              img.activityApiVo && img.activityApiVo.couponList && img.activityApiVo.couponList.isActivity == 1 ?
               <a>劵
                <p className='shop-cuxiao_content'>
                 {
                  img.activityApiVo.couponList.activityRuleList.map((i, v) => {
                   return <span key={v}> <i>{i.ruleDescription}</i><b></b><br/></span>
                  })
                 }
                </p>
               </a> : null
             }
             {
              img.activityApiVo.mansongList && img.activityApiVo.mansongList.isActivity == 1 ?
               <a>满赠
                <p className='shop-cuxiao_content'>
                 {
                  img.activityApiVo.mansongList.activityRuleList.map((i, v) => {
                   return <span key={v}> <i>{i.ruleDescription}</i><b></b><br/></span>
                  })
                 }
                </p>
               </a> : null
             }
             {
              img.activityApiVo.mansongList && img.activityApiVo.cuxiaoList.isActivity == 1 ?
               <a>促销
                {/*<p className='shop-cuxiao_content'>*/}
                 {/*{*/}
                  {/*img.activityApiVo.mansongList.activityRuleList.map((i, v) => {*/}
                   {/*return <span key={v}> <i>{i.ruleDescription}</i><b></b><br/></span>*/}
                  {/*})*/}
                 {/*}*/}
                {/*</p>*/}
               </a> : null
             }
            </div>

            {/*<p>是否拆零：<span>{img.isSellpiece == 1 ? '是' : '否'}</span></p>*/}
           </Col>
           {/*<Col span={10}>*/}
           {/*<p>规格：<span>{img.goodsSpec}</span></p>*/}
           {/*<p>件包装：<span>{img.packTotal}</span></p>*/}
           {/*<p>&nbsp;<span></span></p>*/}
           {/*</Col>*/}
           {/* num={img.isSellpiece == 0 ? img.packTotal : 1} min={img.isSellpiece == 0 ? img.packTotal : 1}
        max={img.maxBuyNum == 0 ? img.goodsNowStorage : img.maxBuyNum}
        step={img.isSellpiece == 0 ? img.packTotal : 1}
        */}
          </Row>
         </Col>
         <Col span={6}>
          <Row type="flex" justify="space-around" align="middle">
           <Col span={2}></Col>
           <Col span={22}>
            <div style={{marginBottom: '10px'}}><span style={{marginRight: '1rem', float: 'left'}}>购买数量</span>
             <Stepper nowNum={img.goodsNowStorage}
                      btnClassName='btnClass'
                      inputClassName='inputClass'
                      min={1}
                      step={1}
                      max={1000}
                      num={1}
                      key={init+index}
                      onUpdate={(val) => { this.onChangeNum(val) }}
                      disabled={false}/>
            </div>
            <div>
             {

              img.goodsStorePrice > 0 && img.isControlInfo == 1 ? <LoginBtn useClass='priceBtn' title={<Button type="primary"
                                                                                     onClick={() => this.addCarshop(img.goodsId, img.goodsStorePrice)}>加入购物车</Button>}/>:
               <LoginBtn useClass='priceBtn' title={<Button type="primary"
                                            // onClick={() => this.showModal(img.goodsId)}
                                     //    onClick={() => this.goInquiry(img.goodsId,this.state.count)}
                                         onClick={()=> this.goInquiry(img.goodsId,this.state.count) }
                                                            >请询价</Button>}/>
             }
             <div style={{float: 'right', lineHeight: '38px'}}>
              {/*<a className={imgSrc1 ? 'isguanzhu11' : 'isguanzhu12'}*/}
                 {/*href='javascript:void(0)'*/}
                 {/*onClick={()=> this.addGoodsFavorites(img.goodsId) }*/}
              {/*/>*/}
              {
               this.isLogin && img.isFavorite == 1 ? <a className='isguanzhu12'
                                        href='javascript:void(0)' onClick={()=> this.deleteGoodsFavorites(img.goodsId) }/> :
                <a className='isguanzhu11'
                   href='javascript:void(0)'
                   onClick={()=> this.addGoodsFavorites(img.goodsId) }
                />
              }
              <a className={imgSrc2 ? 'isguanzhu21' : 'isguanzhu22'} href={`/goodsDetail/${img.goodsId}`} target="_blank "/>
             </div>
            </div>
           </Col>
           {/*<Col span={6}><div style={{alignContent:'center'}}>库存：<span>{img.goodsShowStorage}</span></div></Col>*/}
          </Row>
         </Col>
        </Col>
      </Col>
     </Row>
    </div>


    <Modal
     title="没有采购权限"
     visible={visible}
     onOk={this.handleOk}
     onCancel={this.handleCancel}
     footer={
      <Row type="flex" justify="space-around">
       <Col> <Button type="primary" onClick={this.handleOk}>立即申请</Button></Col>
       <Col> <Button onClick={this.handleCancel}>以后再说</Button></Col>
      </Row>
     }
    >
     <div style={{height: '50px', lineHeight: '50px', textAlign: 'center', fontSize: '16px', color: '#000'}}>
      您好，如需采购，请向卖家申请开通采购权限。
     </div>
     <FormItem
      {...formItemLayout}
      label={<span style={{fontSize: '16px', fontWeight: 'bold'}}>备注信息</span>}
     >
      {getFieldDecorator('remark', {})(
       <Input/>
      )}
     </FormItem>
     <FormItem
      {...formItemLayout}
      label={<span style={{fontSize: '16px', fontWeight: 'bold'}}>联系人姓名</span>}
     >
      {getFieldDecorator('applyUser', {})(
       <Input/>
      )}
     </FormItem>
     <FormItem
      {...formItemLayout}
      label={<span style={{fontSize: '16px', fontWeight: 'bold'}}>联系人电话</span>}
     >
      {getFieldDecorator('tel', {})(
       <Input/>
      )}
     </FormItem>
    </Modal>

   </div>
  );
 }
}

GoodsShow_one.propTypes = {
 dispatch: PropTypes.func,
}


export default Form.create()(GoodsShow_one);
