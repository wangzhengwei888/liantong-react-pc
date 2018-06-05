import React, { Component } from 'react'
import { BodyHeadImg } from '../../components/Advertising/Advertising'
import { Breadcrumb, Button, Table, Row, Col, Pagination, Upload, message, Form, Input } from 'antd'
import { Link } from 'dva/router'
import { connect } from 'dva'
import { refund_detail } from './RefundDetail.less'
import Img from "../../components/Img/Img"
import Search from '../../components/Search/Search'
import Navigation from '../../components/Navigation/Navigation'
import RefundDetailFloor from './RefundDetailFloor'

const { TextArea } = Input;

class RefundDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fileList: [],
      uploading: false,
    }
  }
  handleUpload = () => {
    const { fileList } = this.state;
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append('files[]', file);
    });

    this.setState({
      uploading: true,
    });

    // AJAX
    // reqwest({
    //   url: '//jsonplaceholder.typicode.com/posts/',
    //   method: 'post',
    //   processData: false,
    //   data: formData,
    //   success: () => {
    //     this.setState({
    //       fileList: [],
    //       uploading: false,
    //     });
    //     message.success('upload successfully.');
    //   },
    //   error: () => {
    //     this.setState({
    //       uploading: false,
    //     });
    //     message.error('upload failed.');
    //   },
    // });
  }

  render() {
    let { refundDetailData } = this.props.refundDetail

    const { uploading } = this.state;
    const uploadProps = {
      action: '//jsonplaceholder.typicode.com/posts/',
      onRemove: (file) => {
        this.setState(({ fileList }) => {
          const index = fileList.indexOf(file);
          const newFileList = fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: (file) => {
        this.setState(({ fileList }) => ({
          fileList: [...fileList, file],
        }));
        return false;
      },
      fileList: this.state.fileList,
    };


    //TODO: 换成接口
    refundDetailData = refundDetailData.filter((item) => {
      return item.orderId == this.props.params.id
    })
    refundDetailData = refundDetailData[0]

    return (
      <div>
        <Search></Search>
        <Navigation preson={true}>
          <div className={refund_detail}>
            <BodyHeadImg headImg={{url:'/upload/img/lmadv/1508217294561.png',id:'234'}}/>
            <Breadcrumb separator=">" className='security_nav_bar'>
              <Breadcrumb.Item href="">我的账户</Breadcrumb.Item>
              <Breadcrumb.Item href="">售后申请</Breadcrumb.Item>
              <Breadcrumb.Item href="">售后申请记录</Breadcrumb.Item>
              <Breadcrumb.Item>售后申请详情</Breadcrumb.Item>
            </Breadcrumb>
            <div className="list_area">
              <p className="content_title">退货单信息：</p>
              { refundDetailData.orderStateMemo == '订单已提交' ? <div className="cancel_btn">取消退货申请</div> : '' }
              <div className="list_detail">
                <Col span={8}>退货单编号：{refundDetailData.orderId}</Col>
                <Col span={8}>单据状态：{refundDetailData.orderStateMemo}</Col>
                <Col span={8}>提交时间：{refundDetailData.createTimeStr}</Col>
              </div>
              <div className="line"></div>
              <p className="content_title">退货申请详情：</p>
              <div className="list_detail">
                <Col span={8}>订单编号：{refundDetailData.orderId}</Col>
                <Col span={8}>联系人：{refundDetailData.storeName}</Col>
                <Col span={8}>联系电话：{refundDetailData.createTimeStr}</Col>
              </div>
              <p className="content_title">所退商品：</p>
              <div className="orderList_content">
                <Row className="orderList_content_head">
                  <Col span={8}>基本信息</Col>
                  <Col span={4}>商品属性</Col>
                  <Col span={8}>批号</Col>
                  <Col span={4}>退货数量</Col>
                </Row>
              </div>
              <div>
                <RefundDetailFloor data={refundDetailData || []} isGivePrice={refundDetailData.orderStateMemo == '已报价'}></RefundDetailFloor>
              </div>
              <div className="refund_reason">
                <Row>
                  <Col span={3}>退货原因：</Col>
                  <Col span={20}>收到商品破损</Col>
                </Row>
                <Row>
                  <Col span={3}>退货退款说明：</Col>
                  <Col span={20}>收到的商品液体溢出</Col>
                </Row>
                <Row>
                  <Col span={3}>附件上传：</Col>
                  <Col span={20}>
                    <Row className="attachment">
                      <Col>附件1 点击查看附件>></Col>
                    </Row>
                    <Row className="attachment">
                      <Col>附件2 点击查看附件>></Col>
                    </Row>
                    { refundDetailData.orderStateMemo == '申请已受理' ? 
                      <Row>
                        <Col>
                          <div>
                            <Upload {...uploadProps}>
                              <Button>
                                浏览
                              </Button>
                              <Button
                                className="upload-demo-start"
                                type="primary"
                                onClick={this.handleUpload}
                                disabled={this.state.fileList.length === 0}
                                loading={uploading}
                                style={{marginLeft: '10px'}}
                              >
                                {uploading ? '上传中' : '开始上传' }
                              </Button>
                            </Upload>
                          </div>
                        </Col>
                      </Row>
                    : '' }
                  </Col>
                </Row>
                { refundDetailData.orderStateMemo == '申请已受理' ? 
                  <Row style={{marginTop: '10px'}}>
                    <Col span={3}>补充说明：</Col>
                    <Col span={20}>
                      <TextArea name="" id="" rows="6"></TextArea>
                      <Row>
                        <Col>
                          <Button className="submit_btn">提交</Button>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                : '' }
              </div>
              {refundDetailData.afterSaleAdvise ? 
                <div>
                  <div className="line"></div>
                  <p className="content_title">售后处理意见：{refundDetailData.afterSaleAdviseDateStr ? <span className="advise_time">处理时间：{refundDetailData.afterSaleAdviseDateStr}</span> : ''}</p>
                  <div className="content_text">
                    <p>{refundDetailData.afterSaleAdvise}</p>
                  </div>
                </div>
              : ''}
              {refundDetailData.afterSaleAdvise ? 
                <div>
                  <div className="line"></div>
                  <p className="content_title">售后后续处理：{refundDetailData.afterSaleAdviseAddDateStr ? <span className="advise_time">处理时间：{refundDetailData.afterSaleAdviseAddDateStr}</span> : ''}</p>
                  <div className="content_text">
                    <p>{refundDetailData.afterSaleAdviseAdd}</p>
                  </div>
                </div>
              : ''}
              {refundDetailData.orderStateMemo == '申请已确认' ? 
                <div>
                  <div className="line"></div>
                  <p className="content_title">用户退货物流信息：</p>
                  <div className="content_input">
                    <Row><Col span={4}>退货快递或物流公司：</Col><Col span={8}><Input/></Col><Col span={1}><span>*</span></Col></Row>
                    <Row><Col span={4}>快递或物流单号：</Col><Col span={8}><Input/></Col><Col span={1}><span>*</span></Col></Row>
                    <Row><Col span={4}>退货备注：</Col><Col span={8}><Input/></Col><Col span={1}><span>*</span></Col></Row>
                  </div>
                  <span className="submit">提交</span>
                </div>
              : ''}
              {refundDetailData.shipNum ? 
                <div>
                  <div className="line"></div>
                  <p className="content_title">用户退货物流信息：{refundDetailData.afterSaleAdviseAddDateStr ? <span className="advise_time">处理时间：{refundDetailData.afterSaleAdviseAddDateStr}</span> : ''}</p>
                  <div className="content_input">
                    <Row><Col span={4}>退货快递或物流公司：</Col><Col span={8}>{refundDetailData.shipCom}</Col></Row>
                    <Row><Col span={4}>快递或物流单号：</Col><Col span={8}>{refundDetailData.shipNum}</Col></Row>
                    <Row><Col span={4}>退货备注：</Col><Col span={8}>{refundDetailData.shipText}</Col></Row>
                  </div>
                </div>
              : ''}
              {refundDetailData.refundInfo ? 
                <div>
                  <div className="line"></div>
                  <p className="content_title">退款情况：
                  {refundDetailData.refundInfoDateStr ? <span className="advise_time">处理时间：{refundDetailData.refundInfoDateStr}</span> : ''}</p>
                  <div className="content_text">
                    <p>{refundDetailData.refundInfo}</p>
                  </div>
                </div>
              : ''}
            </div>
          </div>
        </Navigation>
      </div>
    )
  }
}

export default connect(({ refundDetail }) => ({ refundDetail }), (dispatch) => { return { dispatch } })(RefundDetail)
