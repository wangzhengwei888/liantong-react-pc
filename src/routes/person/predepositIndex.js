/**
 * Created by 10400 on 2017/8/9.
 * 个人中心余额
 */
import React , { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Form, Icon, Table, Button, Steps, Tooltip, Select, Upload , Radio,AutoComplete,Menu,Dropdown ,Tree ,Checkbox } from 'antd';
import Img from '../../components/Img/Img';
import { predepositIndex_body } from './assetCenter.less'
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const columns = [{
  title: '时间',
  dataIndex: 'time',
},{
  title: '存入',
  dataIndex: 'deposit',
}, {
  title: '支出',
  dataIndex: 'expenditure',
}, {
  title: '备注',
  dataIndex: 'remarks',
}];
const data=[{
    key: 1,
  time: <div className="table_title">2017-08-0800:00:00</div>,
  deposit:`678.21`,
  expenditure: `-`,
  remarks: `订单结算信息`,
  },{
  key: 2,
  time: <div className="table_title">2017-08-0800:00:00</div>,
  deposit:`678.21`,
  expenditure: `-`,
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
      <div className={predepositIndex_body}>
        <div className="collection_goods_content" style={{width:'980px',float:'right'}}>
          {/*头部单行条*/}
          <div className="used_nva_bar">
            <a href="#">我的商城 > </a>
            <a href="#">收藏中心 > </a>
            <span>余额</span></div>
        <Form>
          <div className="collection_goods_table">
            <div className="goods_table_top">
              可用余额：<span style={{fontSize:'12px',color:'#fe8415',paddingRight:'10px'}}>￥7294485.99</span> 锁定余额：<span style={{fontSize:'12px',color:'#fe8415',paddingRight:'10px'}}>￥0.00</span>
              <Button type="primary" style={{
                backgroundColor:'#c40000',
                borderColor:'#c40000',
                width:'90px',
                height:'32px',fontSize:'14px',
                marginLeft:'20px'
              }}>充值</Button>
              <Button type="primary" style={{
                backgroundColor:'#c40000',
                borderColor:'#c40000',
                width:'90px',
                height:'32px',fontSize:'14px',
                marginLeft:'10px'
              }}>申请提现</Button>

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
