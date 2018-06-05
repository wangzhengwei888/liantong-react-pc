/**
 * Created by 10400 on 2017/8/9.
 * order快速下单-选择采购模版
 */
import React , { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import Coupon from './coupon';
import { IMAGE_DOMAIN } from '../../utils/common';

import Stepper from '../../components/Stepper/Stepper'
import { Form, Icon, Input, Button, message,Select,Radio,Menu,Pagination  ,Tree ,Checkbox,Modal,Tabs,Table,Popconfirm } from 'antd';
import { purchasingTemplate} from './PurchasingTemplate.less'
const FormItem = Form.Item;
const Option = Select.Option;
const TreeNode = Tree.TreeNode;
const TabPane = Tabs.TabPane;

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      formLayout: 'inline',
      selectedRowKeys: [],
      selectedRows:[],
      templateId:'',
      loading: false,
    }

  }

    columns = [{
      title: '商品名称',
      dataIndex: 'goodsName',
      key:'goodsName',
      //width: '15%',
      render: (text, record) => (
        <span>{record.goodsName}</span>
      ),
    }, {
      title: '规格',
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
    //   {
    //   title: '采购数量',
    //   dataIndex: 'purchasing',
    //   key:'purchasing',
    //   width: '12%',
    //   render:(text,record, index)=>{
    //     if(typeof record.goodsNum !='undefined'){
    //       return (
    //         <Stepper
    //           // key={goods.goodsNum + init}
    //           nowNum={record.goodsNowStorage}
    //           btnClassName='btnClass'
    //           inputClassName='inputClass'
    //           num={record.goodsNum}
    //           min={record.isSellpiece == 0 ? record.packTotal : 1}
    //           max={record.maxBuyNum == 0 ? record.goodsNowStorage : record.maxBuyNum}
    //           step={record.isSellpiece == 0 ? record.packTotal : 1}
    //           onUpdate={(val)=>this.updateCart(record.goodsId,val)} disabled={false}/>
    //       )
    //     }
    //   }
    // },
      {
        title: '采购数量',
        dataIndex: 'buyNum',
        key:'buyNum',
        //width: '9%',
      },
      {
      title: '单价',
      dataIndex: 'channelPrice',
      key:'channelPrice',
      //width: '9%',
    },
    // {
    //   title: '卖家',
    //   dataIndex: 'storeName',
    //   key:'storeName',
    //   //width: '9%',
    // },
    {
      title: '厂家',
      dataIndex: 'brandName',
      key:'brandName',
      //width: '15%',
    },{
      title: '库存',
      dataIndex: 'goodsShowStorage',
      key:'goodsShowStorage',
      //width: '7%',
    },
    //   {
    //   title: '合计',
    //   dataIndex: 'subtotal',
    //   key:'subtotal',
    //   width: '9%',
    // }
    ];


  /*改变购买数量*/
  onChangeNum=(val)=>{
    // console.log(val)
    this.setState({
      count: val
    })
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
    let goodsIdArr = this.props.QuickOrder.selectData.map((gv,gi)=> gv.goodsId )
   let filterArr = selectedRowKeys.filter((v, i, a) => {
      return !goodsIdArr.includes(v)
    })
    let filterArrRows = selectedRows.filter((v, i, a) => {
      return !goodsIdArr.includes(v.goodsId)
    })

    //console.log(filterArr,filterArrRows);
    if(filterArr.length!=selectedRowKeys.length){
      //this.setState({ selectedRowKeys, selectedRows });
      message.warning('已经加入采购列表', 1.5)
    }
   // console.log('selectedRowKeys changed: ', selectedRows);
    this.setState({ selectedRowKeys:filterArr, selectedRows:filterArrRows });
  }

   handleChange = (value) => {
     this.setState({
       templateId:value,
       selectedRowKeys:[],
       selectedRows:[]
     })
      //console.log(`selected ${value}`);
     this.props.dispatch({ type:'QuickOrder/getPurTemplateItemEFF', obj:{ templateId:value, pageSize:10, pageNo:1 } });
    }



  handleOk1=()=>{
   // record.goodsNum=0;
    let arr=this.state.selectedRows.map((v,i)=>{
     // v.goodsNum=v.isSellpiece == 0 ? v.packTotal : 1;
      v.goodsNum=v.buyNum;
      return v
    })

    this.props.dispatch({ type:'QuickOrder/addSelectData', arr });
    this.props.onCancel();
  }

  handelchange=(pageno,pageSize)=>{
    // console.log(pageno);
    //this.props.dispatch({ type:'home/loadUser',pageNo:pageno })
    this.props.dispatch({ type:'QuickOrder/getPurTemplateItemEFF', obj:{ pageNo:pageno } });
  }


  render() {
    const { PurTemplateList, PurTemplateItem } = this.props.QuickOrder;
    let {templateId, data:dataSource, total, pageNo:current, pageSize } = PurTemplateItem;
   // console.log(PurTemplateList);

    //const { templateId } = this.state;
    const {  selectedRowKeys, selectedRows } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    // console.log(selectedRowKeys,selectedRows);

    return (
      <div className={purchasingTemplate}>
        <div style={{paddingBottom:'18px'}}>
          模板名称：<Select value={ templateId }  style={{ width: '280px' }} size="large" onChange={this.handleChange}>
          {
            PurTemplateList.map((v,i)=>{
            return (
              <Option key={v.templateId} value={v.templateId}>{v.templateName}</Option>
            )
          })
          }
          </Select>
        </div>
        <div>
          <Table
            rowSelection={rowSelection} bordered
            rowKey={ (record,i) => record.goodsId }
            dataSource={dataSource} columns={this.columns}
            pagination={{
              total:parseInt(total),
              current:parseInt(current),
              pageSize:parseInt(pageSize),
              showQuickJumper:true,
              onChange:this.handelchange
            }}
            className="table_order"/>
          <div style={{textAlign:'center'}}>
            <Button key="submit" disabled={ selectedRows.length >0 ? false : true }  onClick={this.handleOk1} type="primary" style={{
              width:'120px',
              fontSize:'16px',
              fontWeight:'bold',
              height:'40px',
              backgroundColor:'#2eb6aa',
              marginTop:'20px',
              borderColor:'#2eb6aa'}}>确认导入</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(({QuickOrder})=>({QuickOrder}),(dispatch,own)=>{return {dispatch,own}})(Form.create()(EditableTable));
