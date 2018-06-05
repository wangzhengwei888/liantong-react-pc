
import React , { Component } from 'react';
import { IMAGE_DOMAIN } from '../../utils/common';
import Stepper from '../../components/Stepper/Stepper'
import { Form, Icon, Input, Button, message,Select,Radio,Menu,Pagination  ,Tree ,Checkbox,Modal,Tabs,Table,Popconfirm } from 'antd';

import { goodsbatchlist } from './quickOrderAPI';
import { editable_cell } from './EditableCell.less'

const FormItem = Form.Item;
const Option = Select.Option;
const TreeNode = Tree.TreeNode;
const TabPane = Tabs.TabPane;

class EditableCell extends Component {
  constructor(props) {
    super(props);
    this.timerl=null;
    this.state = {
      value: '',
      visible:false,
      goodsbatchlist:[],
      storeId:''
    }
  }


  handleChange = (e) => {
    console.log(e.target.value)
    // this.showModal2();
    const value = e.target.value;
    if(this.state.value==false){
      this.setState({ value, visible:true });
      this.props.visibleIndexCalBack(this.props.index);
    }else if(this.state.value!=''&&e.target.value==''&&this.state.visible==true){
      this.setState({ value,visible:false });
      this.props.visibleIndexCalBack('');
    }else{
      this.setState({ value });
      this.props.visibleIndexCalBack(this.props.index);
    }


    //this.props.dispatch({ type:'QuickOrder/goodsbatchlistEFF', obj:{ storeId:this.props.selectStore, keyword:value, pageNo:1} });
    // goodsbatchlist({ storeId:this.props.selectStore, keyword:value, pageNo:1}).then((r)=>{
    //   //console.log(r);
    //   if(r.result==1){
    //     this.setState({
    //       goodsbatchlist:r.data,
    //       storeId:this.props.selectStore
    //     });
    //   }
    // })
    clearTimeout(this.timerl);
    this.timerl=setTimeout(()=>{this.handleTime(value)},500);


  }

  handleTime=(value)=>{
    goodsbatchlist({ storeId:this.props.selectStore, keyword:value, pageNo:1}).then((r)=>{
      //console.log(r);
      if(r.result==1){
        this.setState({
          goodsbatchlist:r.data,
          storeId:this.props.selectStore
        });
      }
    })
  }

  componentDidUpdate(pp,ps){
    if(pp.selectStore!=this.props.selectStore&&this.state.visible&&this.props.index==this.props.visibleIndex){
      goodsbatchlist({ storeId:this.props.selectStore, keyword:this.state.value, pageNo:1}).then((r)=>{
        //console.log(r);
        if(r.result==1){
          this.setState({
            goodsbatchlist:r.data
          });
        }
      })
    }else if(this.state.value!=''&&this.props.index!=this.props.visibleIndex){
      this.setState({
        value:''
      });
    }
  }

  componentWillUnmount(){
    //console.log(1)
      clearTimeout(this.timerl)
  }

  handleBlur=()=>{

  }

  hanldeClick=(record, index, event)=>{
    let { dataSource }= this.props;
    let hasItem=dataSource.findIndex((v,i,a)=>(v.goodsId==record.goodsId));
    // console.log(hasItem);
    if(hasItem==-1){
      this.setState({  visible:false });
      this.props.hanldAddList(record,this.props.index);
    }else {
      message.error('已经加入采购订单了',1.5);
    }
  }

  columns = [{
    title: '序号',
    dataIndex: 'index',
    key:'index',
    width: '5%',
    render:(text, record, index) => (
      <div>{ index+1 }</div>
    )
  },{
    title: '商品名称',
    dataIndex: 'goodsName',
    key:'goodsName',
    width: '15%',
    render: (text, record) => (
      <div style={{fontWeight:'bold'}}>{record.goodsName}</div>
    ),
  }, {
    title: '规格',
    dataIndex: 'specName',
    key:'specName',
    width: '12%',
  },  {
    title: '单位',
    dataIndex: 'goodsUnitName',
    key:'goodsUnitName',
    width: '6%',
  }, {
    title: '是否拆零',
    dataIndex: 'isChannelPrice',
    key:'isChannelPrice',
    width: '6%',
    render:(text,record)=>{
      return (
        <div>{record.isSellpiece==1 ? '是':'否'}</div>
      )
    }
  },{
    title: '卖家',
    dataIndex: 'storeName',
    key:'storeName',
    width: '12%',
  },{
    title: '生产厂家',
    dataIndex: 'brandName',
    key:'brandName',
    width: '14%',
  },{
    title: '库存',
    dataIndex: 'goodsShowStorage',
    key:'goodsShowStorage',
    width: '7%',
  },{
    title: '采购价',
    dataIndex: 'channelPrice',
    key:'channelPrice',
    width: '6%',
  }];

  render() {
    const { value,visible, goodsbatchlist:dataSource } = this.state;
    let { visibleIndex, index }=this.props;
   // console.log(visibleIndex,index)
    return (
      <div className={ editable_cell }>
        <div className="editable-cell-input-wrapper">
          <Input
            value={value}
            onChange={ this.handleChange }
            onBlur={ this.handleBlur }
          />
          { visible==true&&parseInt(visibleIndex)==parseInt(index) ? <Table
            rowKey={record => record.goodsId}
            bordered dataSource={dataSource}
            columns={this.columns}
            pagination={false}
            onRowClick={ this.hanldeClick }
            className="table_list"/> :''}
        </div>
      </div>
    );
  }
}

export default EditableCell;
