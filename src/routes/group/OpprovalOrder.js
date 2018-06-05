import React, { Component } from 'react'
import { BodyHeadImg } from '../../components/Advertising/Advertising'
import { Breadcrumb, Checkbox, Row, Col, Pagination, Input, Button, Form, Modal, Select, Switch, DatePicker } from 'antd'
import { Link } from 'dva/router'
import { connect } from 'dva'
import { opproval } from './Opproval.less'
import Img from "../../components/Img/Img"
import Search from '../../components/Search/Search'
import Navigation from '../../components/Navigation/Navigation'

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { span: 8 }
};

class OpprovalOrder extends Component {
  state = {
    startValue: null,
    endValue: null,
    endOpen: false,
    data: [],
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
    const { startValue, endValue, endOpen } = this.state;
    return (
      <div>
        <Search></Search>
        <Navigation preson={true}>
          <div className={opproval}>
            <BodyHeadImg headImg={{url:'/upload/img/lmadv/1508217294561.png',id:'234'}}/>
            <Breadcrumb separator=">" className='security_nav_bar'>
              <Breadcrumb.Item href="">我的账户</Breadcrumb.Item>
              <Breadcrumb.Item href="">我的群组</Breadcrumb.Item>
              <Breadcrumb.Item>群组审批订单</Breadcrumb.Item>
            </Breadcrumb>
            <div className="filter_bar">
              <div className="clear">
                <div>
                <Form onSubmit={this.handleSubmit} layout="inline">
                  <Row>
                    <Col span={2} style={{ marginRight: '10px'}}>
                      {getFieldDecorator('select',{initialValue:'orderTime'})(
                        <Select>
                          <Option value="orderTime">下单时间</Option>
                          <Option value="opproval">审批时间</Option>
                        </Select>
                      )}
                    </Col>
                    <Col span={4}>
                      <FormItem
                        {...formItemLayout}>
                        {getFieldDecorator('startValue',{setFieldsValue:startValue})(
                          <DatePicker
                            disabledDate={this.disabledStartDate}
                            showTime
                            format="YYYY-MM-DD"
                            placeholder="开始日期"
                            onChange={this.onStartChange}
                            onOpenChange={this.handleStartOpenChange}
                          />
                        )}
                      </FormItem>
                    </Col>
                    <Col span={1} style={{width:'10px',paddingTop:'8px',margin: '0 5px'}}>-</Col>
                    <Col span={4}>
                      <FormItem>
                        
                        {getFieldDecorator('endValue',{setFieldsValue:endValue})(
                          <DatePicker
                            disabledDate={this.disabledEndDate}
                            showTime
                            format="YYYY-MM-DD"
                            placeholder="结束日期"
                            onChange={this.onEndChange}
                            open={endOpen}
                            onOpenChange={this.handleEndOpenChange}
                          />
                        )}
                      </FormItem>
                    </Col>
                  
                    <Col span={5} style={{marginLeft:'30px'}}>
                      <FormItem label="审批状态">
                        {getFieldDecorator('select',{initialValue:'order'})(
                          <Select>
                            <Option value="order">全部</Option>
                            <Option value="goods">已审批</Option>
                            <Option value="name">未审批</Option>
                          </Select>
                        )}
                      </FormItem>
                    </Col>
                    <div className="r">
                      <span className="btn" style={{ background: '#fd772c'}}>审批提醒设置</span>
                    </div>
                  </Row>
                  
                  <Row style={{marginTop: '10px'}}>
                    <Col span={8}>
                      <FormItem label="订单金额：">
                        <Input style={{width: '100px'}}></Input><span style={{dispaly: 'block', margin: '0 10px'}}>-</span>
                        <Input style={{width: '100px'}}></Input>
                      </FormItem>
                    </Col>
        
                    
                    <Col span={5} style={{marginLeft:'-8px'}}>
                      <FormItem>
                        {getFieldDecorator('username')(
                          <Input style={{width: '170px'}} placeholder="订单号/发起人/审批流名称" />
                        )}
                      </FormItem>
                    </Col>
                    <Col span={2}>
                      <FormItem {...formItemLayout}>
                        <Button type="primary" htmlType="submit" ghost>搜索</Button>
                      </FormItem>
                    </Col>
                    <div className="r">
                      <span className="btn" style={{ background: '#3a98cc'}}>导出订单明细</span>
                    </div>
                  </Row>
                </Form>
                </div>
              </div>
            </div>
            <div className="orderList_content">
              <table className="table">
                <tbody>
                  <tr>
                    <th>订单号</th>
                    <th>下单时间</th>
                    <th>发起人</th>
                    <th>订单金额</th>
                    <th>审批状态</th>
                    <th>审批时间</th>
                    <th>审批意见</th>
                    <th>操作</th>
                  </tr>
                  <tr>
                    <td>W23232323</td>
                    <td>2017-11-22</td>
                    <td>张三</td>
                    <td>10000</td>
                    <td>未审批</td>
                    <td></td>
                    <td></td>
                    <td><span style={{color: '#3bb6ac',cursor: 'pointer'}}onClick={this.showEditModal}>审批</span></td>
                  </tr>
                  <tr>
                    <td>W23235511</td>
                    <td>2017-11-22</td>
                    <td>张三</td>
                    <td>232221</td>
                    <td>审批通过</td>
                    <td>2017-11-22 23:32:33</td>
                    <td></td>
                    <td><span style={{color: '#3a98cc',cursor: 'pointer'}}onClick={this.showEditModal}>点击查看</span></td>
                  </tr>
                  <tr>
                    <td>W23235511</td>
                    <td>2017-11-22</td>
                    <td>张三</td>
                    <td>232221</td>
                    <td>审批不通过</td>
                    <td>2017-11-22 23:32:33</td>
                    <td>金额太大需要招标</td>
                    <td><span style={{color: '#3a98cc',cursor: 'pointer'}}onClick={this.showEditModal}>点击查看</span></td>
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

export default connect(({ opprovalOrder }) => ({ opprovalOrder }), (dispatch) => { return { dispatch } })(Form.create()(OpprovalOrder))
