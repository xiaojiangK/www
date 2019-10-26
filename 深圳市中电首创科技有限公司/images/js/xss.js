// JavaScript Document
var keywordBlackList = [
  'display: block; visibility: visible; overflow: hidden;',
  'gototu',
  'i.liuyanghouse.com',
  'BAIDU_SSP__wrapper',
  'BAIDU_DSPUI_FLOWBAR'
];
// JavaScript Document
var keywordWhiteList=[
	'kf.qycn.com'
];
//拒绝任何重写
var noWriteUser=[
	'yhps2608'
];

resetDocumentWrite(window);
/**
 * 重写单个 window 窗口的 document.write 属性
 * @param  {[BOM]} window [浏览器window对象]
 * @return {[type]}       [description]
 */
function resetDocumentWrite(window) {
  var old_write = window.document.write;
 
  window.document.write = function(string) {
    if ((blackListMatch(keywordBlackList, string) || blackListMatch(noWriteUser,user_name)) && !blackListMatch(keywordWhiteList,string)) {
      console.log('拦截可疑模块:', string);
      return;
    }
 
    // 调用原始接口
    old_write.apply(document, arguments);
  }
}
 
/**
 * [黑名单匹配]
 * @param  {[Array]} blackList [黑名单]
 * @param  {[String]} value    [需要验证的字符串]
 * @return {[Boolean]}         [false -- 验证不通过，true -- 验证通过]
 */
function blackListMatch(blackList, value) {
  var length = blackList.length,
    i = 0;
 
  for (; i < length; i++) {
    // 建立黑名单正则
    var reg = new RegExp(blackList[i], 'i');
 
    // 存在黑名单中，拦截
    if (reg.test(value)) {
      return true;
    }
  }
  return false;
}

setInterval(function(){
	$('iframe[src*="gototu.com"]').parent().parent().remove();
	$('iframe[src*="liuyanghouse.com"]').remove();
},200);



