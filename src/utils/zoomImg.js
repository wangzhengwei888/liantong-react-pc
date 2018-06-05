/**
 * Created by leimingtech-lhm on 2017/8/10.
 */

function getStyle(obj, attr)
{
  if(obj.currentStyle)
  {
    return obj.currentStyle[attr];
  }
  else
  {
    return getComputedStyle(obj,false)[attr];
  }
}

function getPos(ele){
  let top=ele.offsetTop;
  let left=ele.offsetLeft;
  let offsetEle=ele.offsetParent;
  while(offsetEle){
    top+=offsetEle.offsetTop;
    let bTOPWidth=0;
    if( bTOPWidth=parseInt(getStyle(offsetEle,'borderTopWidth'))){
      top+=bTOPWidth;
    }

    left+=offsetEle.offsetLeft;
    let bLeftWidth=0;
    if( bLeftWidth=parseInt(getStyle(offsetEle,'borderLeftWidth'))){
      left+=bLeftWidth;
    }
    offsetEle=offsetEle.offsetParent;
  }
  let o={};
  o.x=left;
  o.y=top;
  return o;
}

//放大镜效果
export function zoomImg() {
  let showBox = document.getElementById("show_box");  //展示的容器
  let moveBox = document.getElementById("move_box");  //放大区域
  let imgBox = document.getElementById("img_box");    //放大显示区域
  let bigImg = document.getElementById("bigImg");     //放大后的图片

  showBox.onmouseout = function () {      //鼠标移开box不显示大图片和选框
    imgBox.style.display = "none";
    moveBox.style.visibility = "hidden";
  }

  showBox.onmouseover = function () {    //鼠标移开box不显示大图片和选框
    imgBox.style.display = "block";
    moveBox.style.visibility = "visible";
  }

  showBox.onmousemove = function (ev) {//获取鼠标位置
    var e = ev || window.event


    let x = e.clientX;//鼠标相对于视口的位置
    let y = e.clientY;

                   //scrollLeft和scrollTop
    let scrollTop= document.body.scrollTop||document.documentElement.scrollTop;
    let scrollLeft= document.body.scrollLeft||document.documentElement.scrollLeft;
    let top = getPos(showBox).y -scrollTop;   //box相对于视口的位置
    let left = getPos(showBox).x-scrollLeft;
    let _left = x - left - moveBox.offsetWidth /2;//计算move的位置
    let _top = y - top - moveBox.offsetHeight / 2;

   // console.log(y,top);
    if (_top <= 0){    //滑到box的最顶部
      _top = 0;
    } else if (_top >= showBox.offsetHeight - moveBox.offsetHeight){  //滑到box的最底部
      _top = showBox.offsetHeight - moveBox.offsetHeight;
    }

    if (_left <= 0){    //滑到box的最左边
      _left = 0;
    } else if (_left >= showBox.offsetWidth - moveBox.offsetWidth){     //滑到box的最右边
      _left = showBox.offsetWidth - moveBox.offsetWidth;
    }



    moveBox.style.top = _top + "px";//设置move的位置
    moveBox.style.left = _left + "px";

    let w = _left / (showBox.offsetWidth - moveBox.offsetWidth);//计算移动的比例
    let h = _top / (showBox.offsetHeight - moveBox.offsetHeight);
    let bigImg_top = (bigImg.offsetHeight - imgBox.offsetHeight) * h;//计算大图的位置
    let bigImg_left = (bigImg.offsetWidth - imgBox.offsetWidth) * w;
    bigImg.style.top = -bigImg_top + "px";//设置大图的位置信息
    bigImg.style.left = -bigImg_left + "px";
  }

}
