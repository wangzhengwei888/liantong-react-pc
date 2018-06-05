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
import { collectionList} from './CollectionList.less'
const FormItem = Form.Item;
const Option = Select.Option;
const TreeNode = Tree.TreeNode;
const TabPane = Tabs.TabPane;
const Search = Input.Search;

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formLayout: 'inline',
      selectedRowKeys: [],
      selectedRows:[],
      loading: false,
    }
  }

//   columns = [{
//   title: '收藏时间',
//   dataIndex: 'time',
//   key:'time',
//   width: '9%',
//   render: (text, record) => (
//     <span>2017-12-25 18:25:35</span>
//   ),
// },{
//   title: '商品名称',
//   dataIndex: 'name',
//   key:'name',
//   width: '15%',
//   render: (text, record) => (
//     <span>商品名称商品名称</span>
//   ),
// }, {
//   title: '箱规',
//   dataIndex: 'Carton',
//   key:'Carton',
//   width: '9%',
// },  {
//   title: '单位',
//   dataIndex: 'company',
//   key:'company',
//   width: '9%',
//   render:()=>{
//     return (
//       <Select defaultValue="jack" style={{ width: '70px' }} onChange={this.handleChange}>
//         <Option value="jack">盒</Option>
//         <Option value="lucy">瓶</Option>
//         <Option value="disabled">箱</Option>
//         <Option value="Yiminghe">yiminghe</Option>
//       </Select>
//     )
//   }
// }, {
//   title: '采购数量',
//   dataIndex: 'purchasing',
//   key:'purchasing',
//   width: '12%',
//   render:()=>{
//     return (
//       <Stepper num="1" min="1" step="1" max="100" onUpdate={(val) => {this.onChangeNum(val)}}></Stepper>
//     )
//   }
// },{
//   title: '单价',
//   dataIndex: 'purchasingPrice',
//   key:'purchasingPrice',
//   width: '9%',
// },{
//   title: '卖家',
//   dataIndex: 'seller',
//   key:'seller',
//   width: '9%',
// },{
//   title: '生产厂家',
//   dataIndex: 'producer',
//   key:'producer',
//   width: '15%',
// },{
//   title: '库存',
//   dataIndex: 'stock',
//   key:'stock',
//   width: '7%',
// },{
//   title: '合计',
//   dataIndex: 'subtotal',
//   key:'subtotal',
//   width: '9%',
// }];

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
    title: '单价',
    dataIndex: 'purchasingPrice',
    key:'purchasingPrice',
   // width: '9%',
  },{
    title: '卖家',
    dataIndex: 'storeName',
    key:'storeName',
   // width: '9%',
  },{
    title: '生产厂家',
    dataIndex: 'brandName',
    key:'brandName',
   // width: '15%',
  },{
    title: '库存',
    dataIndex: 'goodsShowStorage',
    key:'goodsShowStorage',
   // width: '7%',
  },
  //   {
  //   title: '合计',
  //   dataIndex: 'subtotal',
  //   key:'subtotal',
  //   width: '9%',
  // }
  ];

   handleChange=(value)=> {
   console.log(`selected ${value}`);
  }
  /*改变购买数量*/
  onChangeNum=(val)=>{
    console.log(val)
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


   // handleChange = (value) => {
   //  console.log(`selected ${value}`);
   // }

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

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
       // this.props.form.setFieldsValue({ goodsName:'' })
        this.props.dispatch({ type:'QuickOrder/getGoodsFavoritesEFF',
          obj:{
            pageNo:1,
            goodsName:values.goodsName,
          }
        });
      }
    });
  }

  handelchange=(pageno,pageSize)=>{
    // console.log(pageno);
    //this.props.dispatch({ type:'home/loadUser',pageNo:pageno })
    this.props.dispatch({ type:'QuickOrder/getGoodsFavoritesEFF', obj:{ pageNo:pageno } });
  }

  handleOk1=()=>{
    let arr=this.state.selectedRows.map((v,i)=>{
      v.goodsNum=v.isSellpiece == 0 ? v.packTotal : 1;
      return v
    })
    this.props.dispatch({ type:'QuickOrder/addSelectData', arr });
    this.props.onCancel();
  }

  // componentDidUpdate(pp,ps){
  //   //console.log(pp)
  // }



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
      <div className={collectionList}>
        <Row  style={{padding:'20px 18px 18px'}} type="flex" justify="space-between">
          <Col><span style={{fontSize:'18px',color:'#0085cd',height:'36px'}}>我的收藏</span></Col>
          <Col>
            <Form onSubmit={this.handleSubmit} className="login-form">
            <FormItem style={{ marginBottom:"0rem" }}>
              {getFieldDecorator('goodsName', {
                initialValue:'',
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
          <Table
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
            rowKey={ (record,i) => record.goodsId }

            className="table_order"/>
        </div>
        <div style={{textAlign:'center'}}>
          <Button key="submit" disabled={ selectedRows.length >0 ? false : true }   onClick={this.handleOk1} type="primary" style={{
            width:'120px',
            fontSize:'16px',
            fontWeight:'bold',
            height:'40px',
            backgroundColor:'#2eb6aa',
            borderColor:'#2eb6aa'}}>确认导入</Button>
        </div>
      </div>
    );
  }
}

export default connect(({QuickOrder})=>({QuickOrder}),(dispatch,own)=>{return {dispatch,own}})(Form.create()(EditableTable));
