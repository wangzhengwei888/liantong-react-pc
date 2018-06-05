/**
 * Created by 10400 on 2017/8/9.
 * 个人中心收藏店铺
 */
import React , { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Form, Icon, Table, Button, Steps, Modal, Select, Upload , Radio,AutoComplete,Menu,Dropdown ,Tree ,Checkbox } from 'antd';
import Img from '../../components/Img/Img';
import moment from 'moment';
import { collection_store_body } from './collection_store.less'
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const confirm = Modal.confirm;

class  Collection_store extends Component{
  constructor(props){
    super(props);
    this.state={
      //pagination: {},
      formLayout: 'inline',
      selectedRowKeys: [],  // Check here to configure the default column
    }
  }
  componentWillUnmount(){

  }

  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }


  handleChange = (pageno,pageSize) => {
    let v = {
      pageNo:pageno,
      pageSize:pageSize,
      type:2
    }
    this.props.dispatch({type:'collectionStore/collectionEFF',value:v})
  }
  /*删除单个*/
  showConfirm = (storeId)=> {
    console.log(storeId)
    const value={
      storeId:storeId,
      favType:2
    }
    confirm({
      title: '您确定要删除吗?',
      content: '',
      onOk:()=> {
        console.log('OK');
        this.props.dispatch({ type:'collectionStore/cancleCollecStoreEFF', payload:value });
      },
      onCancel() {
        console.log('取消');
      },
    });
  }

  /*删除多个*/
  showConfirmAll = (selectedRowKeys)=> {
    console.log(selectedRowKeys)
    const value={
      storeId:selectedRowKeys.join(','),
      favType:2
    }
    console.log(value)
    if(selectedRowKeys.length > 0){
      confirm({
        title: '您确定要删除吗?',
        content: '',
        onOk:()=> {
          console.log('OK');
          this.props.dispatch({ type:'collectionStore/cancleCollecStoreEFF', payload:value });
        },
        onCancel() {
          console.log('取消');
        },
      });
    }else{
      confirm({
        title: '请选择要删除的店铺！',
        // content: '',
        onOk:()=> {
          console.log('OK');
        },
        onCancel() {
          console.log('取消');
        },
      });
    }
  }

  componentDidMount() {

  }


  render (){
    const {collectionStoreList,isInfo,totalRecords,pageNo,pageSize}=this.props.collectionStore;
    if(!isInfo){
      return null;
    }
    const { loading, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    const columns = [{
      title: '店铺',
      dataIndex: 'store.storeName',
      key:'store.storeName',
      render:(text,record)=>{
        return (
          <div className="table_title">
            <div className="table_title_l"><Img src={record.store.storeLogo} /></div>
            <div className="table_title_r">
              <p className="span_p1"><a href={`/store/${record.store.storeId}`}>{record.store.storeName}</a></p>
              {/*<p className="span_p2">{record.store.storeGoodsCount}</p>*/}
            </div>
          </div>
        )
      }
    },{
      title: '收藏时间',
      dataIndex: 'favTime',
      key:'favTime',
      render:(text,record)=>{
        const dataTime = record.favTime;
        let day = moment(dataTime).format('YYYY-MM-DD HH:mm:ss');
        return (
          <div>{day}</div>
        )
      }
    }, {
      title: '收藏人气',
      dataIndex: 'store.storeCollect',
      key: 'store.storeCollect',
    }, {
      title: '操作',
      dataIndex: 'operation',
      key:'operation',
      render:(text,record)=>{
        return (
          <div className="cancel"><a href={`/store/${record.store.storeId}`} style={{marginRight:'10px'}}>进入店铺</a><a onClick={()=>this.showConfirm(record.store.storeId)}>取消关注</a></div>
        )
      }
    }];
    return (
      <div className={collection_store_body}>

        <div className="collection_goods_content" style={{width:'980px',float:'right'}}>
          {/*头部单行条*/}
          <div className="used_nva_bar">
            <a href="#">我的商城 > </a>
            <a href="#">收藏中心 > </a>
            <span>收藏店铺</span></div>

        <Form>
          <div className="collection_goods_table">
            <div style={{paddingBottom:'10px',paddingLeft:'10px'}}><Button onClick={()=>this.showConfirmAll(selectedRowKeys)}>删除</Button></div>
            <Table
              rowSelection={rowSelection}
              columns={columns}
              dataSource={collectionStoreList}
              className="collection_table"
              rowKey={record => record.store.storeId}
              pagination={{
                total:totalRecords,
                current:pageNo,
                pageSize:pageSize,
                showQuickJumper:true,
                onChange:this.handleChange
              }}

              // loading={this.state.loading}
             // onChange={this.handleTableChange}
            />

          </div>
        </Form>

        </div>
      </div>
    );
  }
}

export default connect(({collectionStore})=>({collectionStore}),(dispatch,own)=>{return {dispatch,own}})(Form.create()(Collection_store));
