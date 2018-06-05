/**
 * Created by 10400 on 2017/8/9.
 * 个人中心兑换礼品
 */
import React , { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Form, Icon, Table, Button, Tooltip, Select, Upload , Radio,AutoComplete,Menu,Input ,Tree ,Checkbox } from 'antd';
import Img from '../../components/Img/Img';
import { giftExchange_body } from './giftExchange.less'
const SubMenu = Menu.SubMenu;
const Option = Select.Option;
const columns = [{
  title: '商品信息',
  dataIndex: 'name',
},{
  title: '数量',
  dataIndex: 'number',
},{
  title: '收货人',
  dataIndex: 'consignee',
}, {
  title: '所需积分',
  dataIndex: 'integral',
}, {
  title: '状态与操作',
  dataIndex: 'operation',
}];


const data=[{
    key: 1,
    name: <div className="table_title">
      <div className="table_title_l"><Img src="upload/img/lmadv/1502161242926.jpg" /></div>
      <div className="table_title_r">
        <p className="span_p1"><a href="#">ThinkPad E450(20DCA09HCD)14英寸笔记本</a></p>
        <p className="span_p2">售出：<span style={{color:'#ff0101'}}>5</span>件（<span style={{color:'#ff0101'}}>0</span>条评论）</p>
      </div>
    </div>,
  number:`1`,
  consignee:`张三`,
  integral: <div>1<br />免运费</div>,
  operation: <div><Button type="primary">确认收货</Button></div>,
  },{
  key: 2,
  name: <div className="table_title">
    <div className="table_title_l"><Img src="upload/img/lmadv/1502161242926.jpg" /></div>
    <div className="table_title_r">
      <p className="span_p1"><a href="#">ThinkPad E450(20DCA09HCD)14英寸笔记本</a></p>
      <p className="span_p2">售出：<span style={{color:'#ff0101'}}>5</span>件（<span style={{color:'#ff0101'}}>0</span>条评论）</p>
    </div>
  </div>,
  number:`1`,
  consignee:`张三`,
  integral: <div>1<br />免运费</div>,
  operation: <div><Button type="primary">确认收货</Button></div>,
}];


class  Collection_goods extends Component{
  constructor(props){
    super(props);
    this.state={

    }
  }
  componentWillUnmount(){

  }
  handleChange=(value)=> {
    console.log(`selected ${value}`);
  }
tableHeadertitle=()=>{
    return <div className="tableHeader">
      <p>订单号：2017616151515156156515 &nbsp;&nbsp;&nbsp;&nbsp;购买时间：2017-03-15 19:36:56</p>
      <span title="查看订单"></span>
    </div>
}
  render (){

    return (
      <div className={giftExchange_body}>

        <div className="collection_goods_content" style={{width:'980px',float:'right'}}>
          {/*头部单行条*/}
          <div className="used_nva_bar">
            <a href="#">我的商城 > </a>
            <a href="#">兑换中兴 > </a>
            <span>兑换礼品</span></div>

        <Form>
          <div className="collection_goods_table">
            <div className="goods_table_top">
              订单号：<Input size="large" placeholder="large size" style={{width:'200px',marginLeft:'10px',marginRight:'20px'}} />
              订单状态：
              <Select defaultValue="所有订单" style={{ width:'120px'}} onChange={this.handleChange}>
              <Option value="所有订单">所有订单</Option>
              <Option value="已付款">已付款</Option>
              <Option value="待收货">待收货</Option>
              <Option value="已收货">已收货</Option>
            </Select>
              <p className="span_r"><Button style={{
                width:'90px',
                height:'32px',fontSize:'14px',
                marginLeft:'10px'
              }}>搜索</Button></p>

            </div>
            <Table columns={columns} dataSource={data}  className="collection_table" title={() => this.tableHeadertitle()} bordered/>

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
