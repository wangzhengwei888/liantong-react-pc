import React , { Component } from 'react';
import { connect } from 'dva';
import { Form, Radio, Icon, Input, Upload, Row, Button, Col  } from 'antd';
import { routerRedux,Link} from 'dva/router';
import PropTypes from 'prop-types';
import CircleSearch from '../../components/circleSearch/circleSearch';

import { Editor } from 'react-draft-wysiwyg';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import Img from '../../components/Img/Img';
import { addteizi_all } from './addteizi.less';

import { upload } from '../../utils/request';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { TextArea } = Input;

class AddTeiZi extends Component {
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

  uploadImageCallBack=(file)=>{
    console.log(file);
    return upload('/memberApi/memberFilesUpload',file);
  }

  render() {

    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      //labelCol: { span: 6 },
      wrapperCol: { span: 18, offset: 3 },
    };

    return (

      <div>
        <div><CircleSearch></CircleSearch></div>
        <div className={ addteizi_all }>
          <Row className='addteizi_body'>
            <Col span={19}>
              <Form style={{ paddingTop: '20px' }} onSubmit={this.handleSubmit}>

              <FormItem {...formItemLayout} label="">
                {getFieldDecorator('username', {
                  rules: [{
                    required: true,
                    message: '请输入您的标题',
                  }],
                })(
                  <Input className='addteizi_input'  placeholder="请输入您的标题" />
                )}
              </FormItem>

                <Editor
                  wrapperClassName="demo-wrapper"
                  editorClassName="demo-editor"
                  toolbar={{
                    image: { uploadCallback: this.uploadImageCallBack, alt: { present: true, mandatory: true } },
                  }}
                  localization={{
                    locale: 'zh',
                  }}
                />

              <FormItem
                wrapperCol={{ span: 4, offset: 18 }}
              >
                <Button style={{ marginTop:'20px', padding:'4px 30px' }} type="primary" htmlType="submit">提交</Button>
              </FormItem>
            </Form>
            </Col>
            <Col span={5}>
              <div className="add_extra_info_title">发布说明：</div>
              <div className="add_extra_info">
                选择“商品/店铺”可以使用商品链接、店铺链接或者收藏商品、
                店铺发布到帖子中，商品/店铺信息会在帖子内容下方显示，
                所有用户均可以打开对应的商品/店铺信息，每次发帖商品、店铺链接总数不超过7个。
              </div>
            </Col>
          </Row>



        </div>

      </div>

    );
  }
}


export default connect(({addcircle})=>({addcircle}),(dispatch,own)=>{return {dispatch,own}})(Form.create()(AddTeiZi));
