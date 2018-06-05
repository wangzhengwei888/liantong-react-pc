

import React , { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Breadcrumb,Collapse ,Button,Select,Form,Input,Icon,Table,Modal, Row, Col, Tabs} from 'antd';
import PurchaseTempletPanel from './purchaseTempletPanel';
import { templet } from './purchaseTemplet.less';
import Search from '../../components/Search/Search';
import Navigation from '../../components/Navigation/Navigation'

const FormItem = Form.Item;
const Option = Select.Option;
const Panel = Collapse.Panel;
const TabPane = Tabs.TabPane;

class  PurchaseTemplet extends Component{
  constructor(props){
    super(props);
    this.state={
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({ type:'queryChannel/channelListEFF', obj:values });
       // console.log('Received values of form: ', values);
      }
    });
  }

  columns = [
    {
      title: '商家编号',
      dataIndex: 'orgBuyerId',
      key:'orgBuyerId',
    },
    {
      title: '商家名称',
      dataIndex: 'orgSellerName',
      key:'orgSellerName',
    },
    {
      title: '联系人',
      dataIndex: 'orgSellerContacts',
      key:'orgSellerContacts',
    },
    {
      title: '联系方式',
      dataIndex: 'orgSellerTel',
      key:'orgSellerTel',
    },
    {
      title: '渠道状态',
      dataIndex: 'status',
      key:'status',
      render:(text, record) => {
        // console.log(1);
       if(record.status==0){
         return '拒绝'
       }else if(record.status=='1'){
         return '待审核'
       }else {
         return '通过'
       }
      }
    },
    {
      title: '操作',
      dataIndex: 'subtotal',
      key:'subtotal',
      render:(text, record) => {
        return (
          <Link to={`/person/queryChannelDetails/${record.id}`}>查看</Link>
        )
      }
    }
  ];

  handelchange=(pageno,pageSize)=>{
   
    this.props.dispatch({ type:'queryChannel/channelListEFF', obj:{ pageno:pageno } });
  }

  panelHeader=(name,time)=>{
    return (
      <Row type="flex" justify="space-between">
        <Col span={4}>
          <Row type="flex" justify="space-between">
            <div style={{ color:'333', fontWeight:'bold', fontSize:'16px' }}>{name}</div>
            <div style={{ color:'#0066cc' }}>修改</div>
          </Row>
        </Col>
        <Col span={4}>{time}</Col>
        <Col span={8}>
          <Button type="primary" style={{ marginRight:'10px' }}>加入购物车</Button>
          <Button style={{ marginRight:'10px' }}>删除产品</Button>
          <Button style={{ marginRight:'10px' }}>删除模板</Button>
        </Col>
      </Row>
    )
  }



  render (){
    //const { getFieldDecorator } = this.props.form;
    const { PurTemplateList } = this.props.purchase;
    console.log(PurTemplateList)
    const formItemLayout = {
      labelCol: {
        xs: { span: 12 },
      },
      wrapperCol: {
        xs: { span: 12 },
      },
    };


    return (
      <div>
        <Search></Search>
        <Navigation preson={true}>
          <div className={templet} style={{marginLeft:'10px'}}>

            <div className="used_nva_bar">
              <Breadcrumb separator=">">
                <Breadcrumb.Item>我的商城</Breadcrumb.Item>
                <Breadcrumb.Item>设置</Breadcrumb.Item>
                <Breadcrumb.Item>采购模板维护</Breadcrumb.Item>
              </Breadcrumb>
            </div>

            <h2 style={{ margin:'20px 0px', textAlign:'center' }} ></h2>
            {
              PurTemplateList.map((v,i,a)=>{
                return (
                  <PurchaseTempletPanel dispatch={this.props.dispatch} Item={v} key={ v.templateId } />
                )
              })
            }

          </div>
        </Navigation>
      </div>
    );
  }
}


export default connect(({purchase})=>({purchase}),(dispatch,own)=>{return {dispatch,own}})(Form.create()(PurchaseTemplet));

