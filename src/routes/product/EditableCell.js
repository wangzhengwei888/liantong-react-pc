
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
      storeId:'',
      index:0
    }
  }


  handleChange = (e) => {
    // console.log(e.target.value)
    // this.showModal2();
    const value = e.target.value;
    if(this.state.value==false){
      this.setState({ value, visible:true });
      this.props.visibleIndexCalBack(this.props.index);
    }else if(this.state.value!=''&&e.target.value==''&&this.state.visible==true){
      this.setState({ value,visible:false,index:0 });
      this.props.visibleIndexCalBack('');
    }else{
      this.setState({ value });
      this.props.visibleIndexCalBack(this.props.index);
    }

    clearTimeout(this.timerl);
    this.timerl=setTimeout(()=>{this.handleTime(value)},500);


  }

  handleTime=(value)=>{
    goodsbatchlist({ keyword:value, pageNo:1}).then((r)=>{
      //console.log(r);
      if(r.result==1){
        this.setState({
          goodsbatchlist:r.data,
         
        });
      }
    })
  }

  componentDidUpdate(pp,ps){
    if(pp.selectStore!=this.props.selectStore&&this.state.visible&&this.props.index==this.props.visibleIndex){
      goodsbatchlist({  keyword:this.state.value, pageNo:1}).then((r)=>{
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
    document.body.removeEventListener('keydown', this.handleKeyDown);
      clearTimeout(this.timerl)
  }

  componentDidMount(){

     document.body.addEventListener('keydown', this.handleKeyDown)

  }


  handleKeyDown=(e)=>{
   // console.log(e);
    let len = this.state.goodsbatchlist.length;
    if(len>0){
      let ev = e || window.event;

      switch (ev.keyCode){
        case 38: //上
          ev.preventDefault();
          let preindex=this.state.index;
          this.setState({
            index:preindex>1 ? preindex-1: len,
            preindex:preindex
          },()=>{
             //console.log(preindex);
            let TR= document.getElementsByClassName(`quickorderTr${this.state.index}`);
            if(TR&&TR.length>0){
              let preTR= document.getElementsByClassName(`quickorderTr${ this.state.preindex }`);
              if(preTR&&preTR.length>0){
                preTR[0].style.backgroundColor="";
              }
              TR[0].style.backgroundColor="#f3f3f3";
            }
          });
             break;
        case 40:  //下
          ev.preventDefault();
          let preindex1=this.state.index;
          this.setState({
            index:preindex1>len-1 ? 1: preindex1+1,
            preindex:preindex1
          },()=> {
            let TR= document.getElementsByClassName(`quickorderTr${this.state.index}`);
            if(TR&&TR.length>0){
              let preTR= document.getElementsByClassName(`quickorderTr${ this.state.preindex }`);
              if(preTR&&preTR.length>0){
                preTR[0].style.backgroundColor="";
              }
              TR[0].style.backgroundColor="#f3f3f3";
            }
          });
             break;
        case 13:
          let TR= document.getElementsByClassName(`quickorderTr${this.state.index}`);
          if(TR&&TR.length>0){
            TR[0].click();
          }
          break;
      }
    }
  }

  hanldeClick=(record, index, event)=>{
    let { dataSource }= this.props;
    let hasItem=dataSource.findIndex((v,i,a)=>(v.goodsId==record.goodsId));
    // console.log(hasItem);
    if(hasItem==-1){
      this.setState({  visible:false, index:0 });
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
    dataIndex: 'goodsSpec',
    key:'goodsSpec',
    width: '12%',
  },  {
    title: '单位',
    dataIndex: 'goodsUnitName',
    key:'goodsUnitName',
    width: '6%',
  },
  {
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
      <div id="quickordertable" className={ editable_cell }>
        <div className="editable-cell-input-wrapper">
          <Input
            value={value}
            onChange={ this.handleChange }
            onBlur={ this.handleBlur }
          />
          { visible==true&&parseInt(visibleIndex)==parseInt(index) ? <div>
            <Table
              rowKey={record => record.goodsId}
              rowClassName={(record,i) => `quickorderTr${i+1}`}
              bordered dataSource={dataSource}
              columns={this.columns}
              pagination={false}
              onRowClick={ this.hanldeClick }
              scroll={{ y:500 }}
              className="table_list"/>
            </div> :''}
        </div>
      </div>
    );
  }
}

export default EditableCell;
