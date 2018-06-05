import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux, Link} from 'dva/router';
import LoginBtn from '../../components/loginBtn/loginBtn'
import Stepper from '../../components/Stepper/Stepper'
import {Row, Col, Menu, Dropdown, Icon, Breadcrumb, Input, Button, Pagination, Modal, message} from 'antd';
import Img from '../../components/Img/Img';
import {isLogin} from '../../utils/request';

class ConsultListFloor extends Component {
 constructor(props) {
  super(props)
  this.state = {
   data: props.data,
  }

 }


 // 删除商品
 delGoods = (goodsId) => {
  Modal.confirm({
   title: '提示',
   content: '确定删除吗',
   okText: '确定',
   cancelText: '取消',
   onOk: () => {
    this.props.dispatch({type: 'consultList/deleteEnquiryGoodsEFF', goodsId: goodsId});
   },
   maskClosable: true
  });
 }


 /*改变询价商品数量*/
 onChangeNum = (goodsId, num) => {
  let value = {
   goodsId: goodsId,
   buyNum: num
  }
  this.props.dispatch({type: 'consultList/updateEnquiryGoodsNumEFF', val: value})
 }


 render() {
  const data = this.props.data;
  console.log(data)
  const {init} = this.props.consultList;

  return (
   <div>
    {

     !!data && data.length > 0 ?
      data.map((goods, index) => {
       return (
        <table key={index} className="border_bottom">
         <tbody>
         <tr>
          <td style={{width: '40%'}}>
           <div className="goods_div1">
            <Img style={{width: '140px', height: '140px', margin: '2px 5px 2px 0'}} src={goods.goodsImage}/>
            <div style={{margin: '18px 0 18px 15px', textAlign: 'left'}}>
             <p
              style={{fontSize: '16px', color: '#333', lineHeight: '22px', marginBottom: '16px'}}
             >
              <Link style={{fontSize: '16px', color: '#333', lineHeight: '22px'}}
                    to={`/goodsDetail/${goods.goodsId}`}> {goods.goodsName}</Link>
             </p>

             <p>品牌/原厂货号：{goods.brandName}/{goods.goodsSerial}</p>
             {(goods.goodsErpCode) ? <p>国药编码：{goods.goodsErpCode}</p> : null}
             {(goods.specName) ? <p>规格：{goods.specName}</p> : null}
             {(goods.goodsSpec) ? <p>包装：{goods.goodsSpec}</p> : null}
             {(goods.storageCondition && goods.shippingCondition) ?
              <p>储存/运输条件：<span>{goods.storageCondition}/{goods.shippingCondition}</span></p> :
              (goods.storageCondition) ? <p>储存条件：<span>{goods.storageCondition}</span></p> :
               (goods.shippingCondition) ? <p>运输条件：<span>{goods.shippingCondition}</span></p> : null
             }


            </div>
           </div>
          </td>
          <td style={{width: '30%',verticalAlign:'top'}}>
           {goods.isReagent == '1' ?
            <div style={{padding: '0 10px', textAlign: 'left',marginTop:"64px"}}>
             {(goods.casNo) ? <p>CAS号：{goods.casNo}</p> : null}
             {(goods.dangerousNature) ?
              <p>危险性质:<span dangerouslySetInnerHTML={{__html: goods.dangerousNature}}></span></p> : null}
             {(goods.controlInfo) ?
              <p>管制信息：<span style={{color: 'red'}} dangerouslySetInnerHTML={{__html: goods.controlInfo}}></span>
              </p> : null}
            </div>
            :
            goods.isReagent == '0' && goods.goodsDescription ?
             <p className='describe'>描述：<span dangerouslySetInnerHTML={{__html: goods.goodsDescription.length > 100 ? goods.goodsDescription.substr(0,100) + "..." : goods.goodsDescription}}></span>
             </p> : null
           }
          </td>
          <td>
           <div style={{padding: '0 10px', textAlign: 'left'}}>
            <div style={{textAlign: 'center', marginBottom: '10px'}}>
             询价数量:
             <Stepper nowNum={goods.goodsNowStorage}
                      styleCss={{display: 'inline-block', marginLeft: '10px'}}
                      key={goods.goodsId + init}
                      btnClassName='btnClass'
                      inputClassName='inputClass'
                      min={1}
                      step={1}
                      max={1000}
                      num={goods.buyNum}
                      onUpdate={(val) => {
                       this.onChangeNum(goods.goodsId, val)
                      }}
                      disabled={false}/>
            </div>
            <Button style={{
             background: '#3497ce',
             width: '60px',
             padding: '5px',
             color: '#fff',
             textAlign: 'center',
             marginLeft: '100px'
            }} onClick={() => {
             this.delGoods(goods.goodsId)
            }}>
             删除</Button>

           </div>
          </td>
         </tr>
         </tbody>
        </table>
       )
      })

      : null
    }
   </div>
  )
 }
}

export default connect(({consultList}) => ({consultList}), (dispatch, own) => {
 return {dispatch, own}
})(ConsultListFloor);
