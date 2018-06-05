import { Form, Input, Cascader, Select,DatePicker, Col,Upload,Icon,message,Modal,Button} from 'antd';
import  { getAreaData } from '../../utils/getArea';
import moment from 'moment';
// 推荐在入口文件全局设置 locale
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const FormItem = Form.Item;
import { connect } from 'dva';
const Option = Select.Option;


const  residences = getAreaData();

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

const imgList = [
  {name:"企业营业执照",required:true},
  {name:"药品经营（生产）许可证",required:true},
  {name:"GSP证书",required:true},
  {name:"法人身份证",required:false},
  {name:"法人委托书",required:false},
  {name:"组织机构代码证",required:false},
  {name:"税务登记证",required:false},
  {name:"医疗器械经营",required:false},
  {name:"食品流通许可证",required:false}
  ];
let imageUpload = imgList.map((list) => {
  return {
    imageUrl: '',
    hide:true
  }
})

class AuthenInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false,
      fileList: [{},{},{},{},{},{},{},{},{}],
      imageUpload:imageUpload,
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values)
        let list = [];
        for(let i=0; i<9; i++){
          if(values['startTime' + i+'']){
            values['startTime' + i+''] =  values['startTime' + i+''].format('YYYY-MM-DD');
            values['endTime' + i+''] = values['endTime' + i+''].format('YYYY-MM-DD');
            list.push({
              fileType:this.state.fileList[i].fileType,
              certificateCode:values['zjhm' + i +''],
              filePath:this.state.fileList[i].filePath,
              effectiveBeginDate:values['startTime' + i+''],
              effectiveEndDate:values['endTime' + i+'']
            })
          }

        }
        let val = {
          orgType:values.orgType,
          name:values.name,
          address:values.address,
          contacts:values.contacts,
          tel:values.tel,
          province:values.residence[0],
          city:values.residence[1],
          county:values.residence[2],
          licenceDate:values.licenceDate,
          code:'',
          attachmentList:list
        }
        console.log(val)
        this.props.dispatch({type:'login/authenInfoEFF',payload:val})
        e.target.style.zIndex=0;
      }
    });
  }

  componentWillReceiveProps(){
    if(this.props.login.infoUpdate){
      this.props.next();
    }

  }

  handleChange = (index,info) => {
    let fileTypeList = this.props.login.fileTypeData;
    console.log(fileTypeList)
    if (info.file.status === 'done') {
      console.log(info.file);
      if(info.file.response.result == 0){
        message.error(info.file.response.msg)
        return
      }else{
        message.success(info.file.response.msg)
      }
      let newFileList = this.state.fileList.concat();
      newFileList[index]={filePath:info.file.response.data + "/" + info.file.name ,fileType:fileTypeList[index].dictionaryCode}

      this.setState({fileList:newFileList})
      console.log(this.state.fileList);
      getBase64(info.file.originFileObj, imageUrl => {
        imageUpload[index].imageUrl = imageUrl;
        this.setState({ imageUpload })
      });
    }
  }

  onClick = (index) => {
    imageUpload[index].hide = !imageUpload[index].hide;
    this.setState({
      imageUpload
    })
  }
  onChange = (string) => {
    console.log(string.format("YYYY-MM-DD"))
  }

  render(){
    const { data }=this.props;
    const { getFieldDecorator } = this.props.form;
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


    const _this = this;
    return(
      <Form onSubmit={this.handleSubmit}>
      <div className="steps-content info1">
        <div className='info_title'>企业基本信息</div>
        <div className='info_content bus_info_content'>
          <div style={{width:'50%'}} className='float_left'>
            <FormItem
              {...formItemLayout}
              label="企业类型"
              hasFeedback
            >
              {getFieldDecorator('orgType', {
                rules: [{
                  required: true,
                }],
                initialValue:data.length > 0 ? data[0].dictionaryValue : "01"
              })(
                <Select>
                  {data.map((list,index)=>{
                    return (<Option value={list.dictionaryValue} key={index}>{list.dictionaryName}</Option>)
                  })}
                </Select>
              )}

            </FormItem>
            <FormItem
              {...formItemLayout}
              label="营业执照注册日"
              hasFeedback
            >
              {getFieldDecorator('licenceDate', {
                rules: [{
                  required: true, message: '请填写时间',
                }],
              })(
                <Input type='date'/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="企业名称"
              hasFeedback
            >
              {getFieldDecorator('name', {
                rules: [{
                  required: true, message: '请输入企业名称',
                }],
              })(
                <Input type="text"/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="联系人"
              hasFeedback
            >
              {getFieldDecorator('contacts', {
                rules: [{ required: true, message: '请输入您的姓名', whitespace: true }],
              })(
                <Input type="text"/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="手机号码"
              hasFeedback
            >
              {getFieldDecorator('tel', {
                rules: [{ required: true, message: '请填写您的手机号码'}],
              })(
                <Input type="text"/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="所属地区"
            >
              {getFieldDecorator('residence', {
                initialValue: ['11', '1101', '110101'],
                rules: [{ type: 'array', required: true, message: '请选择您所属地区' }],
              })(
                <Cascader options={residences} />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="详细街道"
              hasFeedback
            >
              {getFieldDecorator('address', {
                rules: [{ required: true, message: '请输入详细地址', whitespace: true }],
              })(
                <Input type="text"/>
              )}
            </FormItem>
          </div>
          <div className='float_right info_left_bg'>
            <img src={require('../../assets/authenleft.png')} alt=""/>
          </div>
        </div>
      </div>
      <div className="steps-content ">
        <div className='info_title qua_info'>资质信息</div>
        <div className='info_content qua_info_contnet'>
          <div className='clearfix item'>
            {imgList.map(function(list,index){
              return (
                <div className="list" key={index}>
                  <FormItem
                    label={list.name}
                  >
                    {getFieldDecorator(`img${index}`, {
                      rules: [{
                        required: list.required,
                        message: '请上传图片',
                      }],
                    })(
                      <div className="clearfix">
                        <Upload
                          className="avatar-uploader"
                          name={"images"}
                          showUploadList={false}
                          action="/front/memberApi/memberFilesUpload"
                          onChange={(info) => _this.handleChange(index,info)}
                        >
                          {
                            imageUpload[index].imageUrl ?
                              <div className='imgUpload'>
                                <img src={imageUpload[index].imageUrl} alt="" className="avatar" />
                              </div>:
                              <div className='imgUpload_bg'></div>
                          }
                        </Upload>
                      </div>
                    )}
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label="证件号码"
                    hasFeedback
                  >
                    {getFieldDecorator(`zjhm${index}`, {
                      rules: [{
                        required: list.required,
                        message: '请填写证件号码',
                      }]
                    })(
                      <Input type="text"/>
                    )}
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label="证件有效期"
                    hasFeedback
                  >
                    <Col span={11}>
                      <FormItem>
                        {getFieldDecorator(`startTime${index}`, {
                          rules: [{ required: list.required,
                            message: '请填写开始时间',
                          }]
                        })(
                          <DatePicker onChange={_this.onChange}/>
                        )}
                      </FormItem>
                    </Col>
                    <Col span={2}>
                      <p className="ant-form-split">至</p>
                    </Col>
                    <Col span={11}>
                      <FormItem>
                        {getFieldDecorator(`endTime${index}`, {
                          rules: [{ required: list.required,message: '请填写截止时间'}]
                        })(
                          <DatePicker/>
                        )}
                      </FormItem>
                    </Col>
                  </FormItem>
                  <span className='fl' onClick={() =>_this.onClick(index)}>
                    查看范例
                    <div className={_this.state.imageUpload[index].hide ? "tips hide" : "tips"}>
                      <p>注意事项：</p>
                      <div>1.企业名称需要与营业执照名称保持一致。</div>
                      <div style={{textAlign:'left'}}>2.三证合一的企业请在证照号码处填写“全国统一社会信用代码”。</div>
                      <div style={{width:'89%'}}>3.证照起止日期为必填，若为长期终止日期可不填。</div>
                    </div>
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
        <FormItem>
          <Button className='sub_btn' htmlType="submit" type="primary">提交认证资料</Button>
        </FormItem>
      </Form>
    )
  }
}


// AuthenInfo.propTypes = {
//   form: PropTypes.object,
//   regist: PropTypes.object,
//   dispatch: PropTypes.func,
// }


export default connect(({login})=>({login}),(dispatch,own)=>{return {dispatch,own}})(Form.create()(AuthenInfo));
