import React, { Component } from 'react'
import { connect } from 'dva'
import { Link } from 'dva/router'
// import {advanced_search_form_row} from './Product.less'
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete,Slider ,Radio,message } from 'antd';
import {activity_details,activity_details_title,activity_details_from} from './ActivityDetails.less';
import Img from "../../components/Img/Img"
import Search from '../../components/Search/Search'
import Navigation from '../../components/Navigation/Navigation'
import ActivityDetailsForm from './ActivityDetailsForm'
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};



class ActivityDetails extends React.Component {
  handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log( values);
      // this.props.dispatch({ type: 'product/accurateSearchEFF', payload:values })
    });
  }
  render() {
    
    return (
      <div>
     
          <div className={activity_details}>
            <div className={activity_details_title}>
              <p>USP User Forum</p>
              <p>USP用户论坛111</p>
              <p>November 14,2017,Shanghai,China</p>
              <p>中国上海2017年11月14日</p>
              <p style={{fontSize:'16px',color:'#3497ce',marginBottom:'20px'}}>Registration From 报名表</p>    
            </div>
            <div className={activity_details_from}>
                <ActivityDetailsForm/>
            </div>
          </div>
      </div>
    );
  }
}

export default ActivityDetails