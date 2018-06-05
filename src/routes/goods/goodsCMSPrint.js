//CMS打印页面
import React, {Component} from 'react';
import {connect} from 'dva';
import {Row, Col, Form, Input, Tooltip, Icon, Cascader, Select, Checkbox, Button, AutoComplete,message} from 'antd';
import {routerRedux,Link} from 'dva/router';
import {getFullUrl} from '../../utils/common';
import PropTypes from 'prop-types';
import {BodyHeadImg} from '../../components/Advertising/Advertising'
import Search from '../../components/Search/Search';
import Navigation from '../../components/Navigation/Navigation'
import Img from '../../components/Img/Img';
import MSDSPrintFrom from './MSDSPrintFrom';



import { GoodsRecommed ,bottemDetail} from './api';
import {Print_Content,COA_Content,MSDS_Content} from  './goodsCMSPrint.less'
import {product_left_nav} from "../../components/LeftNav/LeftNav.less";


const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;


class GoosCMSPrint extends Component {
 constructor(props) {
  super(props)
  this.state = { 
    productNumber:null,
  }

 }


 componentDidMount(){
    var iTem= setInterval(
         ()=>{
             this.setState({ productNumber : this.props.goodsDetail&&this.props.goodsDetail.data[0]&& this.props.goodsDetail.data[0].sinopharmGoodsCode? this.props.goodsDetail.data[0].sinopharmGoodsCode:''});       
         }
         ,1000) 
     setInterval(()=>{
           clearInterval(iTem);
     },10000)
 }

 handleSearch = (e) => {
    e.preventDefault();
 
     
    this.props.form.validateFields((err, values) => {
        // console.log(this.props.goodsDetail.data[0].sinopharmGoodsCode)
        // if(values.productNumber==''||values.productNumber=='undefined'||values.productNumber==null){
        //     this.props.form.setFieldsValue({   
        //         productNumber: this.props.goodsDetail&&this.props.goodsDetail.data[0]&& this.props.goodsDetail.data[0].sinopharmGoodsCode ? this.props.goodsDetail.data[0].sinopharmGoodsCode:'',
               
        //     });
        // }
        
      if (!err) {
            console.log('Received values of form: ', values);       
            let sampleBh=values.productNumber? values.productNumber:'';
            // let sampleBh=values.productNumber? values.productNumber:'';
            let batchName=values.productBatchNum? values.productBatchNum:''  ; 
            let casindex=values.CSANumber? values.CSANumber:''  ;
            let csdsfilecode=values.productNum? values.productNum:''  ; 

            if((!!sampleBh)&&(!!batchName)){
                    let   val = "searchType=exactSearch" +"&sampleBh="+sampleBh+ "&batchName="+ batchName+
                    "&casindex="+casindex +"&csdsfilecode="+ csdsfilecode +""
                    this.props.dispatch(routerRedux.push(`/home/goodsPrintList?${val}`));
            }else{
                message.warning('请输入查询条件');
            }

     }
    }); 

  }


 render() {
     const { getFieldDecorator } = this.props.form;
     let { data } =this.props.goodsDetail;
    //   console.log(data)
     const goodsdetails=data[0];
    //  let sinopharmGoodsCode='';
    //  if(goodsdetails){
    //     sinopharmGoodsCode=goodsdetails.sinopharmGoodsCode;
    //  }
    //  const goodsdetails={ goodsdetails?  goodsdetails.sinopharmGoodsCode}
     const formItemLayout = {
        labelCol: {
         xs: {span: 24},
         sm: {span: 6},
        },
        wrapperCol: {
         xs: {span: 24},
         sm: {span: 14},
        },
       };
       const formItemLayout2 = {
        labelCol: { span: 8 }
      };
    
      const { productNumber } = this.state;
  return (
     <div>   
      
        <div  className={Print_Content}>
            <div className={COA_Content}>
                <Form onSubmit={this.handleSearch}>
                   <p>COA报告查询（产品检验报告）</p>
                    <Row>
                        <Col span={8}>
                            <FormItem
                                 {...formItemLayout}
                                label="产品编号"
                            >
                                {getFieldDecorator('productNumber', {setFieldsValue: productNumber,initialValue:this.state.productNumber })(
                                <Input  
                                //  placeholder={goodsdetails?  goodsdetails.sinopharmGoodsCode:'' }  
                                 />
                                )}
                            </FormItem>  
                        </Col>
                        <Col  span={8}>
                            <FormItem
                               {...formItemLayout}
                                label="产品批号"
                                >
                                {getFieldDecorator('productBatchNum')(
                                <Input  placeholder="产品批号"/>
                                )}
                            </FormItem>
                        </Col> 
                        <Col span={2}>
                            <FormItem {...formItemLayout2}>
                               <Button type="primary" htmlType="submit" ghost>搜索</Button>
                            </FormItem>
                      </Col> 
                    </Row>  
                </Form>
            </div>
            {/*
            <div className={MSDS_Content}>  
                    <Form onSubmit={this.handleSearch2}>
                        <p>MSDS(化学品安全说明书)</p>
                            <Row>
                                <Col span={8}>
                                    <FormItem
                                        {...formItemLayout}
                                        label="CSA号"
                                    >
                                        {getFieldDecorator('CSANumber')(
                                        <Input  placeholder="CSA号" />
                                        )}
                                    </FormItem>  
                                </Col>
                                <Col  span={8}>
                                    <FormItem
                                    {...formItemLayout}
                                        label="品名"
                                        >
                                        {getFieldDecorator('productNum')(
                                        <Input  placeholder="品名"/>
                                        )}
                                    </FormItem>
                                </Col> 
                                <Col span={2}>
                                    <FormItem {...formItemLayout2}>
                                    <Button type="primary" htmlType="submit" ghost>搜索</Button>
                                    </FormItem>
                            </Col> 
                            </Row>  
                    </Form>
            </div>
            */}
            <MSDSPrintFrom></MSDSPrintFrom>
           

        </div>
        
      
    </div>

  );
 }
}

export default connect(({technology,goodsDetail, app}) => ({technology,goodsDetail, app}), (dispatch, own) => {
 return {dispatch, own}
})(Form.create()(GoosCMSPrint));
