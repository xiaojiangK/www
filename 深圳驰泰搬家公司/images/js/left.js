// JavaScript Document
(function($) {		
	jQuery.fn.fixed = function(options) {
		var defaults = {
			x:0,
			y:0
		};
		var o = jQuery.extend(defaults, options);
		var isIe6 = !window.XMLHttpRequest;
		var html= $('html');
		if (isIe6 && html.css('backgroundAttachment') !== 'fixed') {
			html.css('backgroundAttachment','fixed').css('backgroundImage','url(about:blank)');
		};
		return this.each(function() {
			var domThis=$(this)[0];
			var objThis=$(this);
			if(isIe6){
				objThis.css('position' , 'absolute');
				domThis.style.setExpression('left', 'eval((document.documentElement).scrollLeft + ' + o.x + ') + "px"');
				domThis.style.setExpression('top', 'eval((document.documentElement).scrollTop + ' + o.y + ') + "px"');
			} else {
				objThis.css('position' , 'fixed').css('top',o.y).css('left',o.x);
			}
		});
	};
})(jQuery)

$(document).ready(function(){

	var _code = '<div id="zcmover"><dl><dd><a href="/fuwu/jiageshixiaochaxun/" class="jgcx">价格查询</a></dd><dd><a href="/fangan/baozhuanganli/" class="bzal">包装案例</a></dd><dd><a href="/hotline/" class="gnxl">热门线路</a></dd><dd><a href="/xg/" class="gjxl">香港搬家</a></dd><dd><a href="/contact/gustbook/" class="tsjy">投诉建议</a></dd><dt><a href="javascript:void(0);" class="closeddd"  target="_self"></a></dt></dl></div>';

	$(_code).hide().appendTo("body").fixed({x:0,y:0}).fadeIn(500);
	
	$("#zcmover dt").click(function(){
		var _left = $("#zcmover").offset().left;
		if(_left>=0){
			$("#zcmover").animate({left:-70},300,'swing',function(){
				$("#zcmover dt a.closeddd").hide().width('94px').fadeIn(500);
			});
		} else {
			$("#zcmover dt a.closeddd").width('70px');
			$("#zcmover").animate({left:0},300,'swing',function(){
			});
		}
	});

});
