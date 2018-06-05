const domian = location.host + "/reagent-front";
// export const IMAGE_DOMAIN='http://192.168.1.112/';
export const IMAGE_DOMAIN='http://img.reagent.com.cn/';

export function getFullUrl(requestUrl) {
  let url = location.protocol +'//'+ domian;
  if(requestUrl.startsWith('/')){
    url = url + requestUrl;
  }else {
    url = url + '/' + requestUrl;
  }
  return url;
}

export const registerModel = (app, model) => {
  if (!(app._models.filter(m => m.namespace === model.namespace).length === 1)) {
    app.model(model);
  }
}



export  function setCookie(name,value,time) {
  var strsec = getsec(time);
  var exp = new Date();
  exp.setTime(exp.getTime() + strsec*1);
  document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}
function getsec(str) {
  var str1=str.substring(1,str.length)*1;
  var str2=str.substring(0,1);
  if (str2=="s")
  {
    return str1*1000;
  }
  else if (str2=="h")
  {
    return str1*60*60*1000;
  }
  else if (str2=="d")
  {
    return str1*24*60*60*1000;
  }
}
//这是有设定过期时间的使用示例：
//s20是代表20秒
//h是指小时，如12小时则是：h12
//d是天数，30天则：d30
//setCookie("name","hayden","s20");


export  function getCookie(c_name) {
  if (document.cookie.length>0) {
    let c_start=document.cookie.indexOf(c_name + "=")
    if (c_start!=-1) {
      c_start=c_start + c_name.length+1
      let c_end=document.cookie.indexOf(";",c_start)
      if (c_end==-1) c_end=document.cookie.length
      return unescape(document.cookie.substring(c_start,c_end))
    }
    return false
  }
  return false
}

//排序
export function compare(property){
  return function(a,b){
    var value1 = a[property];
    var value2 = b[property];
    return value1 - value2;
  }
}







