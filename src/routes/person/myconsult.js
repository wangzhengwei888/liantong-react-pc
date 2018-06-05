/**
 * 个人中心我的咨询
 */
import React , { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Form,Select,Input,Row,Col,DatePicker,Button,Table, Icon } from 'antd';
import Img from '../../components/Img/Img';
import { myconsult_body } from './myconsult.less';


const columns = [{
  title: '咨询商品',
  dataIndex: 'goodsImg',
  key: 'goodsImg',
  render: text => <img src={require('../../assets/leimingLogo.png')}/>
}, {
  title: '商品名称',
  dataIndex: 'goodsName',
  key: 'goodsName',
  render: (text) => { return <a href="#">{text}</a>},
}, {
  title: '咨询内容',
  dataIndex: 'content',
  key: 'storeName',
  render: (text, record, index) => { return <Table columns={contentColumns}
                                                   dataSource={contentData}
                                                   bordered={false}
                                                   showHeader={false}
                                                   pagination={false}
                                                   className={'tabContnet'}
                                                   rowClassName={() => {return "content"} }
  />},
}];

let contentColumns = [{
  dataIndex: 'my',
  key: 'my'
},{
  dataIndex: 'con',
  key: 'con'
},{
  dataIndex: 'time',
  key: 'time'
}]

let contentData = [{
  key: '1',
  my:'我的咨询：',
  con:'我问问',
  time:'2017-02-03'
},{
  key: '2',
  my:'回复：',
  con:'我问问',
  time:'2017-02-03'
},
]


let data = [{
  key: '1',
  goodsImg: '../../assets/leimingLogo.png',
  goodsName: '衣品天成 2017春装新品 男士牛仔裤 酷帅时尚直筒牛仔裤 男6MK061',
  content:contentData
},{
  key: '2',
  goodsImg: '../../assets/leimingLogo.png',
  goodsName: '衣品天成 2017春装新品 男士牛仔裤 酷帅时尚直筒牛仔裤 男6MK061',
  content:contentData
}];


class  Myconsult extends Component{
  constructor(props){
    super(props);
    this.state={
      data: [],
      pagination: {},
      loading: true,
    }
  }
  componentWillUnmount(){

  }


  onChange = (field, value,dateString) => {
    console.log(field,value,dateString)
    this.setState({
      [field]: dateString,
    });
  }


  handleTableChange = (pagination) => {
    this.setState({loading:true});
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    data = data.concat(data);
    let _this = this;
    setTimeout(function(){
      _this.setState({
        pagination: pager,
        data:data,
        loading: false,
      });
    },2000)
  }


  componentDidMount() {
    const pagination = { ...this.state.pagination };
    pagination.total = 200;
    pagination.pageSize = 4;
    let _this = this;
    setTimeout(function(){
      console.log("aaa")
      _this.setState({
        data:data,
        loading: false,
        pagination
      })
    },1000)
  }


  render (){
    return (
      <div className={myconsult_body}>
        <div className="myconsult_content">
          {/*头部单行条*/}
          <div className="used_nva_bar">
            <a href="#">我的商城 > </a>
            <a href="#">客户服务 > </a>
            <span>我的咨询</span>
          </div>

          {/*列表*/}
          <Table columns={columns}
                 dataSource={this.state.data}
                 pagination={this.state.pagination}
                 loading={this.state.loading}
                 onChange={this.handleTableChange}
                 bordered
          />

        </div>
      </div>
    );
  }
}

export default connect(({Myconsult})=>({Myconsult}),(dispatch,own)=>{return {dispatch,own}})(Form.create()(Myconsult));
