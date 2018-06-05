import React , { Component } from 'react';
import { connect } from 'dva';
import { Form, Radio, Icon, Input, Upload, Checkbox, Button  } from 'antd';
import { routerRedux,Link} from 'dva/router';
import PropTypes from 'prop-types';
import CircleSearch from '../../components/circleSearch/circleSearch';

import Img from '../../components/Img/Img';
import { addCircle } from './addCircle.less';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { TextArea } = Input;

class AddCircle extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  render() {

    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 10 },
    };

    return (

      <div className={ addCircle }>
        <div><CircleSearch></CircleSearch></div>
        <div className="addCircle_all">
           <div className="addCircle_top">创建我自己的圈子</div>
           <div className="addCircle_info">欢迎雷铭商城圈子这个快乐和谐的地方，聚集和你爱好相同，品位相当的好朋友，畅谈交流，分享心情，享受生活！</div>

          <Form style={{ paddingTop: '20px' }} onSubmit={this.handleSubmit}>

            <FormItem
              {...formItemLayout}
              label="所属分类"
            >
              {getFieldDecorator('radio-group')(
                <RadioGroup>
                  <Radio value="a">摄影</Radio>
                  <Radio value="b">智能</Radio>
                  <Radio value="c">娱乐</Radio>
                </RadioGroup>
              )}
            </FormItem>

            <FormItem {...formItemLayout} label="圈子名称">
              {getFieldDecorator('username', {
                rules: [{
                  max:12,
                  min:1,
                  required: true,
                  message: '请输入1~12个字符',
                }],
              })(
                <Input placeholder="圈子名称规定使用1~12个字符，确定后不可修改" />
              )}
            </FormItem>

            <FormItem {...formItemLayout} label="圈子简介">
              {getFieldDecorator('username52', {
                rules: [{
                  max:12,
                  min:1,
                  required: true,
                  message: '请输入15~255个字符',
                }],
              })(
                <TextArea rows={8} placeholder="圈子简介规定使用15~255个字符，确定后不可修改" />
              )}
            </FormItem>



            <FormItem
              {...formItemLayout}
              label="圈子图标"
            >
              <div className="dropbox">
                {getFieldDecorator('dragger', {
                  valuePropName: 'fileList',
                  getValueFromEvent: this.normFile,
                })(
                  <Upload.Dragger name="files" action="/upload.do">
                    <p className="ant-upload-drag-icon">
                      <Icon type="inbox" />
                    </p>
                    <p className="ant-upload-text">点击获赠拖拽上传</p>
                    <p className="ant-upload-hint">圈子图标最佳尺寸为100X100，确定后不可修改。</p>
                  </Upload.Dragger>
                )}
              </div>
            </FormItem>

            <FormItem
              wrapperCol={{ span: 12, offset: 6 }}
               style={{ marginBottom: 8 }}
            >
              {getFieldDecorator('agreement', {
                valuePropName: 'checked',
              })(
                <Checkbox>我已认真阅读并同意<Link to='agreeusecircle' style={{color: '#ff2000' }}>《圈子使用须知》</Link>中的所有条款</Checkbox>
              )}
            </FormItem>

            <FormItem
              wrapperCol={{ span: 10, offset: 8 }}
            >
              <Button style={{ padding:'4px 30px' }} type="primary" htmlType="submit">提交</Button>
            </FormItem>
          </Form>

        </div>

      </div>

    );
  }
}


export default connect(({addcircle})=>({addcircle}),(dispatch,own)=>{return {dispatch,own}})(Form.create()(AddCircle));
