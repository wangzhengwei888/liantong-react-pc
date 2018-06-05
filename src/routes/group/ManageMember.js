import React, { Component } from 'react'
import { BodyHeadImg } from '../../components/Advertising/Advertising'
import { Breadcrumb, Checkbox, Row, Col, Pagination, Input, Button, Form, Modal, Select, Switch } from 'antd'
import { Link } from 'dva/router'
import { connect } from 'dva'
import { manageMember } from './ManageMember.less'
import Img from "../../components/Img/Img"
import Search from '../../components/Search/Search'
import Navigation from '../../components/Navigation/Navigation'

const FormItem = Form.Item;

class ManageMember extends Component {
  state = {
    value: 0,
    checkAll: false,
		visible: false,
		isDependFinance: true,
		userModalVisible: false,
		editVisible: false
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  onCheckAllChange = (e) => {
    this.setState({
      checkAll: e.target.checked,
    });
	}
	handleChange = (value) => {
		console.log(`selected ${value}`);
	}
	switchChange = () => {
		this.setState({
			isDependFinance: !this.state.isDependFinance
		})
	}
	handleUserOk = () => {
		this.setState({
			
		})
	}
	handleUserCancel = () => {
		this.setState({
			userModalVisible: false
		})
	}

  render() {
    const { getFieldDecorator } = this.props.form
    let role = this.props.params.role
    return (
      <div>
        <Search></Search>
        <Navigation preson={true}>
          <div className={manageMember}>
            <BodyHeadImg headImg={{url:'/upload/img/lmadv/1508217294561.png',id:'234'}}/>
            <Breadcrumb separator=">" className='security_nav_bar'>
              <Breadcrumb.Item href="">我的账户</Breadcrumb.Item>
              <Breadcrumb.Item href="">我的群组</Breadcrumb.Item>
              <Breadcrumb.Item>群组成员管理</Breadcrumb.Item>
            </Breadcrumb>
            <div className="filter_bar">
              <div className="clear">
                <div>
                  <span style={{backgroundColor: '#37b5aa', marginLeft: '20px'}} className="top-btn" onClick={this.showModal}>创建子账户</span>
                  <Form onSubmit={this.handleSubmit} layout="inline" className="r">
                    <FormItem labelCol={{ span: 24 }}>
                      {getFieldDecorator('username')(
                        <Input placeholder="联系人名称" />
                      )}
                    </FormItem>
                    <FormItem>
                      <Button type="primary" htmlType="submit" ghost>搜索</Button>
                    </FormItem>
                  </Form>
                </div>
              </div>
            </div>
            <div className="orderList_content">
              <table className="table">
                <tbody>
                  <tr>
                    <th>联系人名称</th>
                    <th>用户名</th>
                    <th>联系电话</th>
                    <th>联系邮箱</th>
                    <th>用户权限</th>
                    <th>最近登录时间</th>
                    <th>新建时间</th>
                    <th>操作</th>
                  </tr>
                  <tr>
                    <td>联系人1</td>
                    <td>张三</td>
                    <td>13322221111</td>
                    <td>13322221111@qq.com</td>
                    <td>采购权限</td>
                    <td>2017-11-22 23:32:33</td>
                    <td>2017-11-22 23:32:33</td>
                    <td><span style={{color: '#3a98cc',cursor: 'pointer'}}onClick={this.showEditModal}>编辑</span><span style={{color: '#fc1320', marginLeft: '5px',cursor: 'pointer'}}>禁用</span></td>
                  </tr>
                  <tr>
                    <td>联系人2</td>
                    <td>张三</td>
                    <td>13322221111</td>
                    <td>13322221111@qq.com</td>
                    <td>审批权限／采购权限</td>
                    <td>2017-11-22 23:32:33</td>
                    <td>2017-11-22 23:32:33</td>
                    <td><span style={{color: '#3a98cc',cursor: 'pointer'}}onClick={this.showEditModal}>编辑</span><span style={{color: '#fc1320', marginLeft: '5px',cursor: 'pointer'}}>j禁用</span></td>
                  </tr>
                  <tr style={{color: '#c5c5c5'}}>
                    <td>联系人3</td>
                    <td>张三</td>
                    <td>13322221111</td>
                    <td>13322221111@qq.com</td>
                    <td>采购权限</td>
                    <td>2017-11-22 23:32:33</td>
                    <td>2017-11-22 23:32:33</td>
                    <td><span style={{color: '#3bb6ac', marginLeft: '5px',cursor: 'pointer'}}>启用</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
						<Modal
							visible={this.state.visible}
							closable={false}
							width={640}
							okText="下一步"
							onOk={this.handleOk}
          		onCancel={this.handleCancel}
						>
							<div style={{color: '#449dce', fontSize: '16px', paddingBottom: '20px', borderBottom: '1px solid #e4e4e4', marginBottom: '20px'}}>
								新建审批流程
							</div>
							<Row style={{lineHeight: '50px'}}>
								<Col span={6} style={{textAlign: 'right'}}>审批流程类型：</Col>
								<Col span={18}>
									<Select defaultValue="default" style={{ width: 270 }}>
										<Option value="default">默认</Option>
										<Option value="lucy">Lucy</Option>
										<Option value="Yiminghe">yiminghe</Option>
									</Select>
								</Col>
							</Row>
							<Row style={{lineHeight: '50px'}}>
								<Col span={6} style={{textAlign: 'right'}}><b style={{color: 'red'}}>*</b>审批流程名称：</Col>
								<Col span={18}>
									<Input style={{ width: 270 }}></Input>
								</Col>
							</Row>
							<Row style={{lineHeight: '50px'}}>
								<Col span={6} style={{textAlign: 'right'}}>金额：</Col>
								<Col span={18}>
									<Switch checkedChildren="是" unCheckedChildren="否" defaultChecked onChange={this.switchChange} />
									<span style={{marginLeft: '15px', display: 'inline-block'}}>（可设置审批人的审批金额权限）</span>
								</Col>
							</Row>
							<div style={{color: '#449dce', fontSize: '16px', paddingBottom: '20px', borderBottom: '1px solid #e4e4e4', marginBottom: '20px', marginTop: '30px'}}>
								<b style={{color: 'red'}}>*</b>审批环节
							</div>
							<Row style={{lineHeight: '50px'}}>
								<Col span={6} style={{textAlign: 'right'}}><b style={{color: 'red'}}>*</b>审批节点1：</Col>
								<Col span={18}>
									<Input style={{ width: 270, display:'inline-block', marginRight: '10px' }}></Input> 
									<Checkbox>合批<b style={{color: '#3c99cc'}}>+</b></Checkbox>
								</Col>
							</Row>
							{this.state.isDependFinance ? <Row style={{lineHeight: '50px'}}>
								<Col span={6} style={{textAlign: 'right'}}><b style={{color: 'red'}}>*</b>金额：</Col>
								<Col span={18}>
									<Input style={{ width: 270 }}></Input>
								</Col>
							</Row> : ''}
							{/* <div style={{textAlign: 'center', marginTop: '50px'}}>
								<Button style={{color: '#fff', borderRadius: '4px', textAlign: 'center', padding: '6px 30px', background: '#3a98cc'}}>下一步</Button>
								<Button style={{color: '#3a98cc', borderRadius: '4px', textAlign: 'center', padding: '6px 30px', border: '1px solid #3a98cc', marginLeft: '40px'}} >关闭</Button>
							</div> */}
						</Modal>
						<Modal
							visible={this.state.userModalVisible}
							closable={false}
							width={640}
							okText="完成"
							onOk={this.handleUserOk}
          		onCancel={this.handleUserCancel}
						>
							<div style={{color: '#449dce', fontSize: '16px', paddingBottom: '20px', borderBottom: '1px solid #e4e4e4', marginBottom: '20px'}}>
								设置使用人范围
							</div>
							<div>
								<Input style={{ width: 270 }}></Input><Button style={{color: '#fff', borderRadius: '4px', textAlign: 'center', padding: '6px 30px', background: '#3a98cc', marginLeft: '10px'}}>搜索</Button>
								<span style={{float: 'right'}}>
									<Checkbox>全选</Checkbox>
								</span>
							</div>
							<div style={{marginTop: '20px', lineHeight: '30px'}}>
								<Checkbox style={{width: '20%', marginLeft: 0}}>张三</Checkbox>
								<Checkbox style={{width: '20%', marginLeft: 0}}>张三</Checkbox>
								<Checkbox style={{width: '20%', marginLeft: 0}}>张三</Checkbox>
								<Checkbox style={{width: '20%', marginLeft: 0}}>张三</Checkbox>
								<Checkbox style={{width: '20%', marginLeft: 0}}>张三</Checkbox>
								<Checkbox style={{width: '20%', marginLeft: 0}}>张三</Checkbox>
								<Checkbox style={{width: '20%', marginLeft: 0}}>张三</Checkbox>
								<Checkbox style={{width: '20%', marginLeft: 0}}>张三</Checkbox>
								<Checkbox style={{width: '20%', marginLeft: 0}}>张三</Checkbox>
								<Checkbox style={{width: '20%', marginLeft: 0}}>张三</Checkbox>
								<Checkbox style={{width: '20%', marginLeft: 0}}>张三</Checkbox>
								<Checkbox style={{width: '20%', marginLeft: 0}}>张三</Checkbox>
								<Checkbox style={{width: '20%', marginLeft: 0}}>张三</Checkbox>
							</div>
						</Modal>

						<Modal
							visible={this.state.editVisible}
							closable={false}
							width={640}
							okText="下一步"
							onOk={this.hideEditModal}
          		onCancel={this.hideEditModal}
						>
							<div style={{color: '#449dce', fontSize: '16px', paddingBottom: '20px', borderBottom: '1px solid #e4e4e4', marginBottom: '20px'}}>
								编辑审批流程
							</div>
							<Row style={{lineHeight: '50px'}}>
								<Col span={6} style={{textAlign: 'right'}}>审批流程类型：</Col>
								<Col span={18}>
									<Select defaultValue="default" style={{ width: 270 }}>
										<Option value="default">默认</Option>
										<Option value="lucy">Lucy</Option>
										<Option value="Yiminghe">yiminghe</Option>
									</Select>
								</Col>
							</Row>
							<Row style={{lineHeight: '50px'}}>
								<Col span={6} style={{textAlign: 'right'}}><b style={{color: 'red'}}>*</b>审批流程名称：</Col>
								<Col span={18}>
									<Input style={{ width: 270 }}></Input>
								</Col>
							</Row>
							<Row style={{lineHeight: '50px'}}>
								<Col span={6} style={{textAlign: 'right'}}>金额：</Col>
								<Col span={18}>
									<Switch checkedChildren="是" unCheckedChildren="否" defaultChecked onChange={this.switchChange} />
									<span style={{marginLeft: '15px', display: 'inline-block'}}>（可设置审批人的审批金额权限）</span>
								</Col>
							</Row>
							<div style={{color: '#449dce', fontSize: '16px', paddingBottom: '20px', borderBottom: '1px solid #e4e4e4', marginBottom: '20px', marginTop: '30px'}}>
								<b style={{color: 'red'}}>*</b>审批环节
							</div>
							<Row style={{lineHeight: '50px'}}>
								<Col span={6} style={{textAlign: 'right'}}><b style={{color: 'red'}}>*</b>审批节点1：</Col>
								<Col span={18}>
									<Input style={{ width: 140, display:'inline-block', marginRight: '10px' }} value={'张三'}></Input> 
									<Checkbox>合批<b style={{color: '#3c99cc'}}>+</b></Checkbox>
								</Col>
							</Row>
							{this.state.isDependFinance ? <Row style={{lineHeight: '50px'}}>
								<Col span={6} style={{textAlign: 'right'}}><b style={{color: 'red'}}>*</b>金额：</Col>
								<Col span={18}>
									<Input value={1000} style={{ width: 140 }}></Input>
								</Col>
							</Row> : ''}
							{/* <div style={{textAlign: 'center', marginTop: '50px'}}>
								<Button style={{color: '#fff', borderRadius: '4px', textAlign: 'center', padding: '6px 30px', background: '#3a98cc'}}>下一步</Button>
								<Button style={{color: '#3a98cc', borderRadius: '4px', textAlign: 'center', padding: '6px 30px', border: '1px solid #3a98cc', marginLeft: '40px'}} >关闭</Button>
							</div> */}
						</Modal>
          </div>
        </Navigation>
      </div>
    )
  }
}

export default connect(({ manageMember }) => ({ manageMember }), (dispatch) => { return { dispatch } })(Form.create()(ManageMember))
