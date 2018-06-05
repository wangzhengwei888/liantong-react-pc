
import React , { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Breadcrumb,Upload ,Button,Select,Form,Input,Icon,Table,Modal} from 'antd';
import Img from '../../components/Img/Img';
const FormItem = Form.Item;
const Option = Select.Option;

import { querychannel } from './queryChannel.less';
import { getAreaData } from '../../utils/getArea';


class  QueryChannel extends Component{
  constructor(props){
    super(props);
    this.state={
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({ type:'queryChannel/channelListEFF', obj:values });
       // console.log('Received values of form: ', values);
      }
    });
  }

  columns = [
    {
      title: '商家编号',
      dataIndex: 'orgBuyerId',
      key:'orgBuyerId',
    },
    {
      title: '商家名称',
      dataIndex: 'orgSellerName',
      key:'orgSellerName',
    },
    {
      title: '联系人',
      dataIndex: 'orgSellerContacts',
      key:'orgSellerContacts',
    },
    {
      title: '联系方式',
      dataIndex: 'orgSellerTel',
      key:'orgSellerTel',
    },
    {
      title: '渠道状态',
      dataIndex: 'status',
      key:'status',
      render:(text, record) => {
        // console.log(1);
       if(record.status==0){
         return '拒绝'
       }else if(record.status=='1'){
         return '待审核'
       }else {
         return '通过'
       }
      }
    },
    {
      title: '操作',
      dataIndex: 'subtotal',
      key:'subtotal',
      render:(text, record) => {
        return (
          <Link to={`/person/queryChannelDetails/${record.id}`}>查看</Link>
        )
      }
    }
  ];

  handelchange=(pageno,pageSize)=>{
    // console.log(pageno);
    //this.props.dispatch({ type:'home/loadUser',pageNo:pageno })
    this.props.dispatch({ type:'queryChannel/channelListEFF', obj:{ pageno:pageno } });
  }


  render (){
    const { getFieldDecorator } = this.props.form;
    const { data:dataSource, total, pageNo:current, pageSize } = this.props.queryChannel;
    console.log(dataSource)
    const formItemLayout = {
      labelCol: {
        xs: { span: 12 },
      },
      wrapperCol: {
        xs: { span: 12 },
      },
    };


    return (
      <div className={querychannel}>

        <div className="used_nva_bar">
          <Breadcrumb separator=">">
            <Breadcrumb.Item>我的商城</Breadcrumb.Item>
            <Breadcrumb.Item>设置</Breadcrumb.Item>
            <Breadcrumb.Item>采购关系查询</Breadcrumb.Item>
          </Breadcrumb>
        </div>


         <h2 style={{ margin:'10px 0px', textAlign:'center' }} ></h2>

        <Form style={{ margin:'50px 0px' }} layout="inline" onSubmit={this.handleSubmit}>
          <FormItem
            {...formItemLayout}
            label="商家名称"
            style={{ width:'300px' }}
          >
            {getFieldDecorator('orgName')(
              <Input />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            style={{ width:'200px', marginRight:'100px' }}
            label="渠道状态"
          >
            {getFieldDecorator('status')(
              <Select>
                <Option value="1">通过</Option>
                <Option value="2">待审核</Option>
                <Option value="0">拒绝</Option>
              </Select>
            )}
          </FormItem>
          <FormItem >
            <Button type="primary" htmlType="submit">查询</Button>
          </FormItem>
        </Form>

        <Table
          //bordered
          dataSource={dataSource}
          columns={this.columns}
          rowKey={record => record.id}
          className='table'
          pagination={{
            total:parseInt(total),
            current:parseInt(current),
            pageSize:parseInt(pageSize),
            showQuickJumper:true,
            onChange:this.handelchange
          }}
        />

      </div>
    );
  }
}


export default connect(({queryChannel})=>({queryChannel}),(dispatch,own)=>{return {dispatch,own}})(Form.create()(QueryChannel));

