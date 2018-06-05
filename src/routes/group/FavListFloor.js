import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux,Link} from 'dva/router';
import { Row,Col,Menu, Dropdown,Icon,Breadcrumb,Input,Button,Checkbox,Modal} from 'antd';
import Img from '../../components/Img/Img';

const CheckboxGroup = Checkbox.Group;
const confirm = Modal.confirm;

class FavListFloor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: props.data,
      goodsData: props.data.orderItemsList,
      isCheckAll: props.isCheckAll,
      selectedRowKeys: [],
      isGivePrice: props.isGivePrice,
      // onOff: true
    }
  }
  start = () => {
    this.setState({ loading: true });
    // ajax request after empty completing
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loading: false,
      });
    }, 1000);
  }
  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }
  showConfirm = (goodsId)=> {
    const value={
      goodsId:goodsId,
      // favType:1
    }
    confirm({
      title: '您确定要删除吗?',
      content: '',
      onOk:()=> {
        console.log('OK');
        console.log(value)
        this.props.dispatch({ type:'favList/deleteGoodsFavoritesEFF', payload:value });
        this.props.dispatch({ type:'favList/goodsCollectListEFF', });
      },
      onCancel() {
        console.log('取消');
      },
    });
  }
  /*批量取消*/
  showConfirmAll = (selectedRowKeys)=> {
    const value={
      goodsId: selectedRowKeys.join(','),
      // favType:1
    }
    console.log(value)
    if(selectedRowKeys.length > 0){
      confirm({
        title: '您确定要删除吗?',
        content: '',
        onOk:()=> {
          console.log('OK');
          this.props.dispatch({ type:'favList/deleteGoodsFavoritesEFF', payload:value });
          this.props.dispatch({ type:'favList/goodsCollectListEFF', });
        },
        onCancel() {
          console.log('取消');
        },
      });
    }else{
      confirm({
        title: '请选择要删除的商品！',
        content: '',
        onOk:()=> {
          console.log('OK');
        },
        onCancel() {
          console.log('取消');
        },
      });
    }
  }
  render() {
    const data = this.state.data;
    const { loading, selectedRowKeys } = this.state;

    const hasSelected = selectedRowKeys.length > 0;
    return (
      <div>
        {this.state.goodsData.map((goods,i)=>{
          let status_deleted = goods.orderStatus == 1
            return (
              <table key={i} className="border_bottom">
                <tbody>
                  <tr>
                    <td style={{width: '4%'}}><Checkbox onChange={this.onChange} checked={goods.isChecked}></Checkbox></td>
                    <td style={{width:'36%'}} >
                      <div className="goods_div1">
                        <Img style={{width:'105px',height:'105px',margin:'2px 16px'}} src={goods.goodsImage} />
                        <div style={{margin:'18px 15px',textAlign:'left'}}>
                          <p style={{fontSize:'16px',color:'#333',lineHeight:'22px',marginBottom:'16px'}}>{goods.sellerGoodsName}</p>
                          <p>商品编号：{goods.productBuyBillQty}</p>
                          <p>品牌：{goods.productBuyBillQty}</p>
                          <p>规格：{goods.specName} </p>
                          <p>包装：{goods.goodsSpec} </p>
                          <p>储存条件：{goods.storageCondition} </p>
                        </div>
                      </div>
                    </td>
                    <td style={{width:'20%'}} >
                      <div style={{padding: '0 10px',textAlign:'left'}}>
                        <p>CAS号：{goods.productSellBillQty}</p>
                        <p>危险性质：{goods.productSellBillQty}</p>
                        <p>管制信息：<span style={{color: 'red'}}>可以省区内塞的可以省时省粮，用户高温霉菌</span></p>
                      </div>
                    </td>
                    <td style={{width:'20%'}}>
                      <p>成交价：{this.state.isGivePrice ? '￥' + goods.productSellPrice : '请询价'}</p>
                      <p>市场价：￥{goods.productSellPrice}</p>
                      {/* <p>库存：{goods.productBuyBillQty}</p> */}
                    </td>
                    <td style={{width:'20%'}} >
                      <div>
                      <Link className="icon-view-detail" title="查看详情" to={`/goodsDetail/${goods.orderItemId}`}></Link>
                      <Icon type="delete" className="icon-delete" title="删除" onClick={()=>this.showConfirm(goods.orderItemId)}/>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            )
        })}
      </div>
    )
  }
}

export default connect(({order,FavList})=>({order,FavList}),(dispatch,own)=>{return {dispatch,own}})(FavListFloor);