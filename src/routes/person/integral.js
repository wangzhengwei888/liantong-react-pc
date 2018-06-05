/**
 * Created by 10400 on 2017/8/9.
 * 个人中心积分
 */
import React , { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Form, Icon, Table, Button, DatePicker , Tooltip, Select, Upload , Radio,AutoComplete,Menu,Dropdown ,Tree ,Checkbox } from 'antd';
import Img from '../../components/Img/Img';
import { integral_body } from './assetCenter.less'
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
import moment from 'moment';
const RangePicker = DatePicker.RangePicker;

function onChange(dates, dateStrings) {
  console.log('From: ', dates[0], ', to: ', dates[1]);
  console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
}
const columns = [{
  title: '添加时间',
  dataIndex: 'time',
},{
  title: '积分变更',
  dataIndex: 'deposit',
}, {
  title: '描述',
  dataIndex: 'remarks',
}];
const data=[{
    key: 1,
  time: <div className="table_title">2017-08-0800:00:00</div>,
  deposit:`+32`,
  remarks: `订单结算信息`,
  },{
  key: 2,
  time: <div className="table_title">2017-08-0800:00:00</div>,
  deposit:`-14`,
  remarks: `订单结算信息`,
}];
class  Collection_goods extends Component{
  constructor(props){
    super(props);
    this.state={
      formLayout: 'inline',

    }
  }
  componentWillUnmount(){

  }

  render (){
    return (
      <div className={integral_body}>
        <div className="collection_goods_content" style={{width:'980px',float:'right'}}>
          {/*头部单行条*/}
          <div className="used_nva_bar">
            <a href="#">我的商城 > </a>
            <a href="#">资产中心 > </a>
            <span>积分</span></div>
        <Form>
          <div className="collection_goods_table">
            <div className="goods_table_top">
              添加时间：
              <RangePicker
                ranges={{ Today: [moment(), moment()], 'This Month': [moment(), moment().endOf('month')] }}
                onChange={onChange}
                style={{position:'relative',top:'8px'}}
              />

              <Button style={{
                width:'90px',
                height:'32px',fontSize:'14px',
                marginLeft:'10px'
              }}>搜索</Button>
              <p className="span_r">消费积分总数：<span>144</span></p>

            </div>
            <Table columns={columns} dataSource={data}  className="collection_table"/>

          </div>
        </Form>

        </div>
      </div>
    );
  }
}

Collection_goods.propTypes = {
  form: PropTypes.object,
  Collection_goods: PropTypes.object,
  dispatch: PropTypes.func,
}
export default connect(({Collection_goods})=>({Collection_goods}),(dispatch,own)=>{return {dispatch,own}})(Form.create()(Collection_goods));
