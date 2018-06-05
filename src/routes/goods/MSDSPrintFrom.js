//CMS打印页面
import React, {Component} from 'react';
import {connect} from 'dva';
import {Row, Col, Form, Input, Tooltip, Icon, Cascader, Select, Checkbox, Button, AutoComplete,message } from 'antd';
import {routerRedux,Link} from 'dva/router';
import {getFullUrl} from '../../utils/common';
import PropTypes from 'prop-types';
import {BodyHeadImg} from '../../components/Advertising/Advertising'
import Search from '../../components/Search/Search';
import Navigation from '../../components/Navigation/Navigation'
import Img from '../../components/Img/Img';
import { GoodsRecommed ,bottemDetail} from './api';
import {Print_Content,COA_Content,MSDS_Content} from  './goodsCMSPrint.less'
import {product_left_nav} from "../../components/LeftNav/LeftNav.less";


const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;


class MSDSPrintFrom extends Component {
 constructor(props) {
  super(props)
  this.state = { 
    CSANumber:null,
    productNum:null,
  }

 }

    // shouldComponentUpdate(){
    //     // console.log(this.props.goodsDetail)
    //     this.setState({ CSANumber : this.props.goodsDetail&&this.props.goodsDetail.data[0]&& this.props.goodsDetail.data[0].casNo? this.props.goodsDetail.data[0].casNo:''});       
    //     console.log(this.state.CSANumber)
    //     return false;
    // }
  
    componentDidMount(){
       var iTem= setInterval(
            ()=>{
                this.setState({ CSANumber : this.props.goodsDetail&&this.props.goodsDetail.data[0]&& this.props.goodsDetail.data[0].casNo? this.props.goodsDetail.data[0].casNo:''});       
            }
            ,1000)
        // console.log(this.state.CSANumber);
        // clearInterval(iTem);
        setInterval(()=>{
              clearInterval(iTem);
        },10000)
    }

 handleSearch2 = (e) => {
    e.preventDefault();
  
    this.props.form.validateFields((err, values) => {
      if (!err) {

        // if(values.CSANumber==''){
        //     this.props.form.setFieldsValue({
        //         CSANumber: this.props.goodsDetail&&this.props.goodsDetail.data[0]&& this.props.goodsDetail.data[0].casNo? this.props.goodsDetail.data[0].casNo:'',
               
        //     }); 
        // }
        // if(values.productNum==''){
        //     this.props.form.setFieldsValue({
        //         productNum: this.props.goodsDetail&&this.props.goodsDetail.data[0]&& this.props.goodsDetail.data[0].goodsName? this.props.goodsDetail.data[0].goodsName:'',
        //     }); 
        // }

        console.log('Received values of form: ', values);       
        let sampleBh=values.productNumber? values.productNumber:''  ;
        let batchName=values.productBatchNum? values.productBatchNum:''  ; 
        //看传过来的是否有字段和值   
        // let goodsName=this.props.goodsDetail&&this.props.goodsDetail.data[0]&&this.props.goodsDetail.data[0].goodsName? this.props.goodsDetail.data[0].goodsName:'';

        let casindex=values.CSANumber? values.CSANumber:''  ;
        let csdsfilecode=values.productNum? values.productNum:''  ; 
        
            if((!!casindex)||(!!csdsfilecode)){    
                
                let   val = "searchType=exactSearch" +"&sampleBh="+sampleBh+ "&batchName="+ batchName+
                "&casindex="+casindex +"&csdsfilecode="+ csdsfilecode +"";
                this.props.dispatch(routerRedux.push(`/home/goodsPrintListMSDS?${val}`));
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
      const { CSANumber,productNum } = this.state;
    //  console.log(this.state.CSANumber)
  return (    
        <div  className={Print_Content}>
            <div className={MSDS_Content}>  
                    <Form onSubmit={this.handleSearch2}>
                        <p>MSDS(化学品安全说明书)</p>
                            <Row>
                                <Col span={8}>
                                    <FormItem
                                        {...formItemLayout}
                                        label="CAS号"
                                    >
                                        {getFieldDecorator('CSANumber',{setFieldsValue: CSANumber,initialValue:this.state.CSANumber })(
                                        <Input 
                                        //  placeholder={goodsdetails?  goodsdetails.casNo:'' } 
                                         />
                                        )}
                                    </FormItem>  
                                </Col>
                                <Col  span={8}>
                                    <FormItem
                                    {...formItemLayout}
                                        label="品名"
                                        >
                                        {getFieldDecorator('productNum',{setFieldsValue: productNum })(
                                        <Input  
                                           placeholder="品名"
                                        //    placeholder={goodsdetails?  goodsdetails.goodsName:'' } 
                                         />
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
       </div>

  );
 }
}

export default connect(({goodsDetail, app}) => ({goodsDetail, app}), (dispatch, own) => {
 return {dispatch, own}
})(Form.create()(MSDSPrintFrom));
