/**
 * Created by 10400 on 2017/8/9.
 * 个人中心收藏商品
 */
import React , { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Form, Icon, Table, Button, Steps, Tooltip, Select, Modal , Radio,AutoComplete,Menu,Dropdown ,Tree ,Checkbox,Input } from 'antd';
import Img from '../../components/Img/Img';
import { routerRedux } from 'dva/router';
import { collection_goods_body } from './collection_goods.less'
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const confirm = Modal.confirm;
const Search = Input.Search;

class  Collection_goods extends Component{
  constructor(props){
    super(props);
    this.state={
      formLayout: 'inline',
      selectedRowKeys: [],  // Check here to configure the default column
      loading: false,
    }
  }
  componentWillUnmount(){

  }
  start = () => {
    this.setState({ loading: true });
    // ajax request after empty completing
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loading: false,
      });
    }, 1000);
  }
  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }
  handelchangePage=(pageno)=>{
    console.log(pageno);
    // debugger
    this.props.dispatch({ type:'collectionGood/goodsCollectListEFF',value:{pageNo:pageno}, })
  }
  /*批量取消*/
  showConfirmAll = (selectedRowKeys)=> {
    const value={
      goodsId: selectedRowKeys.join(','),
      // favType:1
    }
    console.log(value)
    if(selectedRowKeys.length > 0){
      confirm({
        title: '您确定要删除吗?',
        content: '',
        onOk:()=> {
          console.log('OK');
          this.props.dispatch({ type:'collectionGood/deleteGoodsFavoritesEFF', payload:value });
          this.props.dispatch({ type:'collectionGood/goodsCollectListEFF', });
        },
        onCancel() {
          console.log('取消');
        },
      });
    }else{
      confirm({
        title: '请选择要删除的商品！',
        content: '',
        onOk:()=> {
          console.log('OK');
        },
        onCancel() {
          console.log('取消');
        },
      });
    }
  }
  /*单个删除*/
  showConfirm = (goodsId)=> {
    const value={
      goodsId:goodsId,
      // favType:1
    }
    confirm({
      title: '您确定要删除吗?',
      content: '',
      onOk:()=> {
        console.log('OK');
        console.log(value)
        this.props.dispatch({ type:'collectionGood/deleteGoodsFavoritesEFF', payload:value });
        this.props.dispatch({ type:'collectionGood/goodsCollectListEFF', });
      },
      onCancel() {
        console.log('取消');
      },
    });
  }
  gotoGoodsDetail=(goodsId)=>{
    console.log(goodsId)
    this.props.dispatch(routerRedux.push(`/goodsDetail/${goodsId}`));
  }
  render (){
    const {goodsCollectListData,isInfo}=this.props.collectionGood;
    if(!isInfo){
      return null;
    }
    console.log(this.props.collectionGood)
    const { loading, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;

    const columns = [{
      title: '商品',
      dataIndex: 'goodsName',
      key: 'goodsName',
      render:(text,record)=>{
        // console.log(record)
        return (
          <div className="table_title">
            <div className="table_title_l"><Img src={record.goodsImage} /></div>
            <div className="table_title_r">
              <p className="span_p1" onClick={()=>this.gotoGoodsDetail(record.goodsId)}><a href="#">{record.goodsName}</a></p>
              <p className="span_p2">售出：<span style={{color:'#ff0101'}}>{record.salenum}</span>件（<span style={{color:'#ff0101'}}>{record.commentnum}</span>条评论）</p>
            </div>
          </div>
        )},
    },{
      title: '商户名称',
      dataIndex: 'storeName',
      key: 'storeName',
    }, {
      title: '单价（元）',
      dataIndex: 'goodsPrice',
      key: 'goodsPrice',
    }, {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render:(text,record)=>{
        return (
          <div className="delected" onClick={()=>this.showConfirm(record.goodsId)}></div>
        )
      }
    }];

    return (
      <div className={collection_goods_body}>
        <div className="collection_goods_content" style={{width:'980px',float:'right'}}>
          {/*头部单行条*/}
          <div className="used_nva_bar">
            <a href="#">我的商城 > </a>
            <a href="#">收藏中心 > </a>
            <span>收藏商品</span></div>
          <Form>
            <div className="collection_goods_table">
              <div style={{paddingBottom:'10px',paddingLeft:'10px'}}>
                <Button onClick={()=>this.showConfirmAll(selectedRowKeys)}>删除</Button>
                <Search
                  placeholder="搜索"
                  style={{ width: 300,float:'right' }}
                  onSearch={value => {
                    // console.log(value)
                    this.props.dispatch({ type: 'collectionGood/goodsCollectListEFF',value:{goodsName:value}});
                  }}
                />
              </div>
              <Table rowSelection={rowSelection}
                     columns={columns}
                     dataSource={goodsCollectListData}
                     className="collection_table"
                     rowKey={record => record.goodsId}
                     pagination={{
                       total:goodsCollectListData.length,//数据总数
                       current:goodsCollectListData.pageNo,//当前页数
                       pageSize:goodsCollectListData.pageSize,//每页条数
                       showQuickJumper:true,//是否可以快速跳转至某页
                       onChange:this.handelchangePage
                     }}
              />
            </div>
          </Form>

        </div>
      </div>
    );
  }
}

export default connect(({collectionGood})=>({collectionGood}),(dispatch,own)=>{return {dispatch,own}})(Form.create()(Collection_goods));
