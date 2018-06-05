import { message } from 'antd'
import { routerRedux } from 'dva/router';
import { getSecurityInfoAPI,unboundEmialAPI,checkAPI,depositAPI,unboundPhoneAPI,modifyPasswordAPI, bindingEmailAPI,  bindingPhoneAPI,checkMobileAPI,unEmailAPI, getEmailValidateCodeAPI } from './securityApi'

export default {
  namespace: 'security',
  state: {
   total:0,
   pageNo:0,
   pageSize:0
  },
  effects: {
    //获得安全信息
    *getSecurityInfoEFF({}, {put, call}){
      const data=yield call( getSecurityInfoAPI )
     //console.log(data)
      if(data.result==1) {
        yield put({type: 'getSecurityInfo', data})
      }else{
        message.error(data.msg,1.5,()=>{})
      }
    },
    //修改密码
    *modifyPasswordEFF({password}, {put, call}){
      const data=yield call( modifyPasswordAPI, password )
      if(data.result==1) {
       message.success(data.msg,1.5,()=>{})
       yield put(routerRedux.push({
        pathname:'/presonAccount/presonAccount'
       }))
      }else{
        message.error(data.msg,1.5,()=>{})
      }
    },
    // 获取邮箱验证码
    *getEmailValidateCodeEFF({val}, {put, call}){
     console.log(val)
      const data=yield call( getEmailValidateCodeAPI, {val} )
      if(data.result==1) {
        message.success(data.msg,1.5,()=>{})
      }else{
        message.error(data.msg,1.5,()=>{})
      }
    },
    //绑定邮箱
    *bindingEmailEFF({forminfo}, {put, call}){
      const data=yield call( bindingEmailAPI, forminfo )
      if(data.result==1) {
        yield put({ type: 'setEmail', email:data.data[0].memberEmail })
       message.success('绑定成功',1.5,()=>{})
       yield put(routerRedux.replace({pathname:'/presonAccount/presonAccount/emailSuccess'}))
      }else{
        message.error(data.msg,1.5,()=>{})
      }
    },
    //绑定手机
    *bindingPhoneEFF({forminfo}, {put, call}){
      const data=yield call( bindingPhoneAPI, forminfo )
    // console.log(data)
      if(data.result==1) {
       yield put({ type: 'setPhone', phone:data.data[0].memberMobile })
       message.success('绑定成功，请去重新登录',1.5,()=>{})
       yield put(routerRedux.replace({pathname:'/login'}))

      }else{
        message.error(data.msg,1.5,()=>{})
      }
    },
   //效验手机已绑定的手机验证码（解绑前）
   *checkMobileCodeEEF({values},{put,call}){
     console.log(values)
    const data=yield call(checkAPI,values )
    if(data.result==1) {
     // console.log(data.data[0].memberMobile )
     message.success(data.msg,1.5,()=>{})

     yield put(routerRedux.replace({pathname:'/presonAccount/presonAccount/bindingPhone'}))
    }else{
     message.error(data.msg,1.5,()=>{})
    }
   },
   //预存款信息
   *depositEFF({val}, {put, call}){
    //console.log(val)
    const data=yield call(depositAPI,val)
    if(data.result==1) {
     yield put({ type: 'setInfor',data})
    }else{
     message.error(data.msg,1.5,()=>{})
    }
   },

   //验证手机-邮箱唯一性
   // *checkUniqueEFF({values},{putc,call}){
   //  const data=yield call( checkMobileAPI, values )
   //  console.log(values)
   //  if(data.result==1) {
   //   yield put({ type: 'setRight', smg:'123' })
   //  }else{
   //   message.error(data.msg,1.5,()=>{})
   //  }
   // },
    //解绑邮箱
    *unboundEmailEFF({code}, {put, call, select}){
      const email = yield select(state => state.security.data.data[0].memberEmail)
      let obj = {
       memberEmail:email,
       emailCode: code
      }
      const data=yield call( unEmailAPI, obj)
      if(data.result==1) {
       message.success(data.msg,1.5,()=>{})
       yield put(routerRedux.replace({
        pathname:'/presonAccount/presonAccount'}))
      // yield put({ type: 'setEmail', email:'' })

      }else{
        message.error(data.msg,1.5,()=>{})
      }
    },
    //解绑手机
    *unboundPhoneEFF({code}, {put, call, select}){
      const phone = yield select(state => state.security.data.data[0].memberMobile)
      let obj = {
       memberMobile: phone,
       mobileCode: code
      }
      const data = yield call( unboundPhoneAPI, obj )
      if(data.result==1) {
        message.seccess(data.msg,1.5,()=>{})
        yield put(routerRedux.push({
         pathname:'/presonAccount/presonAccount'
        }))
      }else{
       console.log(111)
        message.error(data.msg,1.5,()=>{})
      }
    }
  },
  subscriptions: {
    setup({ dispatch, history }){
      return history.listen(({ pathname, query }) => {
        if(pathname == '/presonAccount/presonAccount'){
           dispatch({ type: 'getSecurityInfoEFF' })
        }else if(pathname == '/presonAccount/presonAccount/bindingEmail'){
          dispatch({ type: 'setCategory', category: 'email' })
        }else if(pathname == '/presonAccount/presonAccount/bindingPhone'){
          dispatch({ type: 'setCategory', category: 'phone' })
        }else if(pathname == '/presonAccount/presonAccount/removeEmail'){
         dispatch({ type: 'setCategory', category: 'email' })
         dispatch({ type: 'getSecurityInfoEFF' })
        }else if(pathname == '/presonAccount/presonAccount/removePhone'){
         dispatch({ type: 'setCategory', category: 'phone' })
         dispatch({ type: 'getSecurityInfoEFF' })
        }else if(pathname == '/presonAccount/deposit'){
         dispatch({ type: 'depositEFF' })
         // dispatch({ type: 'setInfor',category:'data' })
        }else if(pathname == '/presonAccunt/myAccount'){
         dispatch({ type: 'getSecurityInfoEFF' })
         dispatch({ type: 'getSecurityInfo',category:'data' })
        }
      })
    }
  },
  reducers: {
    getSecurityInfo(state, {data}){
          return {
        ...state,
        data
      }
    },
   setInfor(state, {data}){
    console.log(data)
    return {
     ...state,
     data,
     total:data.count ? data.count : 0,
     pageNo:data.pageNo ? data.pageNo : 0,
     pageSize:data.pageSize ? data.pageSize : 0
    }
   },
    setEmail(state, {email}){
     let newdata = state.data
     console.log(state)
     newdata.data[0].memberEmail = email
      return {
        ...state,
        data:{...newdata}
      }
    },
    setPhone(state, {phone}){
      return {
        ...state,
        data:[{...state.data[0],phone}]
      }
    },
    setCategory(state, {category}){
      return {
        ...state,
        category
      }
    }
  }
}
