/**
 * Created by 10400 on 2017/8/9.
 * order快速下单
 */
import React , { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import QuickOrderTable from './QuickOrderTable';
import PurchasingTemplate from './PurchasingTemplate';//选择采购模版
import CollectionList from './CollectionList';//收藏清单
import PurchaseRecord from './PurchaseRecord';//最近购买记录
import Search from '../../components/Search/Search';
import Navigation from '../../components/Navigation/Navigation';
import Img from '../../components/Img/Img';
import { routerRedux, Link } from 'dva/router';
import Coupon from './coupon';
import { IMAGE_DOMAIN } from '../../utils/common';
import { Form, Icon, Input, Button, message,Select,Radio,Menu,Dropdown ,Tree ,Checkbox,Modal,Tabs, Row, Col,Upload, Breadcrumb } from 'antd';
import { quickOrder_body,PurchasingTemplate_modal,CollectionList_modal,purchaseRecord_modal, jihua_modal } from './quickOrder.less'

const FormItem = Form.Item;
const Option = Select.Option;
const TreeNode = Tree.TreeNode;
const TabPane = Tabs.TabPane;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;


class  QuickOrder extends Component{
 constructor(props){
  super(props);
  this.state={
   visible1: false,
   visible2: false,
   visible3: false,
   visible4:false,
   show:false,
   storeListData:[],
   newStoreListData:[],
   selectStore:'',
   cartCountData:0,
   init:0,
   storeNum:props.app.storeListData.length > 0 && props.app.storeListData[0].storeId
  }
 }


 handleShowHide=()=>{
  const arr=this.state.storeListData;
  if(this.state.show){
   this.setState({
    show: !this.state.show,
    newStoreListData:arr.slice(0,4)
   });
  }else {
   this.setState({
    show: !this.state.show,
    newStoreListData:arr
   });
  }

 }


 selectStore=(id)=>{
  this.setState({
   selectStore:id
  })
 }

 removeSelectStore=()=>{
  this.setState({
   selectStore:''
  })
 }


 // goodsbatchlist({ storeId:this.props.selectStore, keyword:value, pageNo:1}).then((r)=>{
 //   console.log(r);
 //   if(r.result==1){
 //     this.setState({
 //       goodsbatchlist:r.data,
 //       visible:true
 //     });
 //   }
 // })

 /*modal begin*/
 /*弹窗-选择采购模版*/
 showModal1 = () => {

  this.props.dispatch({type:'QuickOrder/getPurTemplateListEFF'});
  console.log(this.props)
  this.setState({
   visible1: true,
  });
 }


 handleOk1 = () => {
  this.setState({ loading: false, visible1: false });
 }
 handleCancel1 = () => {
  this.setState({ visible1: false });
 }
 /*弹窗-收藏清单*/

 showModal2 = () => {
  this.props.dispatch({ type:'QuickOrder/getGoodsFavoritesEFF',
   obj:{
    pageNo:1,
    storeId:this.state.selectStore,
    goodsName:'',
   }
  });

  this.setState({
   visible2: true,
  });
  //this.props.dispatch({ type:'QuickOrder/getAddCartBachEFF', arr:[] });

 }

 handleOk2 = () => {
  this.setState({ loading: false, visible2: false });
 }
 handleCancel2 = () => {
  this.setState({ visible2: false });
 }
 /*弹窗-最近购买记录*/
 showModal3 = () => {

  this.props.dispatch({ type:'QuickOrder/getRecentPurGoodsEFF',
   obj:{
    pageNo:1,
    storeId:this.state.selectStore,
    goodsName:'',
    dataType:'week',
   }
  });

  this.setState({
   visible3: true,
  });
 }
 handleOk3 = () => {
  this.setState({ loading: false, visible3: false });
 }
 handleCancel3 = () => {
  this.setState({ visible3: false });
 }

 showModal4 = () => {
  this.setState({
   visible4: true,
  });
 }
 handleOk4 = () => {
  this.setState({ loading: false, visible4: false });
 }
 handleCancel4 = () => {
  this.setState({ visible4: false });
 }

 onSelectChange = (val) => {
  console.log(val)
  this.setState({
   storeNum:val
  })
 }



 /*modal end*/

 // componentDidMount(){
 //
 //   if(this.props.app.cartCountData!=this.state.storeListData.length){
 //     this.setState({
 //       storeListData:this.props.app.storeListData,
 //       newStoreListData:this.props.app.storeListData.slice(0,4)
 //     })
 //   }
 //
 // }
 componentDidMount(){
  this.setState({
   storeNum:this.props.app.storeListData.length > 0 && this.props.app.storeListData[0].storeId
  })
  if(this.props.app.storeListData.length!=this.state.storeListData.length){
   this.setState({
    storeListData:this.props.app.storeListData,
    newStoreListData:this.props.app.storeListData.slice(0,4)
   })
  }
  if(this.state.cartCountData != this.props.app.cartCountData){
   this.setState({
    cartCountData:this.props.app.cartCountData
   })
  }
 }

 componentDidUpdate(pp,ps){
  let _this = this;
  console.log(pp.app,this.props.app.cartCountData)
  if(pp.app.cartCountData !== "0" && pp.app.cartCountData != this.props.app.cartCountData){
   Modal.confirm({
    title:'',
    content:"是否继续添加",
    okText: '去结算',
    cancelText:"继续添加",
    onOk() {
     _this.props.dispatch(routerRedux.push(`/cart`));
    },
    onCancel(){
     _this.setState({
      init: _this.state.init + 1
     })
    }
   });
  }
  if(pp.app.storeListData.length!=this.state.storeListData.length){
   this.setState({
    storeListData:this.props.app.storeListData,
    newStoreListData:this.props.app.storeListData.slice(0,4)
   })
  }

  if(pp.app.storeListData.length!=this.state.storeListData.length){
   this.setState({
    storeListData:this.props.app.storeListData,
    newStoreListData:this.props.app.storeListData.slice(0,4)
   })
  }

 }

 onXmlChange = (info) => {
  if (info.file.status !== 'uploading') {
   console.log(info.file, info.fileList);
  }
  if (info.file.status === 'done') {
   if(info.file.response.result == 1){
    message.success(info.file.response.msg);
    this.props.dispatch({type:'QuickOrder/addSelectData',arr:info.file.response.data})
    this.handleCancel4();
   }else{
    message.error(info.file.response.msg);
   }
  } else if (info.file.status === 'error') {
   message.error(`${info.file.name} 上传失败`);
  }
 }


 render (){
  const { visible1,visible2,visible3, visible4, confirmLoading, show, newStoreListData, selectStore,keyNum } = this.state;
  const { goodsClass, navList} = this.props.app;
  const { goodsbatchlist, selectData,storeOrgListData } = this.props.QuickOrder;
  const { dispatch } = this.props;
  console.log(selectData)

  const { getFieldDecorator } = this.props.form;
  const { formLayout,init } = this.state;

  const formItemLayout = {
   labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
   },
   wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },

   },
  };


  return (
   <div>
    <Search></Search>
    <Navigation>

     <div className={quickOrder_body}>
      <div className="quikOrder_content">
       <div className="quikOrder_top">
        <div className="alls_guanggao_img"><Img style={{ width:'100%', height:"100%" }} src="upload/img/lmadv/1508217294561.png" /></div>
        <Breadcrumb separator=">" className='security_nav_bar'>
         <Breadcrumb.Item href="">我的账户</Breadcrumb.Item>
         <Breadcrumb.Item>快速订购</Breadcrumb.Item>
        </Breadcrumb>

        <Row className='upload_moban'>
         <Col span={20}>
          <Row>
           <Col style={{ height:'30px', lineHeight:'30px' }} span={4}>
            上传订购产品列表:
           </Col>
           <Col span={5}>
            <Input  />
           </Col>
           <Col style={{ textAlign:'center' }} span={3}>
            <Button style={{ backgroundColor:'#2EB6AA', color:'#fff' }}onClick={this.showModal1}>浏览</Button>
           </Col>
           <Col span={3}>
            <Button type="primary" style={{ backgroundColor:'#3497CE', color:'#fff' }}>提交</Button>
           </Col>
          </Row>
         </Col>
         <Col style={{ textAlign:'right' }} span={4}>
          <Button type="primary" style={{ backgroundColor:'#3497CE', color:'#fff' }}onClick={this.showModal3}>上传导入模板说明</Button>
         </Col>
        </Row>
        {/*<Button type="primary"  size="large" style={{marginRight:'20px'}} onClick={this.showModal1}>选择采购模版</Button>*/}
        {/*<Button type="primary"  size="large" style={{marginRight:'20px'}} onClick={this.showModal3}>最近购买记录</Button>*/}
        {/*<Button type="primary" size="large"  style={{marginRight:'20px'}} onClick={this.showModal2}>收藏清单</Button>*/}
        {/*<Button type="primary" size="large"  onClick={this.showModal4}>采购计划导入</Button>*/}
       </div>

       <div className='storelist'>
        <Row>
         <Col span={4} className='left'>销售商家：</Col>
         <Col span={20}>
          <Row gutter={16}>
           {
            newStoreListData.map((v,i,a)=>{
             if(selectStore!=''&&selectStore==v.storeId){
              return (
               <Col  className='selectStoreName' key={v.storeId} span={6}>
                <div>{v.storeName}<Icon onClick={ this.removeSelectStore } type="close" /></div>
               </Col>
              );
             }else if(selectStore==''){
              return (
               <Col className='storeName' key={v.storeId} span={6}>
                <span onClick={ ()=>{ this.selectStore(v.storeId) } } >{v.storeName}</span>
               </Col>
              );
             }
            })
           }
          </Row>
         </Col>
        </Row>
        <div className="show_hide">
         { selectStore=='' ? <div className="show_hide_bth" onClick={ this.handleShowHide }>
          { show==true ?  <div>收起<Icon type="up" /></div>: <div>展开<Icon type="down" /></div> }
         </div> :''}
        </div>
       </div>


       {/*<p className="prompt_txt">温馨提示：部分商品包装更新频繁，如货品与图片不完全一致，请以收到的商品实物为准！</p>*/}
       <div className="quikOrder_table" style={{fontSize:'.8rem'}}>
        <QuickOrderTable keyData={init} initState={this.state.init} selectData={ selectData } dispatch={ dispatch } selectStore={ selectStore } goodsbatchlist={ goodsbatchlist } ></QuickOrderTable>
       </div>

      </div>



      {/*弹窗-选择采购模版*/}
      <Modal title={<span style={{color:'#0085cd'}}>选择采购模版</span>}
             visible={visible1}
       // onOk={this.handleOk1}
             confirmLoading={confirmLoading}
             onCancel={this.handleCancel1}
             width="950px"
             className={PurchasingTemplate_modal}
             footer={ null }
      >
       <PurchasingTemplate onCancel={this.handleCancel1} ></PurchasingTemplate>
      </Modal>

      {/*弹窗-收藏清单*/}
      <Modal title={<span style={{color:'#0085cd'}}></span>}
             visible={visible2}
             onOk={this.handleOk2}
             confirmLoading={confirmLoading}
             onCancel={this.handleCancel2}
             width="950px"
             className={CollectionList_modal}
             footer={null}
      >
       <CollectionList key={visible2} onCancel={this.handleCancel2}></CollectionList>
      </Modal>

      {/*弹窗-最近购买记录*/}
      <Modal title={<span style={{color:'#0085cd'}}></span>}
             visible={visible3}
             onOk={this.handleOk3}
             confirmLoading={confirmLoading}
             onCancel={this.handleCancel3}
             width="950px"
             className={purchaseRecord_modal}
             footer={null}
      >
       <PurchaseRecord key={visible3} onCancel={this.handleCancel3}></PurchaseRecord>
      </Modal>

      <Modal title={<span style={{color:'#0085cd'}}>采购计划导入</span>}
             visible={visible4}
             onOk={this.handleOk4}
             confirmLoading={confirmLoading}
             onCancel={this.handleCancel4}
             width="650px"
             className={jihua_modal}
             footer={null}
      >
       <div className="example_input_l" style={{paddingBottom:'20px'}}>
        {/*<Input placeholder="支持Excel导入" style={{width:'350px'}} addonAfter={<span>采购计划导入</span>}/>*/}

        <Form>
         <FormItem
          {...formItemLayout}
          label="选择商家"
         >
          <Row gutter={8}>
           <Col span={12}>
            <Select style={{ width:'100%' }} value={storeOrgListData.length > 0 && storeOrgListData[0].storeId } onChange={this.onSelectChange}>
             {storeOrgListData.length > 0 && storeOrgListData.map((list,index)=>{
              return < Option key={list.storeId} value={list.storeId}>{list.storeName}</Option>
             })}
            </Select>
           </Col>
           <Col span={12}>
            <a className="ant-btn-lg ant-btn-primary" href={`front/goodsApi/exportGoodsByStoreid?storeId=${this.state.storeNum}`} style={{verticalAlign:'top',textDecoration:'none'}} >采购模板下载</a>
           </Col>
          </Row>
         </FormItem>
         <FormItem
          {...formItemLayout}
          label="选择计划单"
          hasFeedback
         >
          <Upload
           name='files'
           action= '/front/goodsApi/importGoodsExcel'
           headers= {{authorization: 'authorization-text'}}
           onChange={this.onXmlChange}
          >
           <Button>
            <Icon type="upload" /> 点击上传文件
           </Button>
          </Upload>
         </FormItem>
         {/*<FormItem>*/}
         {/*<Button style={{display:'block',margin:'0 auto'}} className='sub_btn' htmlType="submit" type="primary">导入采购计划</Button>*/}
         {/*</FormItem>*/}
        </Form>



       </div>
      </Modal>

     </div>
    </Navigation>

   </div>
  );
 }
}

QuickOrder.propTypes = {
 form: PropTypes.object,
 QuickOrder: PropTypes.object,
 dispatch: PropTypes.func,
}
export default connect(({QuickOrder,app})=>({QuickOrder,app}),(dispatch,own)=>{return {dispatch,own}})(Form.create()(QuickOrder));
