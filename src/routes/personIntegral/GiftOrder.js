import React, { Component } from 'react'
import { BodyHeadImg } from '../../components/Advertising/Advertising'
import { Breadcrumb, Radio, Table } from 'antd'
import { Link } from 'dva/router'
import { connect } from 'dva'
import { gift_order } from './GiftOrder.less'
import Img from "../../components/Img/Img";
import Search from '../../components/Search/Search';
import Navigation from '../../components/Navigation/Navigation'

const RadioGroup = Radio.Group

const renderContent = (value, row, index) => {
  const obj = {
    children: value,
    props: {},
  };
  if (index === 4) {
    obj.props.colSpan = 0;
  }
  return obj;
}
const columns = [{
  title: '礼品信息',
  dataIndex: 'giftInfo',
  className: 'column-giftInfo',
  render: (text,record) => <div className='giftInfo'>
    <Img src={text.url}/>
    <div>
      <b>{text.title}</b>
      <p>{text.introduce}</p>
    </div>
  </div>
}, {
  title: '兑换数量',
  dataIndex: 'num'
}, {
  title: '积分单价',
  dataIndex: 'price',
  render: (text) => <span>{text}分</span>
}, {
  title: '积分小计',
  dataIndex: 'total',
  render: (text) => <span>{text}分</span>
}];

const data = [{
  key: '1',
  giftInfo: {title:'金士顿储存卡',url:'/upload/img/store/0/1504690574139.jpg',introduce:'金士顿储存卡金士顿储存卡金士顿储存卡'},
  num: 32,
  price: 1,
  total: 32
}]

class GiftOrder extends Component{
  state = {
    value: 222,
    remarks: ''
  }
  onChange = (e) => {
    this.setState({
      value: e.target.value,
    })
  }
  onSubmit = () => {
    let data = {
      remarks: this.state.remarks
    }
    this.props.dispatch({ type: 'integral/placeGiftOrderEFF', data})
  }
  deleteInfo = (id) => {
    this.props.dispatch({ type: 'integral/delReceiptInfoEFF', id})
  }
  render () {
    return (
      <div>
       <Search></Search>
       <Navigation preson={true}>
         <div className={gift_order}>
           <div className="my_account_dynamic_Topimg"></div>
           <Breadcrumb separator=">" className='security_nav_bar'>
             <Breadcrumb.Item href="">我的账户</Breadcrumb.Item>
             <Breadcrumb.Item href="">我的积分</Breadcrumb.Item>
             <Breadcrumb.Item href="">积分商城</Breadcrumb.Item>
             <Breadcrumb.Item>提交礼品订单</Breadcrumb.Item>
           </Breadcrumb>
           <div className="gift_order_body">
             <p className='available_integral'>我的可用积分： <span>3000</span> 分</p>
             <div className="receipt_info">
               <div className='receipt_info_title'>
                 <b>收货信息：</b>
                 <span>添加收货信息</span>
               </div>
               <ul className='radio-group'>
                 <li>
                   <input type="radio" name='receipt' defaultChecked={this.state.value === 111 ? true : false}/>
                   <p>
                     <span className='receipt_name'>小红</span>
                     <span className='receipt_address'>北京，北京市，朝阳区&#12288;大柳树路12号</span>
                     <span className='receipt_phone'>13323333333</span>
                     <span className='receipt_telephone'>021-876545679878</span>
                     <span className='postal_code'>20003</span>
                   </p>
                   <div>
                     <span>编辑</span>
                     <span onClick={this.deleteInfo('id')}>删除</span>
                   </div>
                 </li>
                 <li>
                   <input type="radio" name='receipt' defaultChecked={this.state.value === 222 ? true : false}/>
                   <p>
                     <span className='receipt_name'>小红</span>
                     <span className='receipt_address'>北京，北京市，朝阳区&#12288;福州路123号</span>
                     <span className='receipt_phone'>13323333333</span>
                     <span className='receipt_telephone'>021-876545679878</span>
                     <span className='postal_code'>20003</span>
                   </p>
                   <div>
                     <span>编辑</span>
                     <span>删除</span>
                   </div>
                 </li>
               </ul>
             </div>
             <div className="gift_list">
               <Table columns={columns} dataSource={data} bordered pagination={false} />
               <p>共 <span>1</span> 件礼品，积分总价：<span>3000</span>分</p>
             </div>
             <div className="remarks">
               <label>备注： </label>
               <input type="text" placeholder='若您对订单、发票、商品等有个性化要求，请在此写明' value={this.state.remarks} onChange={(e)=>this.setState({remarks:e.target.value})}/>
             </div>
             <div className="operation">
               <Link to='/personIntegral/giftShoppingCart' className='return_cart'>返回购物车</Link>
               <button className='place_order' onClick={this.onSubmit}>提交订单</button>
             </div>
           </div>
         </div>
       </Navigation>
      </div>
    )
  }
}

export default connect(({integral})=>({integral}),(dispatch)=>{return {dispatch}})(GiftOrder)
