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
import { Form, Icon, Input, Button, message,Select,Radio,Menu,Pagination  ,Tree ,Checkbox,Modal,Tabs,Table,Popconfirm } from 'antd';
import { buildTemplate} from './BuildTemplate.less'
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
      selectedRowKeys: [],  // Check here to configure the default column
      loading: false,
    }
    this.columns = [{
      title: '操作',
      dataIndex: 'operation',
      key:'operation',
      width: '6%',
      render: (text, record) => {
        return (
          this.state.dataSource.length > 1 ?
            (
              <Popconfirm title="Sure to delete?" onConfirm={() => this.onDelete(record.key)}>
                <a href="#"><Icon type="delete" style={{color:'#3497ce'}} /></a>
              </Popconfirm>
            ) : null
        );
      },
    },{
      title: '商品名称',
      dataIndex: 'name',
      key:'name',
      width: '15%',
      render: (text, record) => (
        <span>商品名称商品名称</span>
      ),
    }, {
      title: '箱规',
      dataIndex: 'Carton',
      key:'Carton',
      width: '9%',
    },  {
      title: '单位',
      dataIndex: 'company',
      key:'company',
      width: '9%',
      render:()=>{
        return (
          <Select defaultValue="jack" style={{ width: '70px' }} onChange={this.handleChange}>
            <Option value="jack">盒</Option>
            <Option value="lucy">瓶</Option>
            <Option value="disabled">箱</Option>
            <Option value="Yiminghe">yiminghe</Option>
          </Select>
        )
      }
    }, {
      title: '采购数量',
      dataIndex: 'purchasing',
      key:'purchasing',
      width: '12%',
      render:()=>{
        return (
          <Stepper num="1" min="1" step="1" max="100" onUpdate={(val) => {this.onChangeNum(val)}}></Stepper>
        )
      }
    },{
      title: '单价',
      dataIndex: 'purchasingPrice',
      key:'purchasingPrice',
      width: '9%',
    },{
      title: '卖家',
      dataIndex: 'seller',
      key:'seller',
      width: '9%',
    },{
      title: '生产厂家',
      dataIndex: 'producer',
      key:'producer',
      width: '15%',
    },{
      title: '库存',
      dataIndex: 'stock',
      key:'stock',
      width: '7%',
    },{
      title: '合计',
      dataIndex: 'subtotal',
      key:'subtotal',
      width: '9%',
    }];

    this.state = {
      dataSource: [{
        key: '0',
        name: '商品名称商品名称',
        Carton: '箱规',
        purchasingPrice:'1',
        seller:'1',
        producer:'1',
        stock:'1',
        subtotal:'1',
      },{
        key: '1',
        name: 'Edward King 0',
        Carton: '32',
        purchasingPrice:'1',
        seller:'1',
        producer:'1',
        stock:'1',
        subtotal:'1',
      },],
      count: 2,
    };
  }
   handleChange=(value)=> {
  // console.log(`selected ${value}`);
}
  /*改变购买数量*/
  onChangeNum=(val)=>{
    // console.log(val)
    this.setState({
      count: val
    })
  }
  start = () => {
    this.setState({ loading: true });
    // ajax request after empty completing
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loading: false,
      });
    }, 1000);
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
  onDelete = (key) => {
    const dataSource = [...this.state.dataSource];
    this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
  }
   handleChange = (value) => {
  // console.log(`selected ${value}`);
}
  render() {
    const { dataSource } = this.state;
    const columns = this.columns;
    const { loading, selectedRowKeys } = this.state;

    return (
      <div className={buildTemplate}>
        <div style={{padding:'20px 0px 18px'}}>
          <span style={{fontSize:'18px',color:'#0085cd',height:'36px'}}>生成采购模板</span>
          <Search
            placeholder="请输入模版名称"
            style={{ width:'275px',float:'right'}}
            onSearch={value => console.log(value)}
          />
          <p style={{fontSize:'14px',color:'#333',paddingTop:'10px',paddingLeft:'8px'}}>模板明细</p>
        </div>

        <div>
          <Table bordered dataSource={dataSource} columns={columns} pagination={false} className="table_order"/>
        </div>
      </div>
    );
  }
}

export default (Form.create()(EditableTable));
