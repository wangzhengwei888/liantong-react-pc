
import React , { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Breadcrumb,Collapse ,Button,Select,Form,Input,Icon,Table,Modal, Row, Col, message } from 'antd';
import Img from '../../components/Img/Img';
const FormItem = Form.Item;
const Option = Select.Option;
const Panel = Collapse.Panel;
const confirm = Modal.confirm;

import moment from 'moment';

import { getPurTemplateItemAPI, deletePurTemplateAPI, deletePurTemplateItemAPI } from './api';
import Stepper from '../../components/Stepper/Stepper'
import { panel } from './purchaseTempletPanel.less';

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

class  PurchaseTempletPanel extends Component{
  constructor(props){
    super(props);
    this.state= {
      id: '',
      data: [],
      pageNo:1,
      pageSize:10,
      selectedRowKeys:[],
      selectedRows:[],
      visible:false
    }
  }

  // handleSubmit = (e) => {
  //   e.preventDefault();
  //   this.props.form.validateFields((err, values) => {
  //     if (!err) {
  //       this.props.dispatch({ type:'queryChannel/channelListEFF', obj:values });
  //       // console.log('Received values of form: ', values);
  //     }
  //   });
  // }

  columns = [{
    title: '商品名称',
    dataIndex: 'goodsName',
    key:'goodsName',
    //width: '15%',
    render: (text, record) => (
      <span>{record.goodsName}</span>
    ),
  }, {
    title: '箱规',
    dataIndex: 'goodsSpec',
    key:'goodsSpec',
    // width: '9%',
  },  {
    title: '单位',
    dataIndex: 'goodsUnitName',
    key:'goodsUnitName',
    // width: '9%',
    // render:()=>{
    //   return (
    //     <Select defaultValue="jack" style={{ width: '70px' }} onChange={this.handleChange}>
    //       <Option value="jack">盒</Option>
    //       <Option value="lucy">瓶</Option>
    //       <Option value="disabled">箱</Option>
    //       <Option value="Yiminghe">yiminghe</Option>
    //     </Select>
    //   )
    // }
  },
      {
      title: '采购数量',
      dataIndex: 'purchasing',
      key:'purchasing',
      width: '12%',
      render:(text,record, index)=>{

          return (
            <Stepper
              // key={goods.goodsNum + init}
              nowNum={record.goodsNowStorage}
              btnClassName='btnClass'
              inputClassName='inputClass'
              num={record.buyNum}
              min={record.isSellpiece == 0 ? record.packTotal : 1}
              max={record.maxBuyNum == 0 ? record.goodsNowStorage : record.maxBuyNum}
              step={record.isSellpiece == 0 ? record.packTotal : 1}
              onUpdate={(val)=>this.updateCart(record.goodsId,val)} disabled={false}/>
          )

      }
    },
    {
      title: '单价',
      dataIndex: 'channelPrice',
      key:'channelPrice',
      //width: '9%',
    },{
      title: '卖家',
      dataIndex: 'storeName',
      key:'storeName',
      //width: '9%',
    },{
      title: '生产厂家',
      dataIndex: 'brandName',
      key:'brandName',
      //width: '15%',
    },{
      title: '库存',
      dataIndex: 'goodsTotalStorage',
      key:'goodsTotalStorage',
      //width: '7%',
    },
    //   {
    //   title: '合计',
    //   dataIndex: 'subtotal',
    //   key:'subtotal',
    //   width: '9%',
    // }
  ];

  updateCart = (goodsId, num) => {
    //console.log(num);
    let { data, selectedRows } = this.state;
    let newData= data.map((v,i)=>{
      if(v.goodsId==goodsId){
        v.buyNum=num
      }
      return v
    })

    let newselectedRows= selectedRows.map((v,i)=>{
      if(v.goodsId==goodsId){
        v.buyNum=num
      }
      return v
    })

    this.setState({
      data:newData,
      selectedRows:newselectedRows
    })
  }

  handelchange=(pageno,pageSize)=>{
    // console.log(pageno);
    //this.props.dispatch({ type:'home/loadUser',pageNo:pageno })
    //this.props.dispatch({ type:'queryChannel/channelListEFF', obj:{ pageno:pageno } });
  }

  handlePanel=()=>{
    //console.log(_this.state.pageNo)
    getPurTemplateItemAPI({
      templateId:this.props.Item.templateId,
      pageNo:this.state.pageNo,
      pageSize:this.state.pageSize,
    }).then(r=>{
      if(r.result==1){
        this.setState({
          data:r.data,
          total:r.total||10,
          pageNo:r.pageNo||1,
          pageSize:r.pageSize||10
        })
      }else {
        message.error(r.msg,1.5);
      }
      //console.log(r)
    })
  }

  handleActiveKey=(key)=>{
    if(this.state.id==''){
      this.handlePanel()
    }

    this.setState({
      id:this.state.id=='' ? key :''
    })
  }

  onSelectChange = (selectedRowKeys, selectedRows) => {
    this.setState({ selectedRowKeys:selectedRowKeys, selectedRows:selectedRows });
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = () => {
    this.setState({  visible: false });
  }
  handleCancel = () => {
    this.setState({ visible: false });
  }

  handleMakeTem = (templateId)=>{
    const values=this.props.form.getFieldsValue(['templateName','remark']);
   // let purTemplateItems=[];
    // this.state.selectedRows.forEach(function(v, index, array) {
    //   if(v.goodsId!=''){
    //     //console.log(1);
    //     purTemplateItems.push({ storeId:v.storeId, goodsId:v.goodsId, goodsCode:v.goodsCode, goodsNum:v.goodsNum })
    //   }
    // });

    this.props.dispatch({
      type:'purchase/savePurTemplateEFF',
      obj:{ ...values,
        templateId
       // purTemplateItems:purTemplateItems
      }
    })
    this.setState({  visible: false });
  }

  handleAddCarts = ()=>{
    let purTemplateItems=[];
    this.state.selectedRows.forEach(function(v, index, array) {
      if(v.goodsId!=''){
        //  goodsId,goodsNum,newGoodsPrice
        purTemplateItems.push({  goodsId:v.goodsId, newGoodsPrice:v.channelPrice, goodsNum:v.buyNum })
      }
    });
    //console.log(purTemplateItems);
    this.props.dispatch({
      type:'purchase/getAddCartBachEFF',
      arr: purTemplateItems
    })

    // if(this.props.initState){
    //   this.setState({
    //     dataSource:[]
    //   })
    // }
  }


  render (){
    const { Item, dispatch } = this.props;
    const { buyerId, templateId, templateName, createTime  } =Item;
    const { id, data, total, pageNo:current, pageSize, visible } =this.state;
   // console.log(data)
    const {  selectedRowKeys, selectedRows } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };

    const { getFieldDecorator } = this.props.form;

    return (
       <div className={ panel } style={{ marginBottom:'15px' }}>
         <Collapse activeKey={id} bordered={true}>
           <Panel
             //onChange={this.handlePanel}
             style={{ backgroundColor:'#fff' }}
             key={templateId}
             header={
             <Row style={{ height:'28px', lineHeight:'28px' }} type="flex" justify="space-between">
               <Col span={4}>
                 <Row type="flex" justify="space-between">
                   <div style={{ color:'#333', fontWeight:'bold', fontSize:'16px', position:'relative' }} onClick={()=>{ this.handleActiveKey(templateId) }}>
                     {templateName}
                     <div style={{ position:'absolute',  left:'-20px', top:'0px',  }}>
                       { this.state.id=='' ? <Icon style={{ border:'1px solid #999' }} type="plus" /> : <Icon style={{ border:'1px solid #999' }} type="minus" /> }
                     </div>
                   </div>
                   <div style={{ color:'#0066cc' }} onClick={this.showModal}>修改</div>
                 </Row>
               </Col>
               <Col span={4}>{moment(createTime.time).format("YYYY-MM-DD HH:mm:ss")}</Col>
               <Col span={8}>
                 <Button type="primary" disabled={ selectedRowKeys.length > 0 ? false : true } onClick={this.handleAddCarts} style={{ marginRight:'10px' }}>加入购物车</Button>
                 <Button disabled={ selectedRowKeys.length > 0 ? false : true } style={{ marginRight:'10px' }}
                         onClick={()=>{
                           //console.log(this);
                           const _this=this;
                           confirm({
                             title: '',
                             content: '您确定要删除选中项吗?',
                             onOk() {
                              // console.log('OK');
                              // console.log(_this);
                               deletePurTemplateItemAPI(selectedRowKeys.join(',')).then(r=>{
                                 if(r.result==1){
                                   message.success(r.msg,1.5);
                                  // console.log(_this);
                                   getPurTemplateItemAPI({
                                     templateId:templateId,
                                     pageNo:_this.state.pageNo,
                                     pageSize:_this.state.pageSize,
                                   }).then(r=>{
                                     if(r.result==1){
                                       _this.setState({
                                         data:r.data,
                                         total:r.total||10,
                                         pageNo:r.pageNo,
                                         pageSize:r.pageNo
                                       })
                                     }else {
                                       message.error(r.msg,1.5);
                                     }
                                     //console.log(r)
                                   })
                                 }else {
                                   message.error(r.msg,1.5);
                                 }
                               });
                             },
                             onCancel() {
                               console.log('Cancel');
                             },
                           });}
                         }
                 >删除产品</Button>
                 <Button style={{ marginRight:'10px' }}
                   onClick={()=>{
                     confirm({
                       title: '',
                       content: '您确定要删除此模板吗?',
                       onOk() {
                        // console.log('OK');
                         deletePurTemplateAPI(templateId).then(r=>{
                           if(r.result==1){
                             message.success(r.msg,1.5);
                             dispatch({ type:'purchase/getPurTemplateListEFF' })
                           }else {
                             message.error(r.msg,1.5);
                             //dispatch({ type:'purchase/getPurTemplateListEFF' })
                           }
                         })
                       },
                       onCancel() {
                         //console.log('Cancel');
                       },
                     });}
                   }
                 >删除模板</Button>
               </Col>
             </Row>
           } >
             <Table
               rowSelection={rowSelection} bordered
               rowKey={ (record,i) => record.itemId }
               dataSource={ data }
               columns={this.columns}
               pagination={{
                 total:parseInt(total),
                 current:parseInt(current),
                 pageSize:parseInt(pageSize),
                 showQuickJumper:true,
                 onChange:this.handelchange
               }}
               className="table_order"/>
           </Panel>
         </Collapse>

         <Modal
           visible={visible}
           title="修改采购模板名称"
           onOk={this.handleOk}
           onCancel={this.handleCancel}
           footer={null}
         >
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
           <Button style={{ marginLeft:'80px' }} key="back" size="large" onClick={()=>{ this.handleMakeTem(templateId) }}>修改</Button>
         </Modal>
       </div>
    );
  }
}


export default Form.create()(PurchaseTempletPanel);

