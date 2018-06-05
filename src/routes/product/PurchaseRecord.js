/**
 * Created by 10400 on 2017/8/9.
 * order快速下单-收藏清单
 */
import React , { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import Coupon from './coupon';
import { IMAGE_DOMAIN } from '../../utils/common';
import Stepper from '../../components/Stepper/Stepper'
import { Form, Icon, Input, Button, message,Select,Radio,Menu,Pagination  ,Tree ,Checkbox,Modal,Tabs,Table,Popconfirm, Row,Col } from 'antd';
import { purchaseRecord} from './PurchaseRecord.less'
const FormItem = Form.Item;
const Option = Select.Option;
const TreeNode = Tree.TreeNode;
const TabPane = Tabs.TabPane;
const Search = Input.Search;

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      formLayout: 'inline',
      dateTypedateType:'week',
      selectedRowKeys: [],
      selectedRows:[],
      loading: false,
    }
  }

  componentDidMount(){

    // this.props.dispatch({ type:'queryChannel/getRecentPurGoodsEFF',
    //   obj:{
    //   pageno:1,
    //   storeId:'',
    //   goodsName:'',
    //   dateTypedateType:'week',
    //   }
    // });
  }

  columns = [
    {
      title: '采购时间',
      dataIndex: 'orderCreateDateStr',
      key:'orderCreateDateStr',
      // width: '15%',
      //  render: (text, record) => (
      //    <span>{record.goodsName}</span>
      //  ),
    },
    {
    title: '商品名称',
    dataIndex: 'goods.goodsName',
    key:'goods.goodsName',
   // width: '15%',
   //  render: (text, record) => (
   //    <span>{record.goodsName}</span>
   //  ),
  },
    {
    title: '规格',
    dataIndex: 'goods.goodsSpec',
    key:'goods.goodsSpec',
   // width: '9%',
  },  {
    title: '单位',
    dataIndex: 'goods.goodsUnitName',
    key:'goods.goodsUnitName',
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
    title: '厂家',
    dataIndex: 'goods.brandName',
    key:'goods.brandName',
   // width: '15%',
  },
  {
    title: '采购数量',
    dataIndex: 'productSellBillQty',
    key:'productSellBillQty',
  },
  {
    title: '单价',
    dataIndex: 'goods.channelPrice',
    key:'goods.channelPrice',
   // width: '9%',
  },
  // {
  //   title: '卖家',
  //   dataIndex: 'goods.storeName',
  //   key:'goods.storeName',
  //  // width: '9%',
  // },
  // 
  {
    title: '库存',
    dataIndex: 'goods.goodsShowStorage',
    key:'goods.goodsShowStorage',
   // width: '7%',
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

    let arr=this.state.selectedRows.map((v,i)=>{
      //v.goodsNum=v.isSellpiece == 0 ? v.packTotal : 1;
      v.goods.goodsNum=v.productSellBillQty;
      return v.goods
    })


    let filterArrRows = selectedRows.filter((v, i, a) => {
      return !goodsIdArr.includes(v.goods.goodsId)
    })

    //console.log(filterArrRows);

    //console.log(selectedRowKeys);

    let filterArr = filterArrRows.map((v, i, a) => {
      return v.orderItemId
    })
    //console.log(filterArr);
    //
    // //console.log(filterArr,filterArrRows);
    if(filterArr.length!=selectedRowKeys.length){
      //this.setState({ selectedRowKeys, selectedRows });
      message.warning('已经加入采购列表', 1.5)
    }
    // console.log('selectedRowKeys changed: ', selectedRows);
    this.setState({ selectedRowKeys:filterArr, selectedRows:filterArrRows });
  }



  callback = (key) => {
   // console.log(key);
    this.setState({
      dateTypedateType:key,
    })
  //  console.log(this.state.selectedRowKeys);
    this.setState({ selectedRowKeys:[], selectedRows:[] });
    this.props.dispatch({ type:'QuickOrder/getRecentPurGoodsEFF',
      obj:{
        pageNo:1,
        //  storeId:this.state.selectStore,
        goodsName:'',
        dateType:key,
      }
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
       // console.log('Received values of form: ', values);
        //this.props.form.setFieldsValue({ goodsName:'' })
        this.props.dispatch({ type:'QuickOrder/getRecentPurGoodsEFF',
          obj:{
            pageNo:1,
          //  storeId:this.state.selectStore,
            goodsName:values.goodsName,
            dateType:this.state.dateTypedateType,
          }
        });
      }
    });
  }

  handelchange=(pageno,pageSize)=>{
    // console.log(pageno);
    //this.props.dispatch({ type:'home/loadUser',pageNo:pageno })
    this.props.dispatch({ type:'QuickOrder/getRecentPurGoodsEFF', obj:{ pageNo:pageno } });
  }

  handleOk1=()=>{
    let arr=this.state.selectedRows.map((v,i)=>{
      //v.goodsNum=v.isSellpiece == 0 ? v.packTotal : 1;
      v.goods.goodsNum=v.productSellBillQty;
      return v.goods
    })
   // console.log(arr);

    let newArr=[];
    let hasObj={};
    //console.log(hasObj['55']);
    for(let i=0;i<arr.length;i++){
      //console.log(hasObj);
       if(hasObj[arr[i].goodsId]==undefined){
         //console.log(hasObj);
         newArr.push(arr[i]);
         hasObj[arr[i].goodsId]=newArr.length-1;
       }else {
         newArr[hasObj[arr[i].goodsId]].goodsNum+=arr[i].goodsNum;
       }
    }
  //  console.log(newArr);


     this.props.dispatch({ type:'QuickOrder/addSelectData', arr:newArr });
     this.props.onCancel();
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    //const { dataSource, dateTypedateType } = this.state;
    //const columns = this.columns;
    const { loading, selectedRowKeys, dateTypedateType, selectedRows } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const { RecentPurGoods } = this.props.QuickOrder;
    let { data:dataSource, total, pageNo:current, pageSize } = RecentPurGoods;


    return (
      <div className={purchaseRecord}>

        <Row  style={{padding:'20px 18px 18px'}} type="flex" justify="space-between">
          <Col> <span style={{fontSize:'16px',color:'#333',height:'36px'}}>最近购买记录</span></Col>
          <Col>
            <Form onSubmit={this.handleSubmit} className="login-form">
              <FormItem>
                {getFieldDecorator('goodsName', {

                })(
                  <Search
                    placeholder="商品名称"
                    style={{ width:'375px',float:'right'}}
                  />
                )}
              </FormItem>
            </Form>
          </Col>
        </Row>

        <div>
          <Tabs activeKey={ dateTypedateType } onChange={this.callback}>
            <TabPane tab="最近一周" key="week">
              {
                dateTypedateType=='week' ?  <Table
                  rowSelection={rowSelection}
                  bordered dataSource={dataSource}
                  columns={this.columns}
                  pagination={{
                    total:parseInt(total),
                    current:parseInt(current),
                    pageSize:parseInt(pageSize),
                    showQuickJumper:true,
                    onChange:this.handelchange
                  }}
                  rowKey={ (record,i) => {return record.orderItemId} }
                  className="table_order"/> : ''
              }
            </TabPane>
            <TabPane tab="最近一月" key="month">
              {
                dateTypedateType=='month' ?  <Table
                  rowSelection={rowSelection}
                  bordered dataSource={dataSource}
                  columns={this.columns}
                  pagination={{
                    total:parseInt(total),
                    current:parseInt(current),
                    pageSize:parseInt(pageSize),
                    showQuickJumper:true,
                    onChange:this.handelchange
                  }}
                  rowKey={ (record,i) => record.orderItemId }
                  className="table_order"/> : ''
              }
            </TabPane>
            <TabPane tab="最近三月" key="3month">
              {
                dateTypedateType=='3month' ?  <Table
                  rowSelection={rowSelection}
                  bordered dataSource={dataSource}
                  columns={this.columns}
                  pagination={{
                    total:parseInt(total),
                    current:parseInt(current),
                    pageSize:parseInt(pageSize),
                    showQuickJumper:true,
                    onChange:this.handelchange
                  }}
                  rowKey={ (record,i) => record.orderItemId }
                  className="table_order"/> : ''
              }
            </TabPane>
            <TabPane tab="最近半年" key="6month">
              {
                dateTypedateType=='6month' ?  <Table
                  rowSelection={rowSelection}
                  bordered dataSource={dataSource}
                  columns={this.columns}
                  pagination={{
                    total:parseInt(total),
                    current:parseInt(current),
                    pageSize:parseInt(pageSize),
                    showQuickJumper:true,
                    onChange:this.handelchange
                  }}
                  rowKey={ (record,i) => record.orderItemId }
                  className="table_order"/> : ''
              }
            </TabPane>
            <TabPane tab="最近一年" key="year">
              {
                dateTypedateType=='year' ?  <Table
                  rowSelection={rowSelection}
                  bordered dataSource={dataSource}
                  columns={this.columns}
                  pagination={{
                    total:parseInt(total),
                    current:parseInt(current),
                    pageSize:parseInt(pageSize),
                    showQuickJumper:true,
                    onChange:this.handelchange
                  }}
                  rowKey={ (record,i) => record.orderItemId }
                  className="table_order"/> : ''
              }
            </TabPane>
          </Tabs>
          {/*<Table rowSelection={rowSelection} bordered dataSource={dataSource} columns={columns} pagination={false} className="table_order"/>*/}
        </div>

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
    );
  }
}

export default connect(({QuickOrder})=>({QuickOrder}),(dispatch,own)=>{return {dispatch,own}})(Form.create()(EditableTable));
