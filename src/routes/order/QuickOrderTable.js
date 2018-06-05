
import React , { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import Coupon from './coupon';
import { IMAGE_DOMAIN } from '../../utils/common';
import Stepper from '../../components/Stepper/Stepper'
import BuildTemplate from './BuildTemplate';//生产采购模版
import { Form, Icon, Input, Button, message,Select,Radio,Menu,Pagination  ,Tree ,Checkbox,Modal,Tabs,Table,Popconfirm,Row,Col } from 'antd';
import { editableTable,BuildTemplate_modal,InputEject_modal} from './QuickOrderTable.less'

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
          storeId: "",
          storeName: "",
        }
      ],
    }

    // this.state = {
    //   dataSource: [{
    //     key: '0',
    //     serial: '0',
    //     name: 'Edward King 0',
    //     Carton: '32',
    //     company:'1',
    //     purchasing:'1',
    //     seller:'1',
    //     producer:'1',
    //     stock:'1',
    //     purchasingPrice:'1',
    //     subtotal:'1',
    //     address: 'London, Park Lane no. 0',
    //   }],
    //   count: 2,
    // };
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
    title: '商品名称',
    dataIndex: 'goodsSearchName',
    key:'goodsSearchName',
    width: '20%',
    render: (text, record,index) => {
      if(record.goodsId==""){
        return (<EditableCell
          dispatch={ this.props.dispatch }
          // goodsbatchlist={ this.props.goodsbatchlist }
          //value={text}
          dataSource={this.props.selectData}
          goodsSearchName={ record.goodsSearchName }
          visibleIndexCalBack={this.visibleIndexCalBack}
          visibleIndex={ this.state.visibleIndex }
          selectStore={ this.props.selectStore }
          index={ index }
          hanldAddList={this.hanldAddList}
          //onChange={this.onCellChange(record.key, 'name')}
        />)
      }else{
        return <div style={{textAlign:"left",fontWeight:'bold',fontSize:'.8rem'}}>{record.goodsName}</div>
      }

    }

  }, {
    title: '商品信息',
    dataIndex: 'goodsSpec',
    key:'goodsSpec',
    width: '40%',
    render:(text,record, index)=>{
      // console.log(record)
      return (
        <div>
          <Row style={{textAlign:'center'}}>
           <Col span={10}>商品编号：{record.dosageFormName}</Col>
            <Col span={14}>商品规格：{record.specName}</Col>
          </Row>
          <Row style={{textAlign:'center'}}>
           <Col span={10}>商品剂型：{record.dosageFormName}</Col>
            <Col span={14}>生产厂家：{record.brandName}</Col>
          </Row>
          <Row style={{textAlign:'center'}}>
           <Col span={10}>销售商家：{record.storeName}</Col>
           <Col span={14}>是否拆零：<span style={{color:'red',fontWeight:'bold'}}>{record.isSellpiece ?  record.isSellpiece == 0 ? "否" : "是" : ""}</span></Col>
          </Row>
          <Row style={{textAlign:'center'}}>
           <Col span={10}>包装单位：<span style={{color:'red',fontWeight:'bold'}}>{record.goodsSpec}</span></Col>
           <Col span={14}>件装数量：<span style={{color:'red',fontWeight:'bold'}}>{record.packTotal}</span></Col>
          </Row>
         <Row style={{textAlign:'center'}}>
          <Col span={10}>包装数量：<span style={{color:'blue',fontWeight:'bold'}}>{record.packNum}</span></Col>
         </Row>
        </div>

      )
    }
  },
  //   {
  //   title: '单位',
  //   dataIndex: 'goodsUnitName',
  //   key:'goodsUnitName',
  //   width: '9%',
  // },
    {
    title: '采购数量',
    dataIndex: 'purchasing',
    key:'purchasing',
    width: '9%',
    render:(text,record, index)=>{
      if(typeof record.goodsNum !='undefined'){
        return (
          <Stepper
            // key={goods.goodsNum + init}
            nowNum={record.goodsNowStorage}
            btnClassName='btnClass'
            inputClassName='inputClass'
            num={record.goodsNum}
            min={record.isSellpiece == 0 ? record.packTotal : 1}
            max={record.maxBuyNum == 0 ? record.goodsNowStorage : record.maxBuyNum}
            step={record.isSellpiece == 0 ? record.packTotal : 1}
            onUpdate={(val)=>this.updateCart(record.goodsId,val)} disabled={false}/>
        )
      }
    }
  },
  //   {
  //   title: '卖家',
  //   dataIndex: 'storeName',
  //   key:'storeName',
  //   width: '9%',
  // },{
  //   title: '生产厂家',
  //   dataIndex: 'brandName',
  //   key:'brandName',
  //   width: '15%',
  // },
    {
    title: '库存',
    dataIndex: 'goodsShowStorage',
    key:'goodsShowStorage',
    width: '7%',
  },{
    title: '采购价',
    dataIndex: 'channelPrice',
    key:'channelPrice',
    width: '6%',
  }, {
    title: '小计（元）',
    dataIndex: 'subtotal',
    key: 'subtotal',
    width: '9%',
    render: (text, record) => {
     // console.log(1);
      if(parseInt(record.channelPrice)>=0){
        return <div>${(parseFloat(record.goodsNum) * parseFloat(record.channelPrice)).toFixed(2)}</div>
      }else {
       return <div></div>
      }
    }
  }
  ,{
    title: '操作',
    dataIndex: 'operation',
    key:'operation',
    width: '6%',
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
   // let { dataSource }= this.state;
   // let dataSource = [...this.props.selectData,...this.state.dataSource];
    //let hasItem=dataSource.findIndex((v,i,a)=>(v.goodsId==record.goodsId));
   // console.log(hasItem);
   // if(hasItem==-1){

      record.goodsNum=record.isSellpiece == 0 ? record.packTotal : 1;
    //record.isSellpiece == 0 ? record.packTotal : 1
      //dataSource.splice(index-this.props.selectData.length,1,record);

    this.props.dispatch({type:'QuickOrder/addList', reducesObj:{ selectData:[...this.props.selectData, record] }});
      //let obj={ [ index ] : record };
      //console.log([...obj]);
      // this.setState({
      //   dataSource: dataSource,
      //   //purTemplateItems:[...this.state.purTemplateItems, { storeId: record.storeId, goodsId:record.id, goodsNum:1, goodsCode:record.goodsErpCode  }]
      // });
    //}else {
    //  message.error('已经加入采购订单了',1.5);
   // }

  }

  visibleIndexCalBack=(index)=>{
    this.setState({
      visibleIndex:index
    })
  }
  /*改变购买数量*/
  updateCart = (goodsId, num) => {
    //console.log(num);
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
      storeId: "",
      storeName: "",
    };
    this.setState({
      dataSource: [...dataSource, newData]
    });
  }

  onDelete = (id) => {
   // const { dataSource }= this.state;
    //console.log(dataSource.filter((v,i)=>(i!=index)));
   // this.setState({ dataSource: dataSource.filter((v,i)=>(i!=index)) });
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
    // const purTemplateItems=this.state.dataSource.map((v,i,a)=>{
    //   if(v.goodsId!=''){
    //     //console.log(1);
    //     return { storeId:v.storeId, goodsId:v.goodsId, goodsCode:v.goodsCode, goodsNum:v.goodsNum }
    //   }
    // })

    //templateName:111
    //remark:11
   // purTemplateItems:
    //  [{"storeId":"0","goodsId":"1379","goodsNum":200}]
    this.state.selectedRows.forEach(function(v, index, array) {
      if(v.goodsId!=''){
        //console.log(1);
        purTemplateItems.push({ storeId:v.storeId, goodsId:v.goodsId, goodsCode:v.goodsCode, goodsNum:v.goodsNum })
      }
    });



    //console.log(purTemplateItems);
     this.props.dispatch({
       type:'QuickOrder/savePurTemplateEFF',
       obj:{ ...values, purTemplateItems:purTemplateItems }
     })
  }

  componentDidUpdate(pp,ps){
    if(pp.keyData != this.props.keyData){
      this.handleALLDelete()
    }
  }

  handleAddCarts = ()=>{
    let purTemplateItems=[];
    this.state.selectedRows.forEach(function(v, index, array) {
      if(v.goodsId!=''){
        //  goodsId,goodsNum,newGoodsPrice
        purTemplateItems.push({  goodsId:v.goodsId, newGoodsPrice:v.channelPrice, goodsNum:v.goodsNum })
      }
    });
    //console.log(purTemplateItems);
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


  onCellChange = (key, dataIndex) => {
    return (value) => {
      const dataSource = [...this.state.dataSource];
      const target = dataSource.find(item => item.key === key);
      if (target) {
        target[dataIndex] = value;
        this.setState({ dataSource });
      }
    };
  }


  onSelectChange = (selectedRowKeys, selectedRows) => {
    //console.log(selectedRowKeys,selectedRows);
    if(this.props.selectData.length>0){
      this.setState({ selectedRowKeys, selectedRows });
    }
   // this.setState({ selectedRowKeys, selectedRows });
  }

  onChange = (pageNumber) => {
  console.log('Page: ', pageNumber);
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
              总数量：<span style={{color:'#0085cd'}}>{
              selectData.reduce(function(prev, cur, index, arr) {
                if(cur.goodsId!=''){
                  return prev + parseInt(cur.goodsNum);
                }else {
                  return prev+0
                }
              },0)
            }</span>个；
              商品总金额：<span style={{color:'#f00',fontWeight:'bold',fontSize:'16px'}}>{
              (selectData.reduce(function(prev, cur, index, arr) {
                if(cur.goodsId!=''){
                  return prev + parseInt(cur.goodsNum)*parseFloat(cur.channelPrice);
                }else {
                  return prev+0
                }
              },0)).toFixed(2)
            }</span>元</p>
          </div>
          <div className="editableTable_bot_btn">
            {/*<Popconfirm placement="top" title={*/}
              {/*<div>*/}
                {/*<div style={{ height:'50px', lineHeight:'50px' }}>亲，为您的采购模板取一个名字吧！</div>*/}
                {/*<FormItem*/}
                  {/*{ ...formItemLayout }*/}
                  {/*label="模板名称">*/}
                  {/*{getFieldDecorator('templateName', {*/}
                    {/*rules: [{*/}
                      {/*required: true,*/}
                      {/*message: '请输入模板名称！',*/}
                    {/*}],*/}
                  {/*})(*/}
                    {/*<Input  />*/}
                  {/*)}*/}
                {/*</FormItem>*/}
                {/*<FormItem*/}
                  {/*{ ...formItemLayout }*/}
                  {/*label="模板说明">*/}
                  {/*{getFieldDecorator('remark')(*/}
                    {/*<Input  />*/}
                  {/*)}*/}
                {/*</FormItem>*/}
              {/*</div>*/}
            {/*}*/}
               {/*onConfirm={ this.handleMakeTem }*/}
                {/*okText="确定" cancelText="取消">*/}
              {/*<Button disabled={ selectedRowKeys.length>0&&selectedRowKeys[0]!='' ? false :true } type="primary" >生成采购模板</Button>*/}
            {/*</Popconfirm>*/}

            <Button disabled={ selectedRowKeys.length>0&&selectedRowKeys[0]!='' ? false :false } type="primary" style={{ backgroundColor:"#FF0000", border:'none' }} onClick={this.handleAddCarts}>加入购物车</Button>
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
