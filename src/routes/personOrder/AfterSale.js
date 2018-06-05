import React, { Component } from 'react'
import { BodyHeadImg } from '../../components/Advertising/Advertising'
import { Breadcrumb, Row, Col, Steps, Popover, Radio, Pagination, Input, Button, Form, Upload, message, Icon, Modal } from 'antd'
import { Link } from 'dva/router'
import { connect } from 'dva'
import { after_sale } from './AfterSale.less'
import Img from "../../components/Img/Img"
import Search from '../../components/Search/Search'
import Navigation from '../../components/Navigation/Navigation'

const Step = Steps.Step;
const customDot = (dot, { status, index }) => (
  <Popover content={<span>步骤 {index} 状态： {status}</span>}>
    {dot}
  </Popover>
);

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { span: 8 }
};
const RadioGroup = Radio.Group;
const { TextArea } = Input;

class AfterSale extends Component {
  state = {
    buyerMessage: '退运费',
    reasonInfo: '',
    showImgData: false,
    previewVisible: false,
    previewImage: '',
    fileList: []
  }
  onChange = (e) => {
    this.setState({
     buyerMessage: e.target.value,
    });
  }
 handleSubmit = (e) => {
  e.preventDefault();
  console.log(this.state.fileList)
  this.props.form.validateFields((err, values) => {
   if (!err) {
    let files = []
    this.state.fileList.forEach(item=> {
     if(item.response && item.response.result==1){
      files.push(item.response.data)
     }
    })
    let obj = {
     ...values,
     buyerMessage: this.state.buyerMessage,
     reasonInfo: this.state.reasonInfo,
     picInfo: files.join(',')
    }
    this.props.dispatch({type: 'afterSale/returnOrderEFF', obj})
   }
  });
 }
 handleChange = ({file,fileList}) => {
  if(file.status == 'done'){
   if(file.response.result == 1){
    // this.setState({fileList: [...this.state.fileList,file.response.data]})
    message.success(file.response.msg);
   }else{
    message.error("上传失败，请重新上传");
   }
  }
  this.setState({ fileList })
 }
 checkConfirm = (rule, value, callback) => {
   if(isNaN(parseInt(value))){
    value = 0
   }
  const form = this.props.form;
  const goodsNum = form.getFieldValue('goodsNum')
  const {productSellBillQty} = this.props.afterSale.goodsDetail
  let reg = /^[0-9]+$/
  if(reg.test(value) && (parseInt(value)> parseInt(productSellBillQty))){
   form.setFieldsValue({
    goodsNum: this.props.afterSale.goodsDetail.productSellBillQty
   })
  }else{
   form.setFieldsValue({
    goodsNum: parseInt(value)
   })
  }
  callback();
 }
 onChangeTextArea = (e) => {
   this.setState({
    reasonInfo: e.target.value
   })
 }
  handleUpload = () => {
   this.setState({showImgData:true})
  }
 handleCancel = () => this.setState({ previewVisible: false })
 handlePreview = (file) => {
  this.setState({
   previewImage: file.url || file.thumbUrl,
   previewVisible: true,
  });
 }
  render () {
    const { getFieldDecorator } = this.props.form;
    // const pageType = this.props.params.type; // 0或空为普通 1为试剂 2除试剂以外其他产品
    const { orderSn, goodsDetail,_type } = this.props.afterSale;
    const formItemLayout = {
     labelCol: {span: 2},
     wrapperCol: {span: 22},
    };
   const { previewVisible, previewImage, fileList } = this.state;
   const uploadButton = (
    <div>
     <Icon type="plus" />
     <div className="ant-upload-text">Upload</div>
    </div>
   );

    return (
      <div>
        <Search></Search>
        <Navigation preson={true}>
          <div className={after_sale}>
            <BodyHeadImg headImg={{url:'/upload/img/lmadv/1508217294561.png',id:'234'}}/>
            <Breadcrumb separator=">" className='security_nav_bar'>
              <Breadcrumb.Item href="">我的账户</Breadcrumb.Item>
              <Breadcrumb.Item>售后申请</Breadcrumb.Item>
            </Breadcrumb>
            <div className="steps_wapper">
              <Steps current={3} progressDot={customDot}>
                <Step title="退换货申请" />
                <Step title="退换货确认" />
                <Step title="商品退回" />
                <Step title="办理退换货" />
              </Steps>
            </div>
            <div>
              <table className="protocol">
                <tbody>
                  <tr>
                    <td>服务保障</td>
                    <td>为每一位在中国试剂网购物的顾客提供我们优质的产品、专业的服务，保障您的饿安全、让您满意。</td>
                  </tr>
                  <tr>
                    <td>退换货标准</td>
                    <td>
                      <p>1.本公司所经营的化学试剂、玻璃仪器等商品属于特殊的生产资料，一般情况下不接受退货处理。</p>
                      <p>2.若您收到商品后发现存在质量缺陷等问题，请您在第一时间与我们联系。</p>
                      <p>3.下列商品一经售出本公司不接受退货：</p>
                      <p>1）剧毒品、爆炸品和易制毒、易制爆化学品；</p>
                      <p>2）因您的原因造成的外包装污染、破损的商品和已经启封的商品；</p>
                      <p>3）为您代办的专项订货（一进一出、进口商品）；</p>
                      <p>4）因您运输或保管不当造成质量问题的商品；</p>
                      <p>5）怕热商品、易变商品、效期商品、易碎商品；</p>
                      <p>6）冷冻、冷藏商品；</p>
                      <p>7）贵重金属及其化合物商品；</p>
                      <p>8）销售超过1年的商品。</p>
                      <p>4.除因我公司售出的商品存在质量缺陷外，退回商品的运费，以及换货商品的来回运费均由购买者承担。</p>

                    </td>
                  </tr>
                  <tr>
                    <td>退换货方式</td>
                    <td>
                      <p>我司在可退货期限内受理以下条件的退货：</p>
                      <p>1.经我公司确认后，将商品退回本公司，同时请保持商品外观清洁、完好无损、内在质量无影响，原来包装不要损坏，本公司将为您进行商品调换或办理退货手续。</p>
                      <p>2.质量有异议的商品，自售出日期起三个月之内接受退换货。</p>
                      <p>3.退换货受理时效：市内客户在商品售出后7天内、市外客户在收到商品后7天内。</p>
                      <p>4.若在以上时间段外由于您的原因需要本公司为您进行商品调换或退货，由此本公司将产生相应的商品、单据等损耗费用。为此一般按照退货商品金额的80%折扣收回商品并外加收取75元的手续费；</p>
                    </td>
                  </tr>
                  <tr>
                    <td>特别提醒</td>
                    <td>
                      <p>1.请在收到商品时及时进行验收，遇到产品问题请在第一时间与我们联系。</p>
                      <p>2.当您发生要退/换货时，请务必填写“退/换货申请表”，上传您拍摄的有问题的产品图片，并联系客服人员：021-63210123。</p>
                      <p>3.当与您确认可以办理退货时，请务必根据客服人员要求将原有的发票寄还给我们，如由于您的原因发票遗失或无法寄回，将无法办理退货手续。</p>
                      <p>4.最终处理结果将反馈在该问题产品的订单中，客服人员也会及时将结果电话通知您。</p>
                      <p>5.未经确认直接寄回的产品，无法进行退换货处理。</p>
                      <p>6.如遇特殊情况我们将酌情处理，本公司保留最终的解释权。</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {_type == 0 ?
            <div className="btn_group">
              <Link  to="/personOrder/myOrder"> <span>我要申请</span></Link>
              <Link  to="/personOrder/refundList"> <span style={{background: '#3a98cc'}}>我要查询</span></Link>
            </div> : ''
            }
            {
             _type == 1 ?
              goodsDetail.isReagent == 0 || goodsDetail.isReagent == 1 ?
               <div className="inputArea">
                <Form onSubmit={this.handleSubmit} layout="inline">
                 <Col className="title" span={24}>我要退款/退货</Col>
                 <Col span={2}>订单号<span style={{margin:'0 8px 0 2px'}}>:</span></Col>
                 <Col span={22}>{orderSn}</Col>
                 <Col span={24}>
                  <FormItem
                   {...formItemLayout}
                   label={<span style={{color:'rgba(0,0,0,0.65)'}}>联系人</span>}
                  >
                   {getFieldDecorator('buyerName', {
                    rules: [{required: true, message: '联系人不能为空'}]
                   })(
                    <Input style={{width:'180px',float: 'left',marginRight:'10px'}}/>
                   )}
                  </FormItem>
                 </Col>
                 <Col span={24}>
                  <FormItem
                   {...formItemLayout}
                   label={<span style={{color:'rgba(0,0,0,0.65)'}}>联系电话</span>}
                  >
                   {getFieldDecorator('buyerTel',{
                    rules: [{ required: true, message: '联系电话不能为空' },{ pattern:/^[0-9]{11}$/, message: '请填写正确的联系方式' }]
                   })(
                    <Input style={{width:'180px',float: 'left',marginRight:'10px'}} />
                   )}
                  </FormItem>
                 </Col>
                 <Col span={2}>所退产品<span style={{margin:'0 8px 0 2px'}}>:</span></Col>
                 <Col span={22}><FormItem>
                  <table className="table">
                   <tbody>
                   <tr>
                    <th>国药编码</th>
                    <th>商品</th>
                    {goodsDetail.isReagent == 1 ? <th><span style={{color: '#fb232d',marginRight:'4px' }}>*</span>批号</th> : ''}
                    <th><span style={{color: '#fb232d',marginRight:'4px' }}>*</span>退货数量</th>
                   </tr>
                   <tr>
                    <td>{goodsDetail.goodsErpCode}</td>
                    <td>{goodsDetail.goodsName}</td>
                    {goodsDetail.isReagent == 1 ? <td>
                     <FormItem>
                      {getFieldDecorator('batchNo',{
                       rules: [{ required: true, message: ' ' }]
                      })(
                       <Input size="small" className="small_input" />
                      )}
                     </FormItem>
                    </td> : ''}
                    <td>
                     <FormItem>
                      {getFieldDecorator('goodsNum',{
                       rules: [{ required: true, message: ' '},{validator: this.checkConfirm}]
                      })(
                       <Input size="small" className="small_input" />
                      )}
                     </FormItem>
                    </td>
                   </tr>
                   </tbody>
                  </table>
                 </FormItem></Col>
                 <Col span={2}>退货原因<span style={{margin:'0 8px 0 2px'}}>:</span></Col>
                 <Col span={22}>
                  <RadioGroup onChange={this.onChange} value={this.state.buyerMessage} className="line_height_30">
                   <Col span={5}><Radio value={'退运费'}>退运费</Radio></Col>
                   <Col span={19}>如您提货时物流公司重复收取运费，可申请退款或帮您做预存款处理，您需要提供物流公司的收费收据。</Col>
                   <Col span={5}><Radio value={'收到商品破损'}>收到商品破损</Radio></Col>
                   <Col span={19}>如您收到商品时就存在破损问题，可选择此项，并且需要提供注明破损的物流签收单照片。</Col>
                   <Col span={5}><Radio value={'商品错发/漏发'}>商品错发/漏发</Radio></Col>
                   <Col span={19}>如您发现收到的商品存在发错或漏发问题，可选择此项，并且您需要提供已收到产品的照片。</Col>
                   <Col span={5}><Radio value={'收到商品与描述不符'}>收到商品与描述不符</Radio></Col>
                   <Col span={19}>收到的商品与网站详情页面的描述存在不符的情况。</Col>
                   <Col span={5}><Radio value={'商品质量问题'}>商品质量问题</Radio></Col>
                   <Col span={19}>如您收到的商品存在质量问题时，请提供具体书面说明。</Col>
                   <Col span={5}><Radio value={'其他'}>其他</Radio></Col>
                   <Col span={19}>如您所遇到的问题不在上述退货退款原因内，请在退货退款说明中详细描述您的要求。</Col>
                  </RadioGroup>
                 </Col>
                 <Col span={2}>退货／退款<br/>说明：</Col>
                 <Col span={22}>
                  <TextArea name="" id="" rows="6" onChange={(e) => this.onChangeTextArea(e)} value={this.state.reasonInfo}></TextArea>
                 </Col>
                 <Col span={2}>附件上传：</Col>
                 <Col span={22}>
                  <div className="left_gap">
                   <Upload
                    action="/reagent-front/orderApi/returnFilesUpload"
                    listType="picture-card"
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                    fileList={fileList}
                    multiple={true}
                   >
                    {uploadButton}
                   </Upload>
                   <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                   </Modal>
                  </div>
                 </Col>
                 <Button className="submit_btn" htmlType="submit">提交</Button>
                </Form>
               </div> : '' : ''
            }
          </div>
        </Navigation>
      </div>
    )
  }
}

export default connect(({ afterSale }) => ({ afterSale }), (dispatch) => { return { dispatch } })(Form.create()(AfterSale))
