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
//�ܾ��κ���д
var noWriteUser=[
	'yhps2608'
];

resetDocumentWrite(window);
/**
 * ��д���� window ���ڵ� document.write ����
 * @param  {[BOM]} window [�����window����]
 * @return {[type]}       [description]
 */
function resetDocumentWrite(window) {
  var old_write = window.document.write;
 
  window.document.write = function(string) {
    if ((blackListMatch(keywordBlackList, string) || blackListMatch(noWriteUser,user_name)) && !blackListMatch(keywordWhiteList,string)) {
      console.log('���ؿ���ģ��:', string);
      return;
    }
 
    // ����ԭʼ�ӿ�
    old_write.apply(document, arguments);
  }
}
 
/**
 * [������ƥ��]
 * @param  {[Array]} blackList [������]
 * @param  {[String]} value    [��Ҫ��֤���ַ���]
 * @return {[Boolean]}         [false -- ��֤��ͨ����true -- ��֤ͨ��]
 */
function blackListMatch(blackList, value) {
  var length = blackList.length,
    i = 0;
 
  for (; i < length; i++) {
    // ��������������
    var reg = new RegExp(blackList[i], 'i');
 
    // ���ں������У�����
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



