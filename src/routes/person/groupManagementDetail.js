/**
 * Created by 10400 on 2017/8/9.
 * 个人中心群组管理-群信息
 */
import React , { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Form, Icon, Table, Button, Tooltip, Select, Modal , Radio,AutoComplete,Menu,Input ,Tabs ,Checkbox ,Switch} from 'antd';
import Img from '../../components/Img/Img';
import { groupManagementDetail_body ,group_modal2} from './groupManagement.less'
const SubMenu = Menu.SubMenu;
const Option = Select.Option;
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const AutoCompleteOption = AutoComplete.Option;

const columns = [{
  title: '成员名称',
  dataIndex: 'text1',
},{
  title: '账号',
  dataIndex: 'text2',
},{
  title: '最近登录时间',
  dataIndex: 'text3',
}, {
  title: '加入时间',
  dataIndex: 'text4',
}, {
  title: '操作',
  dataIndex: 'text5',
}];
const data=[{
    key: 1,
  text1: `销售1`,
  text2:`56156156164816515`,
  text3:`2017-07-03 15:00`,
  text4: <div>2017-07-03 15:00</div>,
  text5: <div><a href="#" style={{color:'#3597ce'}}>移除</a></div>,
  },{
  key: 2,
  text1: `销售2`,
  text2:`56156156164816515`,
  text3:`2017-07-03 15:00`,
  text4: <div>2017-07-03 15:00</div>,
  text5: <div><a href="#" style={{color:'#3597ce'}}>移除</a></div>,
}];
/*审批管理*/
const columns2 = [{
  title: '审批类型',
  dataIndex: 'text1',
},{
  title: '审批流程名称',
  dataIndex: 'text2',
},{
  title: '创建人',
  dataIndex: 'text3',
}, {
  title: '状态',
  dataIndex: 'text4',
}, {
  title: '创建时间',
  dataIndex: 'text5',
},{
  title: '操作',
  dataIndex: 'text6',
}];
const data2=[{
  key: 1,
  text1: `总金额`,
  text2:`采购审批`,
  text3:`张三`,
  text4:`开启`,
  text5: <div>2017-07-03 15:00</div>,
  text6: <div><a href="#" style={{color:'#3597ce',marginRight:'5px'}}>编辑</a><a href="#" style={{color:'#3597ce',marginRight:'5px'}}>关闭</a><a href="#" style={{color:'#3597ce'}}>删除</a></div>,
},{
  key: 1,
  text1: `总金额`,
  text2:`采购审批`,
  text3:`张三`,
  text4:`开启`,
  text5: <div>2017-07-03 15:00</div>,
  text6: <div><a href="#" style={{color:'#3597ce',marginRight:'5px'}}>编辑</a><a href="#" style={{color:'#3597ce',marginRight:'5px'}}>关闭</a><a href="#" style={{color:'#3597ce'}}>删除</a></div>,
}];
/*审批管理*/

class  GroupManagementDetail extends Component{
  constructor(props){
    super(props);
    this.state={
      loading: false,
      visible: false,
    }
  }
  componentWillUnmount(){

  }
  handleChange=(value)=> {
    console.log(`selected ${value}`);
  }
  callback=(key)=> {
    console.log(key);
  }
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
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return (
      <div className={groupManagementDetail_body}>

        <div className="collection_goods_content" style={{width:'980px',float:'right'}}>
          {/*头部单行条*/}
          {/*<div className="used_nva_bar">
            <a href="#">我的商城 > </a>
            <a href="#">我的群组 > </a>
            <span>群信息</span></div>*/}

        <Form>
          <div className="collection_goods_table">
            <div className="group_information">
              <h2>群信息</h2>
              <ul>
                <li>群名称：销售一部</li>
                <li>群编号：2102226555</li>
                <li>群类型：企业</li>
                <li>群组：张三</li>
              </ul>

            </div>
            <Tabs onChange={this.callback} type="card">
              <TabPane tab={<div>成员管理</div>} key="1">
                <div className="groupManagement_tabBox">
                  <div className="tabBox_top">
                    <Button type="primary" style={{
                      width:'100px',
                      height:'30px',fontSize:'14px',
                      marginLeft:'10px',
                      backgroundColor:'#2eb6aa',
                      borderColor:'#2eb6aa'

                    }} onClick={this.showModal}>新增成员</Button>
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
                        <Table columns={columns} dataSource={data}  className="collection_table"  bordered pagination={false}/>
                      </TabPane>
                      <TabPane tab="成员记录" key="2" disabled>Content of Tab Pane 2</TabPane>
                    </Tabs>
                  </div>
                </div>
              </TabPane>

              <TabPane tab="审批管理" key="2">
                <div className="groupManagement_tabBox2">
                  <div className="tabBox_top">
                    <Button type="primary" style={{
                      width:'100px',
                      height:'30px',fontSize:'14px',
                      marginLeft:'10px',
                      backgroundColor:'#2eb6aa',
                      borderColor:'#2eb6aa'

                    }} onClick={this.showModal}>新增成员</Button>
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
                      <TabPane tab={<span style={{borderRight:'1px solid #666',padding:'2px 35px 2px 0px'}}>采购审批</span>} key="1" style={{marginRight:'0px'}}>
                        <Table columns={columns2} dataSource={data2}  className="collection_table"  bordered pagination={false}/>
                      </TabPane>
                      <TabPane tab="退货审批" key="2" disabled>Content of Tab Pane 2</TabPane>
                    </Tabs>
                  </div>
                </div>
              </TabPane>
            </Tabs>


          </div>
        </Form>
          {/*编辑审批流程弹窗*/}
          <Modal
            visible={visible}
            // title="新建组群"
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            className={group_modal2}
            footer={[
              <Button key="submit" type="primary" size="large" style={{width:'120px',height:'40px'}} onClick={this.handleOk}>保存</Button>,
              <Button key="back" size="large" onClick={this.handleCancel} style={{width:'120px',height:'40px',marginLeft:'60px'}}>关闭</Button>,
            ]}
          >
            <Form onSubmit={this.handleSubmit}>
              {/*编辑审批流程*/}
            <div className="modal_process">
                <h2>编辑审批流程</h2>

              <FormItem
                {...formItemLayout}
                label="审批流程名称："
                hasFeedback
              >
                {getFieldDecorator('select', {
                  rules: [
                    { message: 'Please select your country!' },
                  ],
                })(
                  <span className="ant-form-text">采购审批</span>
                )}
              </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="审批流程名称："
                  hasFeedback
                >
                  {getFieldDecorator('select', {
                    rules: [
                      { required: true, message: 'Please select your country!' },
                    ],
                  })(
                    <Input placeholder="买家采购审批" style={{height:'30px',width:'290px'}}/>
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="金额："
                >
                  {getFieldDecorator('switch', { valuePropName: 'checked' })(
                    <Switch checkedChildren="是" unCheckedChildren="否"/>
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="金额类型："
                  hasFeedback
                >
                  {getFieldDecorator('select', {
                    rules: [
                      {  message: 'Please select your country!' },
                    ],
                  })(
                    <Select placeholder="Please select a country" style={{height:'30px',width:'290px'}}>
                      <Option value="china">China</Option>
                      <Option value="use">U.S.A</Option>
                    </Select>
                  )}
                </FormItem>
            </div>
              {/*审批环节*/}
              <div className="modal_ApprovalLink">
                <h2><span>*</span>审批环节</h2>
                <FormItem
                  {...formItemLayout}
                  label="审批节点"
                  hasFeedback
                >
                  {getFieldDecorator('select', {
                    rules: [
                      { required: true, message: 'Please select your country!' },
                    ],
                  })(
                    <div><Input placeholder="撒大声地发" style={{height:'30px',width:'290px',marginRight:'10px'}}/>
                    <Checkbox
                    value={this.state.checkNick}
                    >合批<Icon type="plus" style={{ fontSize: '12px', color: '#3497ce',fontWeight:'bold',marginLeft:'3px' }} />
                    </Checkbox></div>
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="金额"
                  hasFeedback
                >
                  {getFieldDecorator('select', {
                    rules: [
                      {  message: 'Please select your country!' },
                    ],
                  })(
                    <Input placeholder="xxxxx" style={{height:'30px',width:'290px'}}/>
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="审批节点"
                  hasFeedback
                >
                  {getFieldDecorator('select', {
                    rules: [
                      { message: 'Please select your country!' },
                    ],
                  })(
                    <div><Input placeholder="撒大声地发" style={{height:'30px',width:'290px',marginRight:'10px'}}/>
                      <Checkbox
                        value={this.state.checkNick}
                      >合批<Icon type="minus" style={{ fontSize: '12px', color: '#3497ce',fontWeight:'bold',marginLeft:'3px' }} />
                      </Checkbox></div>
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="金额"
                  hasFeedback
                >
                  {getFieldDecorator('select', {
                    rules: [
                      {  message: 'Please select your country!' },
                    ],
                  })(
                    <Input placeholder="xxxx" style={{height:'30px',width:'290px'}}/>
                  )}
                </FormItem>
              </div>
            </Form>
          </Modal>
        </div>
      </div>
    );
  }
}

GroupManagementDetail.propTypes = {
  form: PropTypes.object,
  GroupManagementDetail: PropTypes.object,
  dispatch: PropTypes.func,
}
export default connect(({GroupManagementDetail})=>({GroupManagementDetail}),(dispatch,own)=>{return {dispatch,own}})(Form.create()(GroupManagementDetail));
