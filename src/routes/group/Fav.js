import React, { Component } from 'react'
import { BodyHeadImg } from '../../components/Advertising/Advertising'
import { Breadcrumb, Checkbox, Row, Col, Pagination, Input, Button, Form } from 'antd'
import { Link } from 'dva/router'
import { connect } from 'dva'
import { fav_list } from './Fav.less'
import Img from "../../components/Img/Img"
import Search from '../../components/Search/Search'
import Navigation from '../../components/Navigation/Navigation'
import FavListFloor from './FavListFloor'

const FormItem = Form.Item;

class Fav extends Component {
  state = {
    value: 0,
    checkAll: false
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
  render() {
    const { favListData, orderListTotal } = this.props.fav
    const { getFieldDecorator } = this.props.form
    let role = this.props.params.role
    return (
      <div>
        <Search></Search>
        <Navigation preson={true}>
          <div className={fav_list}>
            <BodyHeadImg headImg={{url:'/upload/img/lmadv/1508217294561.png',id:'234'}}/>
            <Breadcrumb separator=">" className='security_nav_bar'>
              <Breadcrumb.Item href="">我的账户</Breadcrumb.Item>
              <Breadcrumb.Item href="">我的</Breadcrumb.Item>
              <Breadcrumb.Item>群组收藏夹</Breadcrumb.Item>
            </Breadcrumb>
            <div className="filter_bar">
              <div className="clear">
                {role == 'admin' ? 
                  <div>
                    <span style={{backgroundColor: '#3a98cc'}} className="top-btn">导出收藏夹目录</span>
                    <span style={{backgroundColor: '#37b5aa', marginLeft: '20px'}} className="top-btn">批量商品上传</span>
                    <span style={{color: '#3599BB', float: 'right'}}>查看全部收藏产品></span>
                  </div>
                  : 
                  <div>
                    <span style={{backgroundColor: '#3a98cc'}} className="top-btn">群组收藏夹管理</span>
                    <span style={{color: '#3599BB', float: 'right'}}>我的收藏夹></span>
                  </div>
                }
                
              </div>
              <div>
                <p className="gap"><span>群组名称：上海大学</span><span>管理员：章三</span><span>管理员联系方式：1231231231</span></p>
              </div>
              <div>
                <Form onSubmit={this.handleSubmit} layout="inline">
                  <span style={{lineHeight: '32px'}}>产品查询：</span>
                  <FormItem labelCol={{ span: 24 }}>
                    {getFieldDecorator('username')(
                      <Input placeholder="商品编号/名称" />
                    )}
                  </FormItem>
                  <FormItem>
                    <Button type="primary" htmlType="submit" ghost>搜索</Button>
                  </FormItem>
                </Form>
              </div>
            </div>
            <div className="orderList_content">
              <Row className="orderList_content_head">
                <Col span={2}>
                <Checkbox
                  onChange={this.onCheckAllChange}
                  checked={this.state.checkAll}
                >
                  全选
                </Checkbox></Col>
                <Col span={8}>基本信息</Col>
                <Col span={4}>商品属性</Col>
                <Col span={5}>交易信息</Col>
                <Col span={5}>操作</Col>
              </Row>
            </div>
            {!!favListData && favListData.length > 0 ?
              <div>
                {favListData.map((list, index) => {
                  return (<FavListFloor data={list || []} key={index} isCheckAll={this.state.checkAll} isGivePrice={list.orderStateMemo == '已报价'}></FavListFloor>)
                })}
                
                <div className='gift_cart_settlement'>
                  <Checkbox
                    onChange={this.onCheckAllChange}
                    checked={this.state.checkAll}
                  >
                    全选
                  </Checkbox>
                  {role == 'admin' ? 
                    <a onClick={()=>this.showConfirmAll(selectedRowKeys)}>删除选中商品</a>
                  : <button onClick={()=>this.onSubmit(giftCart[0].total)}>加入购物车</button>}
                </div>
              </div>
              : <p style={{ textAlign: "center", margin: '10px' }}>无数据</p>
            }
          </div>
        </Navigation>
      </div>
    )
  }
}

export default connect(({ fav }) => ({ fav }), (dispatch) => { return { dispatch } })(Form.create()(Fav))
