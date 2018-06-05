import React from 'react';
import BannerAnim from 'rc-banner-anim';
import TweenOne, {TweenOneGroup} from 'rc-tween-one';
import LoginBtn from '../../../components/loginBtn/loginBtn'
import {activity_select} from './activitySelect.less'
import {IMAGE_DOMAIN} from '../../../utils/common';
import {
 Form,
 Radio,
} from 'antd'
import {connect} from 'dva';
import {routerRedux} from 'dva/router';

const RadioGroup = Radio.Group;
const FormItem = Form.Item;


class ActivitySelect extends React.Component {
 constructor() {
  super(...arguments);
  // this.imgArray = [
  //   'http://testbbcimage.leimingtech.com/upload/img/store/0/1489673013316.jpg_400x400.jpg',
  //   'http://testbbcimage.leimingtech.com/upload/img/store/0/1489673013416.jpg_400x400.jpg',
  // ];
  this.state = {
   value: undefined,
   val:'',
   isShow: 0,
   value1:2
  };
 }

 isShow = (e) => {
  if (this.state.isShow == 0) {
   this.setState({
    isShow: 1
   })
  } else {
   this.setState({
    isShow: 0
   })
  }
 }

 onChange = (e) => {
  const data = this.props.data;
  let onvalue = data.activityRuleList.filter((i)=>{
   return i.id == e.target.value
  })
  this.setState({
   value: onvalue[0].id,
   text:onvalue[0].description,
  });
  this.props.addItemId(e.target.value)
 }





 render() {
  const data = this.props.data;
  const { getFieldDecorator } = this.props.form;
  if(data){
   if(!data.activityMoney){
    data.activityMoney = 0;
   }
   // console.log(data.activityMoney)
   let reverseData = data.activityRuleList;
   reverseData.reverse();
   let maxAct = reverseData.find((i)=>{
    return   data.activityMoney >= i.limitWhere;
   })
   reverseData.reverse();
   let act = reverseData.filter((i)=>{
    return   data.activityMoney >= i.limitWhere;
   })
   let nowAct = reverseData.find((v) => {
    return   data.activityMoney < v.limitWhere;
   })
   let actObj = reverseData.filter((i)=>{
    return   this.state.value == i.id;
   })
   return (
    <div className={activity_select}>
     <Form>
      {
       act.length > 0
        ? <div className='head_left'>已满足满额赠礼品活动：<span>{this.state.text || maxAct.description}</span></div>
        : <div className='head_left'>参加满足满额赠礼品活动：<span>{this.state.text || nowAct.description},还差</span>{parseFloat(nowAct.limitWhere - data.activityMoney).toFixed(2)}元</div>
      }
      <div className='head_right'>
      <span className="down_act" onClick={(e) => {this.isShow(e)}}>查看详情{this.state.isShow == 0 ? '⬇' : '⬆'}</span>
       <div className={this.state.isShow == 0 ? 'select_box_none' : 'select_box_block'}>
        <div>购买指定商品满额可获赠精美礼品：</div>
          <FormItem
           style={{ marginBottom:"0px"}}
          >
            <RadioGroup value={
             actObj.length > 0 && maxAct != undefined ?
              (actObj[0].limitWhere > maxAct.limitWhere ? maxAct.id : this.state.value)
              : maxAct != undefined ? maxAct.id : null
            }
            onChange={this.onChange}>
             {
              data.activityRuleList.map((i, v) => {
               return <Radio className='act_radio' key={v} disabled={data.activityMoney < i.limitWhere } value={i.id}>{i.description}</Radio>
              })
             }
            </RadioGroup>
          </FormItem>
        {/*<span  className='select_up' onClick={(e)=>{this.isShow(e)}}>收起</span>*/}
       </div>
      </div>
     </Form>
    </div>
   );
  }else {
   return null
  }
 }
}

export default (Form.create()(ActivitySelect))
// export default connect(({ActivitySelect})=>({ActivitySelect}),(dispatch,own)=>{return {dispatch,own}})(ActivitySelect);





