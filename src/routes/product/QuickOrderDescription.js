import React, { Component } from 'react'
import { connect } from 'dva'
import { Link } from 'dva/router'
import {Breadcrumb, Table, Icon, Divider ,Form, Input, Row, Col, Checkbox, Button, AutoComplete,Slider ,Radio,message } from 'antd';
// import {  Button, Table, Row, Col, Pagination, DatePicker, Input, Select, Icon } from 'antd'
import {new_list,description_content} from './QuickOrderDescription.less';
import Search from '../../components/Search/Search'
import Navigation from '../../components/Navigation/Navigation'


class QuickOrderDescription extends Component {
  constructor(props) {
    super(props)
    this.state = {
      startValue: null,
      endValue: null,
      endOpen: false,
      data: [],
      pagination: {},
      loading: true,
    }
  }
  render() {
    return (
      <div>
          <div className={new_list}>
            <Breadcrumb separator=">" className='security_nav_bar'>
              <Breadcrumb.Item href="">我的账户</Breadcrumb.Item>
              <Breadcrumb.Item>快速订购说明</Breadcrumb.Item>
            </Breadcrumb> 
            <div className={description_content}>
                <p>1.新建一个带有二列的Excel表格</p>
                <p>2.第一列填写产品编号（例如：11217-200）</p>
                <p>3.第二列填写具体数量</p>
                <p>4.保存Excel文件</p>
                <span> <img src={require('../../assets/excel.png')} alt=""/></span>            
            </div>       
          </div>  
             
      </div>
    )
  }  
}

export default connect(({product})=>({product}))(QuickOrderDescription)