/**
 * Created by 10400 on 2017/8/9.
 * order快速下单
 */
import React , { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import QuickOrderTable from './QuickOrderTable';
import PurchasingTemplate from './PurchasingTemplate';//选择采购模版
import CollectionList from './CollectionList';//收藏清单
import PurchaseRecord from './PurchaseRecord';//最近购买记录
import Search from '../../components/Search/Search';
import Navigation from '../../components/Navigation/Navigation';
import { routerRedux, Link } from 'dva/router';
import Coupon from './coupon';
import { IMAGE_DOMAIN } from '../../utils/common';
import { Form, Icon, Input, Button, message,Select,Radio,Menu,Dropdown ,Tree ,Checkbox,Modal,Tabs, Row, Col,Upload } from 'antd';
import { quickOrder_body,PurchasingTemplate_modal,CollectionList_modal,purchaseRecord_modal, jihua_modal } from './quickOrder.less'

const FormItem = Form.Item;
const Option = Select.Option;
const TreeNode = Tree.TreeNode;
const TabPane = Tabs.TabPane;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;


class  QuickOrder extends Component{
  constructor(props){
    super(props);
    this.state={
      visible1: false,
      visible2: false,
      visible3: false,
      visible4:false,
      show:false,
      storeListData:[],
      newStoreListData:[],
      selectStore:'',
      cartCountData:0,
      init:0,
      storeNum:props.app.storeListData.length > 0 && props.app.storeListData[0].storeId
    }
  }




  selectStore=(id)=>{
    this.setState({
      selectStore:id
    })
  }

  removeSelectStore=()=>{
    this.setState({
      selectStore:''
    })
  }


  // goodsbatchlist({ storeId:this.props.selectStore, keyword:value, pageNo:1}).then((r)=>{
  //   console.log(r);
  //   if(r.result==1){
  //     this.setState({
  //       goodsbatchlist:r.data,
  //       visible:true
  //     });
  //   }
  // })

  /*modal begin*/
/*弹窗-选择采购模版*/
  showModal1 = () => {

    this.props.dispatch({type:'QuickOrder/getPurTemplateListEFF'});
    // console.log(this.props)
    this.setState({
      visible1: true,
    });
  }


  handleOk1 = () => {
      this.setState({ loading: false, visible1: false });
  }
  handleCancel1 = () => {
    this.setState({ visible1: false });
  }

  showModal4 = () => {
    this.setState({
      visible4: true,
    });
  }
  handleOk4 = () => {
    this.setState({ loading: false, visible4: false });
  }
  handleCancel4 = () => {
    this.setState({ visible4: false });
  }

  onSelectChange = (val) => {
    // console.log(val)
    this.setState({
      storeNum:val
    })
  }


  componentDidMount(){
    this.setState({
      storeNum:this.props.app.storeListData.length > 0 && this.props.app.storeListData[0].storeId
    })
    if(this.props.app.storeListData.length!=this.state.storeListData.length){
      this.setState({
        storeListData:this.props.app.storeListData,
        newStoreListData:this.props.app.storeListData.slice(0,4)
      })
    }
    if(this.state.cartCountData != this.props.app.cartCountData){
      this.setState({
        cartCountData:this.props.app.cartCountData
      })
    }
  }

  componentDidUpdate(pp,ps){
    let _this = this;
    // console.log(pp.app,this.props.app.cartCountData)
    if(pp.app.cartCountData !== "0" && pp.app.cartCountData != this.props.app.cartCountData){
      Modal.confirm({
        title:'',
        content:"是否继续添加",
        okText: '去结算',
        cancelText:"继续添加",
        onOk() {
          _this.props.dispatch(routerRedux.push(`/cart`));
        },
        onCancel(){
          _this.setState({
            init: _this.state.init + 1
          })
        }
      });
    }
    if(pp.app.storeListData.length!=this.state.storeListData.length){
      this.setState({
        storeListData:this.props.app.storeListData,
        newStoreListData:this.props.app.storeListData.slice(0,4)
      })
    }

    if(pp.app.storeListData.length!=this.state.storeListData.length){
      this.setState({
        storeListData:this.props.app.storeListData,
        newStoreListData:this.props.app.storeListData.slice(0,4)
      })
    }

  }

  onXmlChange = (info) => {
    if (info.file.status !== 'uploading') {
      // console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      if(info.file.response.result == 1){
        message.success(info.file.response.msg);
        this.props.dispatch({type:'QuickOrder/addSelectData',arr:info.file.response.data})
        this.handleCancel4();
      }else{
        message.error(info.file.response.msg);
      }
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 上传失败`);
    }
  }


  render (){
    const { visible1,visible2,visible3, visible4, confirmLoading, show, newStoreListData, selectStore,keyNum } = this.state;
    const { goodsClass, navList} = this.props.app;
    const { goodsbatchlist, selectData,storeOrgListData } = this.props.QuickOrder;
    const { dispatch } = this.props;
  //  console.log(newStoreListData)

    const { getFieldDecorator } = this.props.form;
    const { formLayout,init } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },

      },
    };


    return (
      <div>
        <div className={quickOrder_body}>
          <div className="quikOrder_content">

            <div className="quikOrder_top">
              <Row>
                  <Button.Group size="large">
                      <Button type="primary" >
                          <Icon type="folder-add" />导入采购清单
                      </Button>
                      <Button type="primary" onClick={this.showModal1}>
                        <Icon type="folder-add" />选择采购模版
                      </Button>
                  </Button.Group>
              </Row>
              <Row>
                  <span style={{float:'left',paddingLeft:'5px',fontSize:'.8rem',color:'red'}}>
                    温馨提示：请输入药品名称，填写采购数量”，全程“回车键”操作，使用“回车键”可自动新增一行。
                  </span>
              </Row>
             
           
                
            </div>

            <div className='storelist'>
              <Row>
                <Col span={20}>
                  <Row gutter={16}>
                    {
                      newStoreListData.map((v,i,a)=>{
                        if(selectStore!=''&&selectStore==v.storeId){
                          return (
                            <Col  className='selectStoreName' key={v.storeId} span={6}>
                              <div >{v.storeName}<Icon onClick={ this.removeSelectStore } type="close" /></div>
                            </Col>
                          );
                        }else if(selectStore==''){
                          return (
                            <Col className='storeName' key={v.storeId} span={6}>
                              <span onClick={ ()=>{ this.selectStore(v.storeId) } } >{v.storeName}</span>
                              </Col>
                          );
                        }
                      })
                    }
                  </Row>
                </Col>
              </Row>
              
            </div>


            {/*<p className="prompt_txt">温馨提示：部分商品包装更新频繁，如货品与图片不完全一致，请以收到的商品实物为准！</p>*/}
            <div className="quikOrder_table" style={{fontSize:'.8rem'}}>
              <QuickOrderTable keyData={init} initState={this.state.init} selectData={ selectData } dispatch={ dispatch } selectStore={ selectStore } goodsbatchlist={ goodsbatchlist } ></QuickOrderTable>
            </div>

          </div>



          {/*弹窗-选择采购模版*/}
          <Modal title={<span style={{color:'#0085cd'}}>选择采购模版</span>}
                 visible={visible1}
                // onOk={this.handleOk1}
                 confirmLoading={confirmLoading}
                 onCancel={this.handleCancel1}
                 width="950px"
                 className={PurchasingTemplate_modal}
                 footer={ null }
          >
            <PurchasingTemplate onCancel={this.handleCancel1} ></PurchasingTemplate>
          </Modal>

          {/*弹窗-收藏清单*/}
          <Modal title={<span style={{color:'#0085cd'}}></span>}
                 visible={visible2}
                 onOk={this.handleOk2}
                 confirmLoading={confirmLoading}
                 onCancel={this.handleCancel2}
                 width="950px"
                 className={CollectionList_modal}
                 footer={null}
          >
            <CollectionList key={visible2} onCancel={this.handleCancel2}></CollectionList>
          </Modal>

          {/*弹窗-最近购买记录*/}
          <Modal title={<span style={{color:'#0085cd'}}></span>}
                 visible={visible3}
                 onOk={this.handleOk3}
                 confirmLoading={confirmLoading}
                 onCancel={this.handleCancel3}
                 width="950px"
                 className={purchaseRecord_modal}
                 footer={null}
          >
            <PurchaseRecord key={visible3} onCancel={this.handleCancel3}></PurchaseRecord>
          </Modal>

          <Modal title={<span style={{color:'#0085cd'}}>采购计划导入</span>}
                 visible={visible4}
                 onOk={this.handleOk4}
                 confirmLoading={confirmLoading}
                 onCancel={this.handleCancel4}
                 width="650px"
                 className={jihua_modal}
                 footer={null}
          >
            <div className="example_input_l" style={{paddingBottom:'20px'}}>
              {/*<Input placeholder="支持Excel导入" style={{width:'350px'}} addonAfter={<span>采购计划导入</span>}/>*/}

            <Form>
              <FormItem
                {...formItemLayout}
                label="选择商家"
              >
                <Row gutter={8}>
                  <Col span={12}>
                    <Select style={{ width:'100%' }} value={storeOrgListData.length > 0 && storeOrgListData[0].storeId } onChange={this.onSelectChange}>
                      {storeOrgListData.length > 0 && storeOrgListData.map((list,index)=>{
                        return < Option key={list.storeId} value={list.storeId}>{list.storeName}</Option>
                      })}
                    </Select>
                  </Col>
                  <Col span={12}>
                    <a className="ant-btn-lg ant-btn-primary" href={`front/goods/api/exportGoodsByStoreid?storeId=${this.state.storeNum}`} style={{verticalAlign:'top',textDecoration:'none'}} >采购模板下载</a>
                  </Col>
                </Row>
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="选择计划单"
                hasFeedback
              >
                <Upload
                  name='files'
                  action= '/front/goods/api/importGoodsExcel'
                  headers= {{authorization: 'authorization-text'}}
                  onChange={this.onXmlChange}
                >
                  <Button>
                    <Icon type="upload" /> 点击上传文件
                  </Button>
                </Upload>
              </FormItem>
              {/*<FormItem>*/}
                {/*<Button style={{display:'block',margin:'0 auto'}} className='sub_btn' htmlType="submit" type="primary">导入采购计划</Button>*/}
              {/*</FormItem>*/}
            </Form>



            </div>
          </Modal>

        </div>
      </div>
    );
  }
}

QuickOrder.propTypes = {
  form: PropTypes.object,
  QuickOrder: PropTypes.object,
  dispatch: PropTypes.func,
}
export default connect(({QuickOrder,app})=>({QuickOrder,app}),(dispatch,own)=>{return {dispatch,own}})(Form.create()(QuickOrder));
