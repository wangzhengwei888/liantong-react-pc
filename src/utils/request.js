import fetch from 'dva/fetch';
import qs from 'qs';
import { getFullUrl,setCookie,getCookie } from './common';
// import Login from "../components/GoLogin/Login";
import { Modal,Form } from 'antd';
const FormItem = Form.Item;


function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}


/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
//let num=1;
export  async function request(requestUrl, options) {
  //let num=1;
  const url = getFullUrl(requestUrl);
  const response = await fetch(url, options);
  checkStatus(response);
  const data = await response.json();
  //console.log(data);
  if (data.result == 0) {
    if (data.code == '99' || data.msg.includes('您尚未登录或登录时间过长,请重新登录!')) {
      localStorage.removeItem('token');
      localStorage.removeItem('userName');
      localStorage.removeItem('_cartnum');
      Modal.confirm({
        title:'重新登录',
        content:data.msg,
        okText: '登录',
        cancelText:"取消",
        onOk() {
          // handleSubmit()
          window.location.href='/login';
        },
        onCancel(){
          window.location.href='/';
        }
      });
    } else {
      return ( data );
    }
  }
  return ( data );
}

export  function post(url,values,json) {

  const token = localStorage.getItem('token');

  //token放在请求头
  let headers = null;
  if(json){
    headers = {'Content-Type':'application/json;charset=UTF-8'};
    if (token) {
      headers['token'] = token;
    }
    return request(url, {
      method: 'POST',
      headers,
      credentials: 'include',
      body: JSON.stringify(values)
    });
  }else{
    headers = {'Content-Type': 'application/x-www-form-urlencoded'};
    if (token) {
      headers['token'] = token;
    }
    return request(url, {
      method: 'POST',
      headers,
      credentials: 'include',
      body: qs.stringify(values)
    });
  }

}

export function get(url, params) {
  const baseParams = {
  };

  params = {
    ...baseParams,
    ...params
  };


  //token放在请求头
  const token = localStorage.getItem('token');
  if (params) {
    url = url + "?" + qs.stringify(params)+'&timestringout='+Math.floor(Math.random()*100000);
  };
  let headers = {'Content-Type': 'application/x-www-form-urlencoded'}
  if (token) {
    headers['token'] = token;
  }
  return request(url, {
    credentials: 'include',
    headers,
    method: 'GET',
  })
}

export function del(url, params) {
  const baseParams = {
  };

  // params = {
  //   ...baseParams,
  //   ...params
  // };
  //url = getFullUrl(url);
  //console.log(params);
  if (params) {
    url = url + "/" + params;
  };

  const token = localStorage.getItem('token');
  let headers = {
  };
  if (token) {
    headers['token'] = token;
  }
  return request(url, {
    headers,
    credentials: 'include',
    method: 'DELETE',
    // credentials: 'include',
  })
}

export  function put(url,values) {

  return request(url, {
    method: 'PUT',
    // mode:'cors',
    headers : {
      "Content-Type": "application/x-www-form-urlencoded"
      // 'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: qs.stringify(values)
  });
}


// 获取token
export function getToken() {
  return localStorage.getItem('token');
}


/**
 * 是否登录
 */
export function isLogin() {
  const token = getToken();
  if (!token || token == '') {
    return false;
  }
  return true;
}
/**
 * 去登录
 * @param {登录成功后返回的页面} callBack
 */
export function gotoLogin(callBack) {
  if (callBack) {
    window.location.href = `login#/?callBack=${callBack}`;
  } else {
    window.location.href = 'login';
  }
}

/**
 * 去登录回调
 */
export function gotoLoginAndBack() {
  // 获取当前URL,作为登录回调
  const currentUrl = window.location.href;
  gotoLogin(encodeURIComponent(currentUrl));
}

/**
 * 检查登录
 * @param {登录成功后返回的页面} callBack
 */
export function checkLogin(callBack) {
  if (isLogin()) {
    // 获取当前URL,作为登录回调
    const currentUrl = callBack || window.location.href;
    gotoLogin(encodeURIComponent(currentUrl));
  }
}

export function upload(requestUrl, file) {
  const baseParams = {
  }
  const token = localStorage.getItem('token');
  let formData = new FormData();
  // if (Array.isArray(data.images)) {
  //   data.images.forEach(function(element) {
  //     formData.append('images', element);
  //   });
  // } else {
  //   formData.append('images', data.images)
  // }
  formData.append('images', file);
  let url = getFullUrl(requestUrl);
  let headers = {}
  if (token) {
    headers['token'] = token;
  }
  return fetch(url, {
    method: 'POST',
    headers,
    credentials: 'include',
    body: formData
  }).then(checkStatus).then((r)=>{
    const data=JSON.parse(r);
    return {
      data: {
        link: data.data
      }
    }

  });

  // return {
  //   data: {
  //     link: '/uploads/' + response.data
  //   }
  // }

  // return fetch(url, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/x-www-form-urlencoded"
  //   },
  //   credentials: 'include',
  //   body: qs.stringify(params),
  // }).then(checkStatus).then(parseJSON);
}


