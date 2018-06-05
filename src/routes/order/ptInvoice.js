import React , { Component } from 'react';
import { Form, Input, Button, message,Select,Checkbox,Modal,Tabs,Cascader,Radio  } from 'antd';
import { invoice } from './order.less'
import { addInvoice} from './orderApi';
import { connect } from 'dva';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;



class PtInvoice extends Component{
  constructor(props){
    super(props)
    this.state = {
      addBusinv:false,
      edit:false,
      hasInv:false,
      activeKey:1,
      invTitleKey:0,
      invContent:1,
      invTitle:'个人'
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.props.form)
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.onCancel()
      }
    });
  }
  onClose = () => {
    console.log("aa")
    this.props.onCancel()
  }
  onChangeInvTitle = (e) => {
    let num = e.target.parentNode.nextSibling.children[0].id;
    const val=document.getElementById(num).value;
    console.log(val)
    this.setState({
      invTitleKey:num,
      invTitle:val,
      addBusinv:false
    })
    console.log()
    // 同步到redux order页面
    this.props.dispatch({
      type: 'order/invoiceChange',
      payload: {
        ...this.props.order.invoiceList,
        invTitle: val
      }
    })
  }
  onAddbusinv = () => {
    this.setState({
      addBusinv:!this.state.addBusinv,
      invTitleKey:-1
    })
  }
  edit = (e) => {
    console.log(e.target)
    this.setState({
      edit:!this.state.edit
    })
    e.target.previousSibling.style.zIndex = 150;
    if(this.state.edit){
      e.target.previousSibling.readOnly=true;
      console.log("baocun")
    }else{
      e.target.previousSibling.readOnly=false;
    }

  }

  del =() => {
    console.log("del")
  }

  addSave = (e) =>{
    if(!e.target.previousSibling.value){
      message.error('输入不能为空');
      return
    }else{
      this.setState({
        addBusinv:!this.state.addBusinv
      })
      e.target.previousSibling.style.zIndex = 50;
      this.props.changeInvoice({ invTitle:e.target.previousSibling.value, invContent:1, invState:1 });
      //console.log("addSave")
    }
  }

  cancel = () => {
    this.setState({
      addBusinv:!this.state.addBusinv
    })
  }
  noInv = () => {
    this.setState({
      hasInv:false,
      invContent:1
    })
    // 同步到redux order页面
    this.props.dispatch({
      type: 'order/invoiceChange',
      payload: {
        ...this.props.order.invoiceList,
        invContent: 1
      }
    })
  }
  hasInv = () => {
    this.setState({
      hasInv:true,
      invContent:2
    })
    // 同步到redux order页面
    this.props.dispatch({
      type: 'order/invoiceChange',
      payload: {
        ...this.props.order.invoiceList,
        invContent: 2
      }
    })
  }
  /*保存发票信息*/
  onSaveInvoic = () => {
//console.log(this.props.invState)
   // console.log(this.props)
    //invTitle,invContent,invState
        addInvoice( this.state.invTitle,this.state.invContent,this.props.invState).then(result => {
     if (result.result == 1) {
     console.log(result.result)
     //新增成功，回订单确认页面
       const invId = result.data[0].invId;
     console.log(invId)
       this.props.dispatch({
         type: 'order/invoiceChange',
         payload: {
           ...this.props.order.invoiceList,
           invId: invId
         }
       })
       //debugger
    /* this.setState({

     })*/
     message.success(result.msg);
      // this.props.onCancel();
     } else {
     message.error(result.msg);
     }
     });

  }
  render(){
    const { getFieldDecorator } = this.props.form;
    const { invoiceList1 } =this.props;
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
    return(
      <div className='pt_inv'>
        <Form onSubmit={this.handleSubmit}>
          <FormItem>
            <div className='inv_title'>

              <FormItem
                {...formItemLayout}
                label="发票抬头"
                hasFeedback
                style={{marginBottom:'0px'}}
              >
                {getFieldDecorator('invTitle',{initialValue:'0'})(
                  <RadioGroup size="large">
                    <RadioButton value="0" onClick={this.onChangeInvTitle}>
                      <Input className={this.state.invTitleKey == 0 ? "actived" : ''} id='0' type='text' value='个人' readOnly />
                    </RadioButton>
                    {
                      invoiceList1.map((v,i,a)=>(
                        <RadioButton value={i+1} onClick={this.onChangeInvTitle} className='bus_inv' key={i+1}>
                          {/*<p  className='bus_inv'>*/}
                          <Input type='text' id={i+1} defaultValue={v.invTitle} readOnly className={this.state.invTitleKey == (i+1) ? "actived" : ''}/>
                          <span className='edit' onClick={this.edit}>{this.state.edit ? "保存" : "编辑"}</span>
                          <span className='del' onClick={this.del}>删除</span>
                          {/*</p>*/}
                        </RadioButton>
                      ))
                    }

                  </RadioGroup>
                )}
              </FormItem>

              <div className={this.state.addBusinv ? 'addInv_inp' : 'addInv_inp hide'}>
                <Input type='text' className="actived" placeholder='新增单位发票抬头'/>
                <span className='conserve' onClick={this.addSave}>保存</span>
                <span className='cancel' onClick={this.cancel}>取消</span>
              </div>

              <div className={this.state.addBusinv ? 'addInv_btn hide' : 'addInv_btn'} onClick={this.onAddbusinv} >新增单位发票</div>

            </div>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="发票内容"
            hasFeedback
          >
            {getFieldDecorator('invContent',{initialValue:'a'})(
              <RadioGroup size="large">
                <RadioButton value="a" className={this.state.hasInv ? "no_inv" : "no_inv actived"} onClick={this.noInv}>不开发票</RadioButton>
                <RadioButton value="b" className={this.state.hasInv ? "mx_inv actived" : "mx_inv"} onClick={this.hasInv}>明细</RadioButton>
              </RadioGroup>
            )}
          </FormItem>
          <FormItem style={{textAlign:"center"}}>
            <Button htmlType="reset" style={{marginRight:"10px"}} onClick={this.onClose}>取消</Button>
            {/*<Button htmlType="submit">保存发票信息</Button>*/}
            <Button onClick={()=>this.onSaveInvoic()}>保存发票信息</Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}

// export default (Form.create()(PtInvoice));
export default Form.create()(PtInvoice);
