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
            // this.props.technology&&this.props.technology.detailData&&this.props.technology.detailData[0]?this.props.technology.detailData[0]
             this.setState({
                  productNumber : this.props.technology&&this.props.technology.detailData&& this.props.technology.detailData[0]&& this.props.technology.detailData[0].sinopharmGoodsCode? this.props.technology.detailData[0].sinopharmGoodsCode:''
             });       
         }
         ,1000) 
     setInterval(()=>{
           clearInterval(iTem);
     },10000)
 }


 handleSearch = (e) => {
    e.preventDefault();
 
     
    this.props.form.validateFields((err, values) => {
    
        
      if (!err) {
            console.log('Received values of form: ', values);       
            let sampleBh=values.productNumber? values.productNumber:'';
            let batchName=values.productBatchNum? values.productBatchNum:''  ; 
            let casindex=values.CSANumber? values.CSANumber:''  ;
            let csdsfilecode=values.productNum? values.productNum:''  ; 

            if((!!sampleBh)&&(!!batchName)){
                    let   val = "parentId=4&searchType=exactSearch" +"&sampleBh="+sampleBh+ "&batchName="+ batchName+
                    "&casindex="+casindex +"&csdsfilecode="+ csdsfilecode +""
                  
                    this.props.dispatch(routerRedux.push(`/technology/goodsPrintList?${val}`));
            }else{
                message.warning('请输入查询条件');
            }

     }
    }); 

  }


 render() {
     const { getFieldDecorator } = this.props.form;
    //  let { data } =this.props.goodsDetail;
        //  const goodsdetails=data[0];
        //  console.log(this.props.technology)
    const goodsdetails2=this.props.technology&&this.props.technology.detailData&&this.props.technology.detailData[0]?this.props.technology.detailData[0]:[];   
        //  console.log(goodsdetails2)
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
            <div className="technology_dynamic_Topimg"></div>
            <div className={COA_Content}>
                <Form onSubmit={this.handleSearch}>
                   <p>COA报告查询（产品检验报告）</p>
                    <Row>
                        <Col span={8}>
                            <FormItem
                                 {...formItemLayout}
                                label="产品编号"
                            >
                                {getFieldDecorator('productNumber',{setFieldsValue: productNumber,initialValue:this.state.productNumber })(
                                <Input  
                                   placeholder="产品编号"
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
            <MSDSPrintFrom></MSDSPrintFrom>
        </div>
        
      
    </div>

  );
 }
}

export default connect(({technology,goodsDetail, app}) => ({technology,goodsDetail, app}), (dispatch, own) => {
 return {dispatch, own}
})(Form.create()(GoosCMSPrint));
