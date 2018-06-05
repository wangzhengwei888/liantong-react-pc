/**
 * Created by 10400 on 2018.3.22
 * 资质上传页面
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import {
 Breadcrumb,
 Upload,
 Table,
 Checkbox,
 Row,
 Col,
 Select,
 Pagination,
 Input,
 Button,
 Form,
 Menu,
 Dropdown,
 Icon,
 message,
 Modal
} from 'antd'

import Search from '../../components/Search/Search';
import Navigation from '../../components/Navigation/Navigation';
import Img from '../../components/Img/Img';
import {upShow, notes, fileUp} from "../presonAccount/intelligentHistory.less";


const FormItem = Form.Item;
const Option = Select.Option;


class intelligentHistory extends Component {
 constructor(props) {
  super(props);
  this.state = {
   value: '',
   current: 1,
  }

 }

 onChange = (pagination) => {
  console.log(pagination.current)
  this.props.dispatch({type: 'authen/getAttachmentListEFF', val: {pageNo: pagination.current}})
  window.scrollTo(0,0)
 };


 columns = [
  {
   title: '上传时间',
   dataIndex: 'createTime',
   key: 'createTime'
  },
  {
   title: '资质类型',
   dataIndex: 'fileType',
   key: 'fileType'
  },
  {
   title: '资质属性',
   dataIndex: 'attachmentType',
   key: 'attachmentType'
  },
  {
   title: '最后有效期或订单未完成的关联订单',
   dataIndex: 'orderSn',
   key: 'attachmentId',
   render: (text, record) => (
    <span>
     {record.orderSn ? record.orderSn : record.endDate}
    </span>
   ),
  }
 ];

 render() {
  const {AttachmentListData, pageNo, pageSize, count} = this.props.authen;
  return <div>
   <div><Search></Search></div>
   <Navigation preson={true}>
  {/* <div className="alls_guanggao_img"><Img style={{width: '100%', height: "100%"}}
                                            src="upload/img/lmadv/1502347639097.jpg"/></div>*/}
    <div className={upShow}>
      <div className="my_account_dynamic_Topimg"></div>
     <Breadcrumb separator=">" className='security_nav_bar'>
      <Breadcrumb.Item href="/presonAccunt/myAccount">我的账户</Breadcrumb.Item>
      <Breadcrumb.Item href="/presonAccount/personalInformation">我的信息</Breadcrumb.Item>
      <Breadcrumb.Item>资质上传</Breadcrumb.Item>
     </Breadcrumb>
     <h2 className="title">资质上传记录</h2>
     <Table bordered pagination={{current: pageNo, pageSize: pageSize, total: count}} onChange={(pagination) => {
      this.onChange(pagination)
     }} className="intelligentUp_Detail" dataSource={AttachmentListData} rowKey={record => record.attachmentId}
            columns={this.columns}/>

    </div>
   </Navigation>
  </div>

 }
}

export default connect(({authen}) => ({authen}), (dispatch, own) => {
 return {dispatch, own}
})(intelligentHistory);
