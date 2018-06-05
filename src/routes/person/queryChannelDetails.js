
import React , { Component } from 'react';
//import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Breadcrumb,Checkbox ,Button,Select,Form,Input,Icon,Table,Modal, Row, Col,Tabs } from 'antd';
import Img from '../../components/Img/Img';
const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
const Option = Select.Option;
const TabPane = Tabs.TabPane;
import { querychanneldetails } from './queryChannelDetails.less';
import { getAreaData } from '../../utils/getArea';


class  QueryChannelDetail extends Component{
  constructor(props){
    super(props);
    this.state={
    }
  }



  columns = [
    {
      title: '商品代码',
      dataIndex: 'goodsId',
      key:'goodsId',
    },
    {
      title: '商品名称',
      dataIndex: 'goodsName',
      key:'goodsName',
    },
    {
      title: '规格',
      dataIndex: 'specName',
      key:'specName',
    },
    {
      title: '单位',
      dataIndex: 'purchasingPrice',
      key:'purchasingPrice',
    },
    {
      title: '件装数量',
      dataIndex: 'packTotal',
      key:'packTotal',
    },
    {
      title: '是否可拆零',
      dataIndex: 'isSellpiece',
      key:'isSellpiece',
      render:(text, record,index)=>{
        return (text == 0 ? "否" : "是")
      }
    },
    {
      title: '厂家',
      dataIndex: 'brandName',
      key:'brandName',
    },
    {
      title: '采购价格',
      dataIndex: 'taxPrice',
      key:'taxPrice',
    }
  ];
  columnsApply = [
    {
      title: '商品代码',
      dataIndex: 'goodsId',
      key:'goodsId',
    },
    {
      title: '商品名称',
      dataIndex: 'goodsName',
      key:'goodsName',
    },
    {
      title: '规格',
      dataIndex: 'goodsSpec',
      key:'goodsSpec',
    },
    {
      title: '单位',
      dataIndex: 'purchasingPrice',
      key:'purchasingPrice',
    },
    {
      title: '件装数量',
      dataIndex: 'packTotal',
      key:'packTotal',
    },
    {
      title: '是否可拆零',
      dataIndex: 'isSellpiece',
      key:'isSellpiece',
      render:(text, record,index)=>{
        return (text == 0 ? "否" : "是")
      }
    },
    {
      title: '厂家',
      dataIndex: 'brandName',
      key:'brandName',
    },
    {
      title: '采购价格',
      dataIndex: 'taxPrice',
      key:'taxPrice',
    },
    {
      title: '审批状态',
      dataIndex: 'statusStr',
      key:'status',
    },
  ];
  handelchange=(pageno)=>{
    console.log(pageno);
    this.props.dispatch({ type:'queryChannel/channelDetailsEFF', obj:{pricePageNo:pageno} })
  }
  handelchangeApply=(pageno)=>{
    console.log(pageno);
    this.props.dispatch({ type:'queryChannel/channelDetailsEFF',obj:{applyPageNo:pageno} })
  }

  onChange(value) {
    console.log(`selected ${value}`);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({ type:'queryChannel/channelDetailsEFF', obj:values });
        console.log('Received values of form: ', values);
      }
    });
  }



  render (){
    const { getFieldDecorator } = this.props.form;
    const { channelDetailsDaTa } = this.props.queryChannel;
    const dataSource = channelDetailsDaTa.length > 0 && channelDetailsDaTa[0].channelPriceBean ? channelDetailsDaTa[0].channelPriceBean.channelPriceList : [];
    const total = channelDetailsDaTa.length > 0 && channelDetailsDaTa[0].channelPriceBean ? channelDetailsDaTa[0].channelPriceBean.total : 0;
    const current = channelDetailsDaTa.length > 0 && channelDetailsDaTa[0].channelPriceBean ? channelDetailsDaTa[0].channelPriceBean.pageNo : 1;
    const pageSize = channelDetailsDaTa.length > 0 && channelDetailsDaTa[0].channelPriceBean ? channelDetailsDaTa[0].channelPriceBean.pageSize : 10;

    const dataSourceApply = channelDetailsDaTa.length > 0 && channelDetailsDaTa[0].channelApplyBean ? channelDetailsDaTa[0].channelApplyBean.channelApplyList : [];
    const totalApply = channelDetailsDaTa.length > 0 && channelDetailsDaTa[0].channelApplyBean ? channelDetailsDaTa[0].channelApplyBean.total : 0;
    const currentApply = channelDetailsDaTa.length > 0 && channelDetailsDaTa[0].channelApplyBean ? channelDetailsDaTa[0].channelApplyBean.pageNo : 1;
    const pageSizeApply = channelDetailsDaTa.length > 0 && channelDetailsDaTa[0].channelApplyBean ? channelDetailsDaTa[0].channelApplyBean.pageSize : 10;

    const arr = ["", "一", "二", "三", "四", "五", "六", "七", "八", "九","十"];
    const formItemLayout = {
      labelCol: {
        xs: { span: 2 },
      },
      wrapperCol: {
        xs: { span: 12 },
      },
    };
    const formItemLayoutActive = {
      labelCol: {
        xs: { span: 12 },
      },
      wrapperCol: {
        xs: { span: 12 },
      },
    };

    const payArr = channelDetailsDaTa.length > 0 && channelDetailsDaTa[0].payTypeList.length > 0 && channelDetailsDaTa[0].payTypeList.map((list,index)=>{
          return { label: list.dictionary_name, value: list.dictionary_value }
    })
    const payArrChecked = channelDetailsDaTa.length > 0 && channelDetailsDaTa[0].payTypeList.length > 0 && channelDetailsDaTa[0].payTypeList.map((list,index)=>{
      return list.dictionary_value
    })
    return (
      <div className={ querychanneldetails }>
        <div className="used_nva_bar">
          <Breadcrumb separator=">">
            <Breadcrumb.Item>我的商城</Breadcrumb.Item>
            <Breadcrumb.Item>采购关系查询</Breadcrumb.Item>
            <Breadcrumb.Item>采购关系详情</Breadcrumb.Item>
          </Breadcrumb>
        </div>


        <h2 style={{ margin:'50px 0px', textAlign:'center' }} >采购关系详情</h2>

        <Row>
          <Col className='from_title' span={18}>基本信息</Col>
          <Col className='from_title from_title_toopils' span={6}>如信息有误，请和商家联系</Col>
        </Row>

        <FormItem
          {...formItemLayout}
          label="支付方式"
          className='from_item'
        >
          <CheckboxGroup
            readonly={true}
            value={payArrChecked || []}
            options={payArr || []}  />
        </FormItem>

        <Row>
          <Col className='from_title' span={24}>发票信息</Col>
        </Row>

        <FormItem
          {...formItemLayout}
          className='from_item'
          label="公司抬头"
        >
          <Input value="Basic usage" readOnly="readOnly" />
        </FormItem>

        <FormItem
          {...formItemLayout}
          className='from_item'
          label="税号"
        >
          <Input value="Basic usage" readOnly="readonly" />
        </FormItem>

        <FormItem
          {...formItemLayout}
          className='from_item'
          label="地址"
        >
          <Input value="Basic usage" readOnly="readonly" />
        </FormItem>

        <FormItem
          {...formItemLayout}
          className='from_item'
          label="开户行"
        >
          <Input value="Basic usage" readOnly="readonly" />
        </FormItem>

        <FormItem
          {...formItemLayout}
          className='from_item'
          label="账号"
        >
          <Input value="Basic usage" readOnly="readonly" />
        </FormItem>

        <Row>
          <Col className='from_title' span={24}>配送地址信息</Col>
        </Row>
        {channelDetailsDaTa.length > 0 && channelDetailsDaTa[0].addressList.length > 0 && channelDetailsDaTa[0].addressList.map((list,index)=>{
          let num = (index + 1)/10 >= 1 ? (index + 1)/10 : 0;
          let num1 = (index + 1)%10;
          return <Row key={index} style={{padding:'0px 20px',lineHeight:'48px'}}>
            <Col span={10}>
              <p><span>地址{arr[num] + "" + arr[num1]}:&nbsp;&nbsp;&nbsp;</span>{list.channelAddress}</p>
            </Col>
          </Row>
        })}
        <Row style={{borderTop:'2px solid #ddd'}}>
          <Col>
            <Form style={{ margin:'50px 0px' }} layout="inline" onSubmit={this.handleSubmit}>
              <FormItem
                {...formItemLayoutActive}
                label="商品名称"
                style={{ width:'300px' }}
              >
                {getFieldDecorator('goodsName')(
                  <Input />
                )}
              </FormItem>
              <FormItem
                {...formItemLayoutActive}
                style={{ width:'300px', marginRight:'100px' }}
                label="厂家名称"
              >
                {getFieldDecorator('brandName')(
                  <Input />
                )}
              </FormItem>
              <FormItem >
                <Button type="primary" htmlType="submit">查询</Button>
              </FormItem>
            </Form>
          </Col>
          <Col className='from_title_tab' span={24}>
            <Tabs defaultActiveKey="1">
              <TabPane tab="可采购列表" key="1">
                <Table
                  //bordered
                  dataSource={dataSource}
                  columns={this.columns}
                  rowKey={record => record.id}
                  className='table'
                  pagination={{
                    total,
                    current,
                    pageSize,
                    showQuickJumper:true,
                    onChange:this.handelchange
                  }}
                />
              </TabPane>
              <TabPane tab="正在申请采购列表" key="2">

                <Table
                  //bordered
                  dataSource={dataSourceApply}
                  columns={this.columnsApply}
                  rowKey={record => record.id}
                  className='table'
                  pagination={{
                    total:totalApply,
                    current:currentApply,
                    pageSize:pageSizeApply,
                    showQuickJumper:true,
                    onChange:this.handelchangeApply
                  }}
                />
              </TabPane>
            </Tabs>
          </Col>
        </Row>

      </div>
    );
  }
}


export default connect(({queryChannel})=>({queryChannel}),(dispatch,own)=>{return {dispatch,own}})(Form.create()(QueryChannelDetail));

