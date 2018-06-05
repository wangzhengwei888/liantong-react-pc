import React , { Component } from 'react';
import { connect } from 'dva';
import { Form, Radio, Icon, Input, Upload, Checkbox, Button  } from 'antd';
import { routerRedux,Link} from 'dva/router';
import PropTypes from 'prop-types';
import CircleSearch from '../../components/circleSearch/circleSearch';

import Img from '../../components/Img/Img';

import { user_agreement } from './agreeUseCircle.less';


class AgreeUseCircle extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }



  render() {

    return (

      <div className={ user_agreement }>
        <div><CircleSearch></CircleSearch></div>
        <div className="user_agreement_box">
          <h2>圈子使用须知</h2>
          <h5>2015-10-18 12:15:58</h5>
          <div className="agree_text">
              <p>请您仔细阅读本须知的全部内容（特别是以<strong><span style={{textDecoration:'underline'}}>粗体下划线</span></strong>标注的内容）。如果您不同意本须知的任意内容，您应当停止使用本产品。</p><p>
              1、“圈子”是本公司开设的一个供商城用户（以下简称“用户”或“您”）交流购物体验等信息的网络社区。<strong><span style={{textDecoration:'underline'}}>您使用“圈子”产品需遵守本须知，并遵守本公司公布的操作流程和规则。</span></strong></p><p>
              2、“圈子”产品的功能和产品提供方式由本公司自行决定，后续本公司可能调整产品名称和产品运行的域名等。<strong><span style={{textDecoration:'underline'}}>本须知适用于“圈子”产品的调整、改进版本和附加功能。</span></strong></p><p>
              3、您可以通过本产品创建网络关系圈子，其他感兴趣的用户可以加入您创建的圈子。您应当遵守任何适用的法律之规定，并自觉尊重和维护其他参与者的合法权利。您不得以任何形式开展违法活动、侵犯他人合法权益、损害本公司或其他公司的合法利益，否则您需为此自行承担法律责任。<strong><span style={{textDecoration:'underline'}}>您同意本公司无需为产品使用者的违法或侵权等行为承担任何责任。</span></strong></p><p>
              4、您同意并保证通过本产品上传、发布的文字、图片等全部信息素材符合相关法律的规定。您保证素材内容以及素材所含链接指向的内容的合法性和正当性，不侵犯他人的肖像权、名誉权、知识产权、隐私权等合法权益，也不会侵犯法人或其他团体的商业秘密等合法权益。</p><p>
              5、<strong><span style={{textDecoration:'underline'}}>您使用本产品可能需要提供关于您的个人资料、肖像、联系方式等个人信息。您了解并同意，在使用本产品过程中关于您的个人信息可能会通过网络等渠道进行传播。</span></strong></p><p>
              6、您通过本产品上传、发布素材，即意味着<strong><span style={{textDecoration:'underline'}}>您同意向本公司提供免费的、永久性的、不可撤销的权利和许可，使本公司可以在全球范围内复制、发行、展示、演绎和通过信息网络等渠道使用您上传的素材和信息</span></strong>，例如将您提供的图片发布于活动页面或平面媒体中。</p><p>
              7、本公司无法事先了解您上传素材的真实性和合法性。如您上传的素材被发现不适宜展示或遭受他人举报或投诉的，本公司有权立即删除或进行屏蔽从而停止该素材的继续传播。<strong><span style={{textDecoration:'underline'}}>如果您违反本须知的内容、有关协议或规则等的，本公司有权删除相关素材并有权拒绝您继续使用产品，届时您无权要求本公司进行补偿或赔偿。</span></strong></p><p>
              8、您使用本产品应同时遵守《用户服务协议》、本公司公布的各项规则以及本公司发布的关于本产品的特别规则和制度。</p><p>
              9、第三方可能通过分公司其他产品或本产品知悉并使用您上传的素材、个人信息或进而侵犯您的合法权利。<strong><span style={{textDecoration:'underline'}}>本公司提醒您注意和谨防网络诈骗以及其他可能对您不利的行动和信息，但本公司对第三方的侵权、违法等行为不承担赔偿等法律责任。</span></strong>您承诺合法使用并善待其他用户上传的素材和信息。</p><p>
              10、您应自行对上传的素材进行备份。本公司可能按照本须知删除或屏蔽素材，相关系统亦可能遭受网络攻击或网络故障，类似或其他情况均可能使您上传的素材丢失或故障，对此本公司将尽力避免但不做任何保证。</p><p>
              11、<strong><span style={{textDecoration:'underline'}}>如您因使用本产品与本公司发生纠纷的，您同意由本公司住所地人民法院管辖审理。</span></strong> </p><p>
              12、<strong><span style={{textDecoration:'underline'}}>本公司有权更新、修改本须知以及有关规则、流程等相关文件的内容，本公司在法律允许的范围内负责对本须知进行说明和解释</span></strong>。如您对修改存有异议，您有权选择不再继续使用本产品，但您在此前的行为仍受本须知以及相关文件最新的修改版本的约束。</p>
          </div>
        </div>
      </div>

    );
  }
}


export default connect(({addcircle})=>({addcircle}),(dispatch,own)=>{return {dispatch,own}})(AgreeUseCircle);
