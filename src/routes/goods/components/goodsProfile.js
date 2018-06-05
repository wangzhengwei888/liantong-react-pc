import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import LoginBtn from '../../../components/loginBtn/loginBtn'
import Price from '../../../components/Price/price'
import Stepper from '../../../components/Stepper/Stepper'
import { Form, Tag,Button,Radio,message, Modal, Row, Col, Input } from 'antd'
import { itemInfo_wrap, priceSubmit } from  './goodsProfile.less'
//import { addCart ,getSpecByGoodsIdAndSpecIds} from '../api';
import {isLogin} from '../../../utils/request';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const { TextArea } = Input;
import { IMAGE_DOMAIN } from '../../../utils/common';

import { routerRedux, Link } from 'dva/router';
//import Link from "react-draft-wysiwyg/src/controls/Link/index";
/**
 * Created by leimingtech-lhm on 2017/8/10.
 * 商品信息组件
 */
class GoodsProfile extends Component {
 constructor(props) {
  super(props);
  this.state = {
   goodsNmae: `${this.props.goodsName}`,
   goodsPrice: "",
   buyCount: this.props.buyCount,
   count:1,
   visible:false,
   priceVisible:false,
   isLogin:isLogin()
  }
 }
 onChange=(e)=> {
  const {goodsdetails}=this.props;
  // console.log(`radio checked:${e.target.value}`);
  /*getSpecByGoodsIdAndSpecIds(goodsdetails.goodsId,goodsdetails.specId).then(result => {
    if(result.result == 1){
      console.log(result.data)
    }
  })*/

 }
 /*修改规格*/
 onChangeSpec = (spec) => {
  // const {goodsdetails}=this.props;
  // const { goodsSpec, goodsSpecValueAll } = goodsdetails;
  // console.log(goodsSpec)
  // 当前选择的所有规则
  /* let currentSpecs = goodsSpec.specGoodsSpec;
   // 删除当前规则组的所有子选项
   const goodsSpecValueGroup = goodsSpecValueAll[spec.spId];
   // 只有1个规则项，不做处理
   if (goodsSpecValueGroup.length == 1) {
     // console.log(this.refs[`specGroup-${spec.spId}`]);
     // const currentGroup = this.refs[`specGroup-${spec.spId}`];
     return;
   } else {
     //  当前规则组 ，存在多个规则时 切换处理
     goodsSpecValueAll[spec.spId].forEach(item => {
       delete currentSpecs[item.spValueId]
     })
     this.onChangeNum(1);
     // 添加当前规则到 已选择的规则
     currentSpecs[spec.spValueId] = spec.spValueName
     const specIds = Object.keys(currentSpecs).join()
     goodsDetailApi.getSpecByGoodsIdAndSpecIds({
       goodsId: goodsSpec.goodsId,
       specIds
     }).then(result => {
       if (result.result == 1) {
         const data = result.data[0]
         // 更新组件相关数据
         this.setState({
           goodsSpec: {
             ...this.state.goodsSpec,
             specGoodsPrice: data.price,
             specGoodsStorage: data.num,
             goodsSpecId: data.specId
           }
         })
         // 同步状态到外部页面
         this.props.onChangeSpec(currentSpecs, data);
       }
     })
   }*/
 }

 // 切换包装



 /*改变购买数量*/
 onChangeNum=(val)=>{
  //console.log(val)
  this.setState({
   count: val
  })
  console.log(val);

 }
 addCarshop = (count) => {
  const {goodsdetails}=this.props;
 // console.log(count)

  this.props.dispatch({ type:'goodsDetail/addCartEFF' , goodsId:goodsdetails.goodsId, count:count || 1, specId:goodsdetails.specId, saveType:0, goodsPrice:goodsdetails.goodsStorePrice })
  /*添加到采购单*/
  // addCart( goodsdetails.goodsId,count || 1,goodsdetails.specId,0, goodsdetails.channelPrice).then(result => {
  //   if (result.result == 1) {
  //     console.log(result.result)
  //     // 同步购物车数量
  //     this.props.dispatch({type:'app/getcartCountEFF'});
  //     message.success('成功添加加入采购订单！');
  //
  //     this.props.dispatch(routerRedux.push('/cart'));
  //
  //   } else {
  //     message.error('呀！出了点小错，请重新添加');
  //   }
  // });
 }




 handleOk = (e) => {
  this.props.form.validateFields((err, values) => {
   if (!err) {
  //  console.log(values.remark);
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
    if (!/^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/.test(values.tel.replace(/\s/g,''))) {
     message.info('手机号格式不正确');
     return;
    }
    this.props.dispatch({ type:'app/applyChannelEFF' , goodsId:this.props.goodsId, ...values });
    this.setState({
     visible: false,
    });
   }
  });

 }

onChanges(value) {
  console.log('changed', value);
 }
 handleCancel = (e) => {
  this.setState({
   visible: false,
  });
 }

 showPriceModal = () => {
  this.setState({
   priceVisible: true,
  });
 }
 // cartCount=()=>{
 //  console.log(this.props.goodsdetails.goodsId);
 //  console.log(this.props.goodsdetails.count);
 //  console.log(this.props.goodsdetails.goodsPrice);
 //
 //  this.props.dispatch({ type: 'app/cartCount',goodsId:goodsId,count:count,goodsPrice:goodsPrice,saveType:saveType});
 //
 // }
 showModal = (goodsId) => {
  //   console.log(goodsId)
    this.setState({
     visible: true,
     goodsId: goodsId
    });
   }


 handlePriceOk = (e) => {

  this.props.form.validateFields(['price','num','contacts','tel','remarkPrice'],(err, values) => {
   if (!err) {
    this.props.dispatch({ type:'goodsDetail/priceFeedbackEFF' , pOBJ:{ goodsId:this.props.goodsdetails.goodsId, remark:values.remarkPrice,  ...values, } });
    this.setState({
     priceVisible: false,
    });
   }
  });


 }
 addCart = (goodsId,goodsPrice,count,imgs) =>{
  let val ={
   goodsId:goodsId,
   count:count,
   goodsPrice:goodsPrice,
   defaultImage:imgs,
   saveType:0
  }
  console.log(val)
  this.props.addCart(val);
 }
 addGoodsFavorites =(goodsId) => {
  console.log(this.state.isLogin)

  if(this.state.isLogin){
   this.props.addGoodsFavorites(goodsId)
  }
  else
   message.error('请先登录账号')

 }

 //加入询价单
 goInquiry =(goodsId,count)=>{

  let vals ={
    goodsId:goodsId,
    num:count,
   }
   // console.log(goodsId,count)
   this.props.dispatch({ type:'goodsDetail/addInquiryEFF' , val:{ goodsId:goodsId,num:count} });

}

jumpToPrint=(goodsId)=>{
  let   val = "parentId=4&goodsId="+goodsId+"" ;
  this.props.dispatch(routerRedux.push(`/technology/goodsCMSPrint?${val}`));
}



 handlePriceCancel = (e) => {
  this.setState({
   priceVisible: false,
  });
 }

 CheckImgExists = (imgurl) => {
  let ImgObj = new Image(); //判断图片是否存在
  ImgObj.src = `${IMAGE_DOMAIN}${imgurl}`;
  if (ImgObj.fileSize > 0 || (ImgObj.width > 0 && ImgObj.height > 0)) {
   return true;
  } else {
   return false;
  }
 }


 render() {
  const formItemLayout = {
   labelCol: { span: 6 },
   wrapperCol: { span: 14 },
  };
  const { goodsdetails }=this.props;
  const { getFieldDecorator } = this.props.form;
  let { visible, priceVisible } = this.state;

  let imgs = goodsdetails.goodsCallyList.find((imgurl)=>{
   return this.CheckImgExists(imgurl);
  });
  if(!imgs){
   imgs = goodsdetails.defaultImage
  }

  return <div className={itemInfo_wrap}>
   <div className="sku-name">
    {(goodsdetails.goodsName=="NULL"||goodsdetails.goodsName==''||goodsdetails.goodsName==undefined)?'':(goodsdetails.goodsName)}
   </div>
   <div className="other_name">
    {(goodsdetails.controlInfo=='NUll'||goodsdetails.controlInfo==''||goodsdetails.controlInfo==undefined||goodsdetails.controlInfo=='NA'||goodsdetails.isControlInfo==0)?(goodsdetails.specName+" | "+goodsdetails.goodsSpec):(goodsdetails.controlInfo+" | "+goodsdetails.specName+" | "+goodsdetails.goodsSpec)}
   </div>

   <div className="goods-news">
    <div className="price-title">成交价<span></span></div>

    {(goodsdetails.goodsStorePrice===goodsdetails.goodsStorePrice)

      ?  <span style={{display:'inline-block',width:'250px'}} ><Price  pj={goodsdetails.goodsStorePrice} bz={goodsdetails.SCurrency} bj={goodsdetails.SCurrencyPrice} scj={false}/></span>
      :<Price style={{color:'red'}} useClass='priceBtn' pj={goodsdetails.goodsStorePrice} bz={goodsdetails.SCurrency} bj={goodsdetails.SCurrencyPrice} scj={false}/>
    }


    <div className="price-lang-title" >市场价<span></span></div>
    <Price useClass='mark-money' pj={goodsdetails.goodsStorePrice} bz={goodsdetails.SCurrency} bj={goodsdetails.SCurrencyPrice} scj={true}/>
   </div>
   {goodsdetails.activityApiVo.mansongList.isActivity == 1 ?
    <div className="goods-info-cuxiao">
     <Row className='mansong'>
      <Col span={3}>
       <p>满送活动</p>
      </Col>
      <Col span={5}>
       <p  style={{color:'#666' }}>{goodsdetails.activityApiVo.mansongList.activity.activityName}</p>
      </Col>
      <Col span={14}>
       <p>
        {
         goodsdetails.activityApiVo.mansongList.activityRuleList.map((i,v)=>{
          return <span key={v}><b style={{marginRight:'10px'}}>{i.ruleDescription}</b></span>
         })
        }
       </p>
      </Col>
     </Row>
    </div>
    :null
   }
   {goodsdetails.activityApiVo.cuxiaoList.isActivity == 1 ?
    <div className="goods-info-cuxiao">
     <Row className='mansong'>
      <Col span={3}>
       <p>促销活动</p>
      </Col>
      <Col span={5}>
       <p>{goodsdetails.activityApiVo.cuxiaoList.activityName}：
        <span style={{marginLeft:'10px',color:'red'}}>{goodsdetails.activityApiVo.cuxiaoList.activityPrice}</span>
       </p>
      </Col>
      <Col span={14}>
       {/*<p>*/}
        {/*{*/}
         {/*goodsdetails.activityApiVo.mansongList.activityRuleList.map((i,v)=>{*/}
          {/*return <span key={v}><b style={{marginRight:'10px'}}>{i.ruleDescription}</b></span>*/}
         {/*})*/}
        {/*}*/}
       {/*</p>*/}
        {/*<p  style={{color:'#666' }}>{goodsdetails.activityApiVo.cuxiaoList.activityTypeName}:*/}
        {/*<span>{goodsdetails.activityApiVo.cuxiaoList.activityPrice}</span>*/}
        {/*</p>*/}
      </Col>
     </Row>
    </div>
    :null
   }
   <div className="goods-info-bottom">
    <div className="other-info_lr">
     <div className="price-title">国药编号</div>
     {(goodsdetails.goodsErpCode=='NUll'||goodsdetails.goodsErpCode==''||goodsdetails.goodsErpCode==undefined)?'':<div className="other-info">{goodsdetails.goodsErpCode}</div>}
    </div>
    <div className="other-info_lr">
     <div className="price-title">原厂货号</div>
     {(goodsdetails.goodsSerial=='NUll'||goodsdetails.goodsSerial==''||goodsdetails.goodsSerial==undefined)?'':<div className="other-info" >{goodsdetails.goodsSerial}</div>}
     {/*storageRemark*/}
    </div>
   </div>



   <div className="goods-info-bottom">
    <div className="other-info_lr">
     <div className="price-title">品牌</div>
     {(goodsdetails.brandName=='NUll'||goodsdetails.brandName==''||goodsdetails.brandName==undefined)?'':<div className="other-info">{goodsdetails.brandName}</div>}
    </div>
    <div className="other-info_lr">
     <div className="price-title">规格(<Link to='/customservice?parentId=6&articleId=18a65c2902bd441aaf9e4d673f18ad19&headImage=/static/head/customService_dynamic_Topimg.jpg' target='_black' style={{textDecoration: 'underline'}}>说明</Link>)</div>
     {(goodsdetails.specName=='NUll'||goodsdetails.specName==''||goodsdetails.specName==undefined)?'':<div className="other-info"title={goodsdetails.specName} style={{width:'220px',overflow:'hidden',whiteSpace:'nowrap',textOverflow:' ellipsis'}}>{goodsdetails.specName}</div>}
    </div>
   </div>

   <div className="goods-info-bottom">
    <div className="other-info_lr">
      <div className="price-title">储存条件</div>
     {(goodsdetails.storageCondition=='NUll'||goodsdetails.storageCondition==''||goodsdetails.storageCondition==undefined)?'':<div className="other-info">{goodsdetails.storageCondition}</div>}
    </div>
    <div className="other-info_lr">
      <div className="price-title">运输条件</div>
      {(goodsdetails.shippingCondition=='NUll'||goodsdetails.shippingCondition==''||goodsdetails.shippingCondition==undefined)?'':<div className="other-info">{goodsdetails.shippingCondition}</div>}
    </div>
    </div>



   <div className="goods-info-bottom">
    <div className="other-info_lr">
     <div className="price-title">包装</div>
     {(goodsdetails.goodsSpec=='NUll'||goodsdetails.goodsSpec==''||goodsdetails.goodsSpec==undefined)?'':<div className="other-info">{goodsdetails.goodsSpec} </div>}
    </div>
    <div className="other-info_lr">
     <div className="price-title">库存</div>
      {(goodsdetails.goodsShowStorage=='NUll'||goodsdetails.goodsShowStorage==''||goodsdetails.goodsShowStorage==undefined)?'':<div className="other-info">{goodsdetails.goodsShowStorage}</div>}
    </div>
   </div>



   <div className="goods-info-none">
    <div className="price-title">购买数量：</div>
    <div className="other-info">
     <Stepper
      key={this.props.form.getFieldValue('radio-button')}
      step={1}
      num={1}
      nowNum={100000000000000000}
      min={1}
      max={100000000000000}
      onUpdate={(val) => {this.onChangeNum(val)}}>
     </Stepper>
    </div>

   </div>

   <div className="goods-info-none">
    <div className="other-info">
      {
        goodsdetails.goodsStorePrice > 0 && goodsdetails.isControlInfo == 1 ? <LoginBtn useClass='priceBtn' title={<Button type="primary"
        onClick={()=>this.addCart(goodsdetails.goodsId,goodsdetails.goodsStorePrice,this.state.count,imgs)}>加入购物车</Button>}/>:
        <LoginBtn useClass='priceBtn' title={<Button type="primary"
                    //  onClick={() => this.showModal(goodsdetails.goodsId)}
                     onClick={() => this.goInquiry(goodsdetails.goodsId,this.state.count,imgs)}
                       >请询价</Button>}/>
      }

     <Button type="primary" style={{ height:'28px', width:'90px', marginLeft:'10px', verticalAlign:'middle' }} onClick={() => this.addGoodsFavorites(goodsdetails.goodsId) }>收藏</Button>
     {goodsdetails.isReagent == "1" ?
      <div style={{display:'inline-block'}}>
       <div className="btn_some">
        <a
         onClick={()=>this.jumpToPrint(goodsdetails.goodsId)}
        >COA</a>
       </div>
       <div className="btn_some">
        <a
         onClick={()=>this.jumpToPrint(goodsdetails.goodsId)}
        >MSDS</a>
       </div>
      </div> : ""
     }
    </div>

   </div>

   {/*<div className="goods-info-huodong">*/}
    {/*{*/}
     {/*goodsdetails.shopActivityList.map((i,s) => {*/}
      {/*return <div key={s}>活动{goodsdetails.shopActivityList[s].id}：{goodsdetails.shopActivityList[s].activityName}</div>*/}
     {/*})*/}
    {/*}*/}
   {/*</div>*/}


   <Modal
    title="没有采购权限"
    visible={visible}
    onOk={this.handleOk}
    onCancel={this.handleCancel}
    footer={
     <Row type="flex" justify="space-around">
      <Col> <Button type="primary" onClick={this.handleOk}>立即申请</Button></Col>
      <Col> <Button  onClick={this.handleCancel}>以后再说</Button></Col>
     </Row>
    }
   >
    <div style={{ height:'50px', lineHeight:'50px', textAlign:'center', fontSize:'16px', color:'#000' }}>您好，如需采购，请向卖家申请开通采购权限。</div>
    <FormItem
     { ...formItemLayout }
     label={ <span style={{ fontSize:'16px', fontWeight:'bold' }}>备注信息</span>}
    >
     {getFieldDecorator('remark', {
     })(
      <Input />
     )}
    </FormItem>
    <FormItem
     { ...formItemLayout }
     label={ <span style={{ fontSize:'16px', fontWeight:'bold' }}>联系人姓名</span>}
    >
     {getFieldDecorator('applyUser', {
     })(
      <Input />
     )}
    </FormItem>
    <FormItem
     { ...formItemLayout }
     label={ <span style={{ fontSize:'16px', fontWeight:'bold' }}>联系人电话</span>}
    >
     {getFieldDecorator('tel', {
     })(
      <Input />
     )}
    </FormItem>
   </Modal>

   <Modal
    title="价格反馈"
    wrapClassName={ priceSubmit }
    visible={ priceVisible }
    onOk={ this.handlePriceOk }
    onCancel={ this.handlePriceCancel }
    footer={
     <Row type="flex" justify="space-around">
      <Col> <Button type="primary" onClick={this.handlePriceOk}>发送</Button></Col>
      <Col> <Button  onClick={this.handlePriceCancel}>取消</Button></Col>
     </Row>
    }
   >
    <div>
     <h2 style={{ paddingBottom:"16px" }}>{goodsdetails.brandName}</h2>
     <div>
      <span style={{ display:'inline-block', height:'30px', lineHeight:'30px' }}>我司计划采购该药品</span>
      <FormItem
       className='inline_price'
      >
       {getFieldDecorator('num', {
        rules: [{ required: true, message: '请输入采购数量!' }],
       })(
        <Input type='number' style={{ height:'auto', width:'80px' }} />
       )}
      </FormItem>
      板，希望采购价可以调整至
      <FormItem
       className='inline_price'
      >
       {getFieldDecorator('price', {
        rules: [{ required: true, message: '请输入希望采购价' }],
       })(
        <Input type='number' style={{ height:'auto', width:'80px' }} />
       )}
      </FormItem>
      元</div>


     <Row style={{ padding:'16px 0px' }}>
      <Col span={12}>
       <FormItem
        className='preson'
        label="我司联系人"
       >
        {getFieldDecorator('contacts', {
          rules: [{ required: true, message: '请输入联系人姓名' }],
         }
        )(
         <Input style={{ height:'auto'}} placeholder="联系人姓名" />
        )}
       </FormItem>
      </Col>
      <Col span={12}>
       <FormItem
        className='preson'
        label="联系电话"
       >
        {getFieldDecorator('tel', {
         rules: [{ required: true, message: '请输入联系人电话', }],
        })(
         <Input style={{ height:'auto'}} placeholder="联系人手机号" />
        )}
       </FormItem>
      </Col>
     </Row>


     <Row>
      <Col span={2}>留言:</Col>
      <Col span={14}>
       <FormItem>
        {getFieldDecorator('remarkPrice',{
         rules: [{ max: 200, message: '200个字符以内' }],
        })(
         <TextArea rows={4} />
        )}
       </FormItem>
      </Col>
      <Col style={{ marginTop:'45px' }} span={8}>(200个字符以内)</Col>
     </Row>


    </div>
   </Modal>
  </div>
 }
}

GoodsProfile.propTypes = {
 dispatch: PropTypes.func,
}


export default  Form.create()(GoodsProfile);
