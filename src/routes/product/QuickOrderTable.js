
import React , { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import Coupon from './coupon';
import { IMAGE_DOMAIN } from '../../utils/common';
import Stepper from '../../components/Stepper/Stepper'
import BuildTemplate from './BuildTemplate';//生产采购模版
import { Form, Icon, Input, Button, message,Select,Radio,Menu,Pagination  ,Tree ,Checkbox,Modal,Tabs,Table,Popconfirm,Row,Col ,Popover} from 'antd';
import { editableTable,BuildTemplate_modal,InputEject_modal} from './QuickOrderTable.less'
import Img from '../../components/Img/Img'
import Price from '../../components/Price/price'

import EditableCell from './EditableCell';
const FormItem = Form.Item;

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      formLayout: 'inline',
      selectedRowKeys: [],  // Check here to configure the default column
      selectedRows:[],
      loading: false,
      visible1: false,
      visible2: false,
      visibleIndex:'',
     // purTemplateItems:[],
      dataSource: [
        {
          brandId:"",
          brandName: "",
          channelPrice: "",
          dosageForm: "01",
          dosageFormName: "",
          gcId: "",
          gcName: "",
          goodsCommName: "",
          goodsCostPrice: "",
          goodsErpCode: "",
          goodsId: "",
          goodsMarketPrice: "",
          goodsName: "",
          goodsSearchName: "",
          goodsShow: "",
          goodsSpec: "",
          goodsState: "",
          goodsShowStorage: null,
          goodsUnit: "",
          goodsUnitName: "",
          isChannelPrice: "",
          isSellpiece: "",
          maxBuyNum: "",
          packNum: '',
          packTotal: '',
         
          channelPrice:'',
          goodsCode:'',
          goodsName:'',
          specName:'',
          goodsStorePrice:'',
        }
      ],
      flush:'1',
    }

   
  }


  columns = [{
    title: '序号',
    dataIndex: 'index',
    key:'index',
    width: '5%',
    render:(text, record, index) => (
      <div>{ index+1 }</div>
    )
  },{
    title: '商品信息',
    dataIndex: 'goodsSearchName',
    key:'goodsSearchName',
    width: '35%',
    render: (text, record,index) => {
      if(record.goodsId==""){
        return (<EditableCell
          dispatch={ this.props.dispatch }
          dataSource={this.props.selectData}
          goodsSearchName={ record.goodsSearchName }
          visibleIndexCalBack={this.visibleIndexCalBack}
          visibleIndex={ this.state.visibleIndex }
          selectStore={ this.props.selectStore }
          index={ index }
          hanldAddList={this.hanldAddList}
        />)
      }else{
        return <div style={{textAlign:"left"}}>
          <div className='clearfix'>
            <Row style={{textAlign:'left'}}>
              <Col span={24}>品名：<span style={{color:'#3c8abb',fontWeight:'bold'}}>{record.goodsName}</span></Col>
            </Row>
            <Row style={{textAlign:'left'}}>
              <Col span={24}>国药编码：<span style={{color:'#3c8abb',fontWeight:'bold'}}>{record.goodsCode}</span></Col>
            </Row>
            <Row style={{textAlign:'left'}}>
              <Col span={24}>CAS号：<span style={{color:'#3c8abb',fontWeight:'bold'}}>{record.goodsName}</span></Col>
            </Row>
          </div>         
        </div>
      }

    }

  }, {
    title: '订购信息',
    dataIndex: 'goodsSpec',
    key:'goodsSpec',
    width: '35%',
    render:(text,record, index)=>{
      // console.log(record)
      return (
        <div style={{fontSize:'.8rem'}}>
          <Row style={{textAlign:'left'}}>
            <Col span={12}>品牌：<span style={{color:'#3c8abb',fontWeight:'bold'}}>{record.brandName}</span></Col>
            <Col span={12}>原厂货号：<span style={{color:'#3c8abb',fontWeight:'bold'}}>{record.goodsSerial}</span></Col>
          </Row>
          <Row style={{textAlign:'left'}}>
            <Col span={12}>规格：<span style={{color:"#3c8abb", fontWeight:'bold'}}>{record.specName}</span></Col>
            <Col span={12}>包装：<span style={{color:'#3c8abb',fontWeight:'bold'}}>{record.goodsSpec}</span></Col>
          </Row>
        </div>

      )
    }
  },
  
    {
    title: '订购数量',
    dataIndex: 'purchasing',
    key:'purchasing',
    width: '10%',
    render:(text,record, index)=>{
      if(typeof record.goodsNum !='undefined'){
        return (
          <Stepper
            id={`quickOrderSteperInput${index}`}
            nowNum={100000000000000000}
            btnClassName='btnClass'
            inputClassName='inputClass'
            num={1}
            min={1}
            max={100000000000000000}
            step={1}
            onUpdate={(val)=>this.updateCart(record.goodsId,val)} 
            disabled={false}/>
        )
      }
    }
  } ,{
    title: '操作',
    dataIndex: 'operation',
    key:'operation',
    width: '10%',
    render: (text, record, index) => {
      return (
        record.goodsId!='' ?
          (
            <Popconfirm title="确定要删除吗？" onConfirm={() => this.onDelete(record.goodsId)}>
              <a href="#"><Icon type="delete" style={{color:'#3497ce'}} /></a>
            </Popconfirm>
          ) : null
      );
    },
  }];

  hanldAddList=(record)=>{
      // record.goodsNum=record.isSellpiece == 0 ? record.packTotal : 1;
      record.goodsNum= 1;
    this.props.dispatch({type:'QuickOrder/addList', reducesObj:{ selectData:[...this.props.selectData, record] }});
  }

  visibleIndexCalBack=(index)=>{
    this.setState({
      visibleIndex:index
    })
  }
  /*改变购买数量*/
  updateCart = (goodsId, num) => {
    console.log(goodsId);
    console.log(num);
    let { selectData } = this.props;
    let newData= selectData.map((v,i)=>{
      if(v.goodsId==goodsId){
        v.goodsNum=num
      }
      return v
    })
    this.props.dispatch({ type:'QuickOrder/addList', reducesObj:{ selectData:newData }});
  }

  handleAdd = () => {
    const { dataSource } = this.state;
    const newData = {
      brandId:"",
      brandName: "",
      channelPrice: "",
      dosageForm: "01",
      dosageFormName: "",
      gcId: "",
      gcName: "",
      goodsCommName: "",
      goodsCostPrice: "",
      goodsErpCode: "",
      goodsId: "",
      goodsMarketPrice: "",
      goodsName: "",
      goodsSearchName: "",
      goodsShow: "",
      goodsSpec: "",
      goodsState: "",
      goodsShowStorage: null,
      goodsUnit: "",
      goodsUnitName: "",
      isChannelPrice: "",
      isSellpiece: "",
      maxBuyNum: "",
      packNum: '',
      packTotal: '',
     
      channelPrice:'',
      goodsCode:'',
      goodsName:'',
      specName:'',
      goodsStorePrice:'',
    };
    this.setState({
      dataSource: [...dataSource, newData]
    });
  }

  onDelete = (id) => {
 
    this.setState({
      selectedRowKeys:[]
    });
    this.props.dispatch({
      type:'QuickOrder/deleteSelect',
      idarr: [id]
    })
  }

  handleALLDelete = ()=>{
    const { dataSource, selectedRowKeys }= this.state;
    //console.log(dataSource.filter((v,i)=>(i!=index)));
    this.setState({
      selectedRowKeys:[]
    });
    this.props.dispatch({
      type:'QuickOrder/deleteSelect',
      idarr: selectedRowKeys
    })
  }

  handleMakeTem = ()=>{
    const values=this.props.form.getFieldsValue(['templateName','remark']);
    let purTemplateItems=[];
    this.state.selectedRows.forEach(function(v, index, array) {
      if(v.goodsId!=''){
     
        purTemplateItems.push({ goodsId:v.goodsId, goodsCode:v.goodsCode, goodsNum:v.goodsNum })
      }
    });
     this.props.dispatch({
       type:'QuickOrder/savePurTemplateEFF',
       obj:{ ...values, purTemplateItems:purTemplateItems }
     })
  }

  componentDidUpdate(pp,ps){
    if(pp.keyData != this.props.keyData){
      this.handleALLDelete()
    }
    if(this.props.selectData.length!=pp.selectData.length){
      if(document.getElementById(`quickOrderSteperInput${this.props.selectData.length-1}`)){
        document.getElementById(`quickOrderSteperInput${this.props.selectData.length-1}`).focus();
      }
    }
    
  }

  handleAddCarts = ()=>{
    let purTemplateItems=[];
    this.state.selectedRows.forEach(function(v, index, array) {
      if(v.goodsId!=''){
        purTemplateItems.push({  goodsId:v.goodsId, newGoodsPrice:v.goodsStorePrice, goodsNum:v.goodsNum })
      }
    });
    this.props.dispatch({
      type:'QuickOrder/getAddCartBachEFF',
      arr: purTemplateItems
    })

    if(this.props.initState){
      this.setState({
        dataSource:[]
      })
    }
  }


 


  onSelectChange = (selectedRowKeys, selectedRows) => {
    //console.log(selectedRowKeys,selectedRows);
    if(this.props.selectData.length>0){
      this.setState({ selectedRowKeys, selectedRows });
    }
   // this.setState({ selectedRowKeys, selectedRows });
  }

  onChange = (pageNumber) => {
  // console.log('Page: ', pageNumber);
}
  /*弹窗-生成采购模版*/
  showModal1 = () => {
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

  render() {
    const {visible1,visible2, dataSource ,confirmLoading} = this.state;
    const { loading, selectedRowKeys } = this.state;
    // const {}
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    let { selectData} = this.props;
    const { getFieldDecorator } = this.props.form;


    // const hasSelected = selectedRowKeys.length > 0;
    return (
      <div className={editableTable}>
        <div>
          <Table className='table_list' rowSelection={rowSelection} rowKey={ (record,i) => (record.goodsId) } bordered dataSource={[...selectData,...dataSource]}  columns={this.columns} pagination={false}/>
          <div className="btn_add">
            {/*<Button className="editable-add-btn" onClick={this.handleAdd} type="primary"><Icon type="plus" style={{fontSize:'14px',fontWeight:'bold'}} />继续添加</Button>*/}
          </div>
        </div>
        <div className="editableTable_bot">
          <div style={{overflow:'hidden'}}>
            <Button disabled={ selectedRowKeys.length>0&&selectedRowKeys[0]!='' ? false :true } onClick={this.handleALLDelete}>删除选中的产品</Button>
            <p className="span_pr">
              商品种类：<span style={{color:'#0085cd'}}>{
              selectData.reduce(function(prev, cur, index, arr) {
               if(cur.goodsId!=''){
                 return prev + 1;
               }else {
                 return prev+0
               }
              },0)
            }</span>种；
              总数量为：<span style={{color:'#0085cd'}}>{
              selectData.reduce(function(prev, cur, index, arr) {
                if(cur.goodsId!=''){
                  return prev + parseInt(cur.goodsNum);
                }else {
                  return prev+0
                }
              },0)
            }</span>个；
              商品总金额：<span style={{color:'#f00',fontWeight:'bold',fontSize:'16px'}}>￥{
              (selectData.reduce(function(prev, cur, index, arr) {
                if(cur.goodsId!=''){
                  console.log(prev)
                  return prev + parseInt(cur.goodsNum)*parseFloat(cur.goodsStorePrice);
                }else {
                  console.log(prev)
                  return prev+0
                }
              },0)).toFixed(2)
            }</span></p>
          </div>
          <div className="editableTable_bot_btn">
            <Popconfirm placement="top" title={
              <div>
                <div style={{ height:'50px', lineHeight:'50px' }}>亲，为您的采购模板取一个名字吧！</div>
                <FormItem
                  { ...formItemLayout }
                  label="模板名称">
                  {getFieldDecorator('templateName', {
                    rules: [{
                      required: true,
                      message: '请输入模板名称！',
                    }],
                  })(
                    <Input  />
                  )}
                </FormItem>
                <FormItem
                  { ...formItemLayout }
                  label="模板说明">
                  {getFieldDecorator('remark')(
                    <Input  />
                  )}
                </FormItem>
              </div>
            }
               onConfirm={ this.handleMakeTem }
                okText="确定" cancelText="取消">
              <Button disabled={ selectedRowKeys.length>0&&selectedRowKeys[0]!='' ? false :true } type="primary" ><Icon type="star" />生成采购模板</Button>
            </Popconfirm>

            <Button disabled={ selectedRowKeys.length>0&&selectedRowKeys[0]!='' ? false :true } type="primary" onClick={this.handleAddCarts}><Icon type="shopping-cart" />加入购物车</Button>
          </div>

        </div>
        {/*<div className="editableTable_pageNo">*/}
          {/*<Pagination showQuickJumper defaultCurrent={2} total={500} onChange={this.onChange} />*/}
        {/*</div>*/}
        {/*弹窗-生产采购模版*/}
        <Modal title={<span style={{color:'#0085cd'}}></span>}
               visible={visible1}
               onOk={this.handleOk1}
               confirmLoading={confirmLoading}
               onCancel={this.handleCancel1}
               width="950px"
               className={BuildTemplate_modal}
               footer={<div style={{textAlign:'center'}}>
                 <Button key="submit" onClick={this.handleOk1} type="primary" style={{
                   width:'120px',
                   fontSize:'16px',
                   fontWeight:'bold',
                   height:'40px',
                   backgroundColor:'#2eb6aa',
                   borderColor:'#2eb6aa'}}>保存</Button>
               </div>}
        >
          <BuildTemplate></BuildTemplate>
        </Modal>

      </div>
    );
  }
}

export default (Form.create()(EditableTable));
