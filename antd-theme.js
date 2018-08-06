/*
* @Author: pengzhen
* @Date:   2016-11-15 16:04:45
* @Desc: this_is_desc
* @Last Modified by:   pengzhen
* @Last Modified time: 2016-11-15 17:42:33
*/

'use strict';
module.exports = function(){
    return {
        // Color
        "@primary-color"          : "#3497ce",
        "@info-color"             : "#fb5210",
        "@success-color"          : "#87d068",
        "@error-color"            : "#f50",
        "@highlight-color"        : "#f50",
        "@warning-color"          : "#fa0",
        "@normal-color"           : "#d9d9d9",

        // ------ Base & Require ------
        "@text-color"             : "#666",
        "@heading-color"          : "#404040",
        "@text-color-secondary"   : "#999",
        "@font-size-base"         : "14px",
        "@font-size-lg"           : "@font-size-base + 2px",
        "@line-height-base"       : "1.5",
       // "@border-radius-base"     : "3px",
       // "@border-radius-sm"       : "1px",

        // ICONFONT
        "@iconfont-css-prefix"    : "anticon",
        // LINK
        "@link-color"             : "#666666",
        "@link-hover-color"       : "#0194D9",
        "@link-active-color"      : "shade(@link-color, 5%)",
        "@link-hover-decoration"  : "none",

        // Border color
        "@border-color-base"      : "#ff6100",        // base border outline a component
        "@border-color-split"     : "#ff6700",        // split border inside a component

        // Background color
        "@background-color-base"  : "#f7f7f7",

        "@btn-padding-base"       : "4px 15px",
        "@btn-padding-lg"         : "4px 15px 5px 15px",
        "@btn-padding-sm"         : "1px 7px",
        "@btn-circle-size"        : "28px",
        "@btn-circle-size-lg"     : "32px",
        "@btn-circle-size-sm"     : "22px",


        // Form
        // ---
        "@label-required-color"        : "@highlight-color",
        "@label-color"                 : "@text-color",
        "@form-item-margin-bottom"     : "24px",

        // Input
        // ---
        "@input-height-base"           : "28px",
        "@input-height-lg"             : "32px",
        "@input-height-sm"             : "22px",
        "@input-padding-horizontal"    : "7px",
        "@input-padding-vertical-base" : "4px",
        "@input-padding-vertical-sm"   : "1px",
        "@input-padding-vertical-lg"   : "6px",
        "@input-placeholder-color"     : "#ccc",
        "@input-color"                 : "@text-color",
        "@input-border-color"          : "@border-color-base",
        "@input-bg"                    : "#fff",
        "@input-hover-border-color"    : "@primary-color",
        "@input-disabled-bg"           : "@background-color-base",
        "@icon-url": '"./fonts/iconfont/iconfont"',                     //C:\Users\MACHENIKE\Desktop\dva\node_modules\antd\lib\style\core\fonts\iconfont
    }
}
