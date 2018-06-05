/**
 * Created by 10400 on 2017/8/9.
 * 个人中心-群组管理
 */
import React , { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Form, Icon, Table, Button,  Modal, Select, Upload , Radio,AutoComplete,Menu,Input ,Tabs ,Checkbox } from 'antd';
import Img from '../../components/Img/Img';
import { routerRedux } from 'dva/router';
import { groupManagement_body,group_modal } from './groupManagement.less'
const SubMenu = Menu.SubMenu;
const Option = Select.Option;
const TabPane = Tabs.TabPane;




class  GroupManagement extends Component{
  constructor(props){
    super(props);
    this.state={
      loading: false,
      visible: false,
    }
  }

   columns = [{
  title: '成员名称',
  dataIndex: 'text1',
},{
  title: '类型',
  dataIndex: 'text2',
},{
  title: '群主',
  dataIndex: 'text3',
}, {
  title: '创建时间',
  dataIndex: 'text4',
}, {
  title: '操作',
  dataIndex: 'text5',
}];

   gotoGrouptDetail=()=>{
  console.log(123)
  this.props.dispatch(routerRedux.push('/person/groupManagementDetail'));
}
   data=[{
  key: 1,
  text1: `销售一群（210000）`,
  text2:`企业`,
  text3:`张三`,
  text4: <div>2017-07-03 15:00</div>,
  text5: <div><a href="javascript:" style={{color:'#3597ce'}} onClick={()=>this.gotoGrouptDetail()}>群管理</a></div>,
},{
  key: 2,
  text1: `销售一群（210000）`,
  text2:`企业`,
  text3:`张三`,
  text4: <div>2017-07-03 15:00</div>,
  text5: <div><a href="#" style={{color:'#3597ce'}}>群管理</a></div>,
}];

  componentWillUnmount(){

  }
  handleChange=(value)=> {
    console.log(`selected ${value}`);
  }
  callback=(key)=> {
    console.log(key);
  }
 /* gotoGrouptDetail=()=>{
    console.log(123)
    this.props.router.push(`person/groupManagementDetail`)

  }*/

  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  }
  handleCancel = () => {
    this.setState({ visible: false });
  }

  render (){
    const { visible, loading } = this.state;
    return (
      <div className={groupManagement_body}>

        <div className="collection_goods_content" style={{width:'980px',float:'right'}}>
          {/*头部单行条*/}
          <div className="used_nva_bar">
            <a href="#">我的商城 > </a>
            <a href="#">我的群组 > </a>
            <span>群组管理</span></div>

        <Form>
          <div className="collection_goods_table">
            <Tabs onChange={this.callback} type="card">
              <TabPane tab={<div>全部组群</div>} key="1">
                <div className="groupManagement_tabBox">
                  <div className="tabBox_top">
                    <Button type="primary" style={{
                      width:'100px',
                      height:'30px',fontSize:'14px',
                      marginLeft:'10px',
                      backgroundColor:'#2eb6aa',
                      borderColor:'#2eb6aa'

                    }} onClick={this.showModal}>新增群组</Button>
                    <p style={{float:'right'}}>
                      <Input size="large" placeholder="群组名称/群组编号/群主" style={{width:'400px',marginLeft:'10px',marginRight:'20px',height:'30px'}} />
                      <Button type="primary" style={{
                      width:'60px',
                      height:'30px',fontSize:'14px',
                      marginLeft:'10px',
                      backgroundColor:'#3497ce',
                      borderColor:'#3497ce'
                    }}>搜索</Button></p>
                  </div>
                  <div className="tabBox_child">
                    <Tabs defaultActiveKey="1" onChange={this.callback}>
                      <TabPane tab={<span style={{borderRight:'1px solid #666',padding:'2px 35px 2px 0px'}}>成员列表</span>} key="1" style={{marginRight:'0px'}}>
                        <Table columns={this.columns} dataSource={this.data}  className="collection_table"  bordered pagination={false}/>
                      </TabPane>
                      <TabPane tab="成员记录" key="2" disabled>Content of Tab Pane 2</TabPane>

                    </Tabs>
                  </div>

                </div>

              </TabPane>
              <TabPane tab="我的组群" key="2" disabled>Content of Tab Pane 2</TabPane>
            </Tabs>


          </div>
        </Form>
          {/*新建组群弹窗*/}
          <Modal
            visible={visible}
            title="新建组群"
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            className={group_modal}
            footer={[
              <Button key="submit" type="primary" size="large" style={{width:'120px',height:'40px'}} onClick={this.handleOk}>确认</Button>,
              <Button key="back" size="large" onClick={this.handleCancel} style={{width:'120px',height:'40px',marginLeft:'60px'}}>取消</Button>,
            ]}
          >
            <p><span className="span_l">群名称:</span><Input placeholder="Basic usage" style={{width:'230px',height:'30px'}}/></p>
            <p><span className="span_l">群类型:</span><Select defaultValue="所有订单" style={{ width:'230px',height:'30px'}} onChange={this.handleChange}>
              <Option value="所有订单">所有订单</Option>
              <Option value="已付款">已付款</Option>
              <Option value="待收货">待收货</Option>
              <Option value="已收货">已收货</Option>
            </Select></p>
            <p><span className="span_l">群主:</span><Select defaultValue="所有订单" style={{ width:'230px',height:'30px'}} onChange={this.handleChange}>
              <Option value="所有订单">所有订单</Option>
              <Option value="已付款">已付款</Option>
              <Option value="待收货">待收货</Option>
              <Option value="已收货">已收货</Option>
            </Select></p>
          </Modal>
        </div>

      </div>
    );
  }
}

GroupManagement.propTypes = {
  form: PropTypes.object,
  GroupManagement: PropTypes.object,
  dispatch: PropTypes.func,
}
export default connect(({GroupManagement})=>({GroupManagement}),(dispatch,own)=>{return {dispatch,own}})(Form.create()(GroupManagement));
