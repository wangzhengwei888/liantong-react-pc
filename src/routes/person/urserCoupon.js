/**
 * Created by 10400 on 2017/8/9.
 * 个人中心优惠券
 */
import React , { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Form, Tabs, Table, Button,Menu,Dropdown ,Tree ,Checkbox } from 'antd';
import { urserCoupon_body } from './assetCenter.less'
const TabPane = Tabs.TabPane;

class  Collection_goods extends Component{
  constructor(props){
    super(props);
    this.state={
      formLayout: 'inline',

    }
  }
  componentDidMount(){

  }

  render (){
    return (
      <div className={urserCoupon_body}>
        <div className="collection_goods_content" style={{width:'980px',float:'right'}}>
          {/*头部单行条*/}
          <div className="used_nva_bar">
            <a href="#">我的商城 > </a>
            <a href="#">资产中心 > </a>
            <span>优惠券</span></div>
        <Form>
          <div className="collection_goods_table">
            <Tabs defaultActiveKey="1" size="small">
              <TabPane tab="未使用" key="1">
                <ul className="TabPane_list">
                  <li>
                    <h2><span  style={{fontSize:'16px'}}>￥</span>20</h2>
                    <p>【消费满199元可用】</p>
                    <p>会员限制：所有会员</p>
                    <p>商品限制：全部商品</p>
                    <p>平台限制：二丫</p>
                    <p><span style={{fontSize:'16px'}}>2017-03-07</span> ~ <span style={{fontSize:'16px'}}>2017-03-07</span></p>
                    <p style={{paddingTop:'15px'}}>
                      <Button ghost style={{width:'118px',
                      height:'30px',
                      borderRadius:'20px',
                    }}>立即使用</Button></p>
                  </li>
                  <li>
                    <h2><span  style={{fontSize:'16px'}}>￥</span>20</h2>
                    <p>【消费满199元可用】</p>
                    <p>会员限制：所有会员</p>
                    <p>商品限制：全部商品</p>
                    <p>平台限制：二丫</p>
                    <p><span style={{fontSize:'16px'}}>2017-03-07</span> ~ <span style={{fontSize:'16px'}}>2017-03-07</span></p>
                    <p style={{paddingTop:'15px'}}>
                      <Button ghost style={{width:'118px',
                        height:'30px',
                        borderRadius:'20px',
                      }}>立即使用</Button></p>
                  </li>
                  <li>
                    <h2><span  style={{fontSize:'16px'}}>￥</span>20</h2>
                    <p>【消费满199元可用】</p>
                    <p>会员限制：所有会员</p>
                    <p>商品限制：全部商品</p>
                    <p>平台限制：二丫</p>
                    <p><span style={{fontSize:'16px'}}>2017-03-07</span> ~ <span style={{fontSize:'16px'}}>2017-03-07</span></p>
                    <p style={{paddingTop:'15px'}}>
                      <Button ghost style={{width:'118px',
                        height:'30px',
                        borderRadius:'20px',
                      }}>立即使用</Button></p>
                  </li>
                  <li>
                    <h2><span  style={{fontSize:'16px'}}>￥</span>20</h2>
                    <p>【消费满199元可用】</p>
                    <p>会员限制：所有会员</p>
                    <p>商品限制：全部商品</p>
                    <p>平台限制：二丫</p>
                    <p><span style={{fontSize:'16px'}}>2017-03-07</span> ~ <span style={{fontSize:'16px'}}>2017-03-07</span></p>
                    <p style={{paddingTop:'15px'}}>
                      <Button ghost style={{width:'118px',
                        height:'30px',
                        borderRadius:'20px',
                      }}>立即使用</Button></p>
                  </li>
                  <li>
                    <h2><span  style={{fontSize:'16px'}}>￥</span>20</h2>
                    <p>【消费满199元可用】</p>
                    <p>会员限制：所有会员</p>
                    <p>商品限制：全部商品</p>
                    <p>平台限制：二丫</p>
                    <p><span style={{fontSize:'16px'}}>2017-03-07</span> ~ <span style={{fontSize:'16px'}}>2017-03-07</span></p>
                    <p style={{paddingTop:'15px'}}>
                      <Button ghost style={{width:'118px',
                        height:'30px',
                        borderRadius:'20px',
                      }}>立即使用</Button></p>
                  </li>
                </ul>

              </TabPane>
              <TabPane tab="已过期" key="2">
                <ul className="TabPane_list">
                  <li>
                    <h2><span  style={{fontSize:'16px'}}>￥</span>20</h2>
                    <p>【消费满199元可用】</p>
                    <p>会员限制：所有会员</p>
                    <p>商品限制：全部商品</p>
                    <p>平台限制：二丫</p>
                    <p><span style={{fontSize:'16px'}}>2017-03-07</span> ~ <span style={{fontSize:'16px'}}>2017-03-07</span></p>
                    <p style={{paddingTop:'15px'}}>
                      <Button ghost style={{width:'118px',
                        height:'30px',
                        borderRadius:'20px',
                      }}>立即使用</Button></p>
                  </li>
                </ul>
              </TabPane>
              <TabPane tab="已使用" key="3">
                <ul className="TabPane_list">
                  <li>
                    <h2><span  style={{fontSize:'16px'}}>￥</span>20</h2>
                    <p>【消费满199元可用】</p>
                    <p>会员限制：所有会员</p>
                    <p>商品限制：全部商品</p>
                    <p>平台限制：二丫</p>
                    <p><span style={{fontSize:'16px'}}>2017-03-07</span> ~ <span style={{fontSize:'16px'}}>2017-03-07</span></p>
                    <p style={{paddingTop:'15px'}}>
                      <Button ghost style={{width:'118px',
                        height:'30px',
                        borderRadius:'20px',
                      }}>立即使用</Button></p>
                  </li>
                </ul>
              </TabPane>
            </Tabs>
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
