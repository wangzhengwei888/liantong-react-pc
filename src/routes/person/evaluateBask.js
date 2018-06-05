/**
 * Created by b2b2c on 2017/8/31.
 */
import React , { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Form, Icon, Table, Button, Tooltip, Select, Upload , Radio,AutoComplete,Menu,Input ,Tree ,Checkbox } from 'antd';

import { Breadcrumb } from 'antd';
import Img from '../../components/Img/Img';
import { evaluateBask_body } from './evaluateBask.less'
const SubMenu = Menu.SubMenu;
const Option = Select.Option;
const columns = [{
  title: '商品',
  dataIndex: 'goods',
},{
  title: '内容',
  dataIndex: 'content',
},{
  title: '评论时间',
  dataIndex: 'addtime',
}];

const data=[{
  key: 1,
  goods: <div className="table_title">
    <div className="table_title_l"><Img src="upload/img/lmadv/1502161242926.jpg" /></div>
    <div className="table_title_r">
      <p className="span_p1"><a href="#">ThinkPad E450(20DCA09HCD)14英寸笔记本</a></p>
      <p className="span_p2"><span style={{color:'#ff0101'}}>50</span>元</p>
    </div>
  </div>,
  content:`发货很快,CD挺好的`,
  addtime: <div>2017年08月31日   16:27:24</div>,
}];


class  evaluateBask extends Component{
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

  render (){

    return (
      <div className={evaluateBask_body}>

        <div className="collection_goods_content" style={{width:'980px',float:'right'}}>
          {/*头部单行条*/}
          <div style={{lineHeight:'42px',
            height:'42px',
            fontSize:'12px',
            backgroundColor:'#f2f2f2',
            border:'1px solid #e2e1e2',
            paddingLeft:'16px',
          marginBottom:'16px'}}>
            <Breadcrumb separator=">">
              <Breadcrumb.Item>我的商城</Breadcrumb.Item>
              <Breadcrumb.Item href="">兑换中心</Breadcrumb.Item>
              <Breadcrumb.Item href="" style={{fontSize:'14px',fontWeight:'600'}}>兑换礼品</Breadcrumb.Item>
            </Breadcrumb>
          </div>


              <Table columns={columns} dataSource={data}  className="collection_table"  bordered/>

            </div>

        </div>
    );
  }
}

evaluateBask.propTypes = {
  form: PropTypes.object,
  Collection_goods: PropTypes.object,
  dispatch: PropTypes.func,
}
export default connect(({evaluateBask})=>({evaluateBask}),(dispatch,own)=>{return {dispatch,own}})(Form.create()(evaluateBask));
