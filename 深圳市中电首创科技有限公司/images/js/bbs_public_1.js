
function maxLength(tmp_val,max){		
	var len = 0;
	var arr = tmp_val.split("");
	for (var i=0;i<arr.length;i++) {
		if (arr[i].charCodeAt(0)<299) {
			len++;
		} else {
			len+=2;
		}
	}
	if (len > (max*2)) return false; else return true;
} 

// $(".ev_community_more").click(function(){
// 	if($("#ev_community_bg").css("display") == "none"){
// 		$("#ev_community_bg").css("display",'block');
// 		$(".ev_community_ul").css("display",'block');
// 		// $(".ev_community_ul").height($(window).height());	
// 		$(".ev_community_ul ul").height($(".ev_community_ul").height()-90);
// 	}
// });
$(".ev_community_more").click(function(){
	if($("#ev_community_bg").css("display") == "none"){
		$("#ev_community_bg").css("display",'block');
		$("#my_forum").css("display",'block');
		// $(".ev_community_ul").height($(window).height());	
		// $(".ev_community_ul ul").height($(".ev_community_ul").height()-90);
	}
});
$("#ev_community_bg").click(function(){
	if($("#ev_community_bg").css("display") == "block"){
		$("#ev_community_bg").css("display",'none');
		$("#my_forum").css("display",'none');
		$("#forum_list").css("display",'none');
		$(".ev_community_ul").css("display",'none');
	}
});
$(".ev_community_ul li a").click(function(){
	$(this).attr("class","cur");
	$(this).parent().siblings().find("a").removeClass("cur")
	if($("#ev_community_bg").css("display") == "block"){
		$("#ev_community_bg").css("display",'none');
		$(".ev_community_ul").css("display",'none');
	}
});


function allShowImg(obj,index){
		$('#all_img_zz').remove();
		var imgZZ = $('<div class="allImgZZ" id="all_img_zz"></div>'),
				allImg=$('<div class="allShowImg" id="all_show_img"><em class="close" id="all_close_img" style="display:none">×</em><div id="showImg" class="proPicShow"></div><div id="showImgNum" class="banner-nav-1"></div></div>'),
				ul="<ul>",
				aw=$(window).width(),ah=$(window).height(),bh=$(window).height(),bt=$(document).scrollTop(),maxW=0,maxH=0;
		obj.find("img").each(function(){
			var url = $(this).attr("data-bigurl"),
					w = $(this).attr("data-w")*1,
					h = $(this).attr("data-h")*1;
				maxW = maxW < w ? w : maxW;
				maxH = maxH < h ? h : maxH;
			ul+='<li><table style="width:'+aw+'px;height:'+ah+'px;"><tr><td align="middle"><img style="max-width:100%; max-height:100%; vertical-align:middle;" src="'+$(this).attr("data-bigurl")+'" /></td></tr></table></li>';
		});
		allImg.find("#showImg").height(ah).append(ul+"</ul>");
		// allImg.find("#showImg").height(maxH).append(ul+"</ul>");
		imgZZ.css({"height":bh+"px","width":"100%"});
		// allImg.css({"height":maxH+"px","width":"100%","top":bt+"px"});
		allImg.css({"width":"100%"});
		imgZZ.append(allImg);
		$("body").append(imgZZ);		
		allImg.click(function(){
				imgZZ.remove();
		});
		var span="",bn = $("#showImgNum"),banner = $("#showImg"),bottom_val = ah/2;
		// bn.attr("class","banner-nav-1").css("bottom",-bottom_val+"px");
		banner.find("li").each(function(){
		  span += "<span></span>";
		});
		  bn.append(span);
		var changeBannerBg = function(num){
		  bn.find("span").removeClass("cur").eq(num).addClass("cur");
		}
		changeBannerBg(0);
		var x = parseInt(index) * 320;
		$("#showImgNum span").eq(index).addClass("cur").siblings().removeClass("cur");
		new $.Swipe(banner[0], {
		startSlide:index,
		direction:"LMove",
		speed:400,
		auto:false,
		callback: function(){
		  changeBannerBg(this.index);
		}

	  });
};

	function pupopen(theme_id,parent_id,reply_user_id){
		if(!parent_id) parent_id = 0;
		if(!reply_user_id) reply_user_id = 0;
		$("#popbox").css('margin','0 auto');
	 	document.getElementById("bg").style.display="block";
 		document.getElementById("popbox").style.display="block" ;
		var thisBg = document.documentElement.clientHeight;//阴影高度
		var thisH = document.getElementById("popbox").scrollHeight;//白色框高度
		var top = document.body.scrollTop || document.documentElement.scrollTop;

		document.getElementById("popbox").style.marginTop = ((thisBg-thisH)/2)+"px";
		// document.getElementById("popbox").style.marginTop = top+50+"px";

		var fabu_class_o=$('#popbox .upload_img').find('a').eq(2).attr('class');
		if(fabu_class_o == '' || fabu_class_o == 'Release'){
	        $('#popbox .upload_img').find('a').eq(2).addClass('ev_fabu');
	    }

		$('.ev_fabu').attr('rel',theme_id);
		$('.ev_fabu').attr('data-parent-id',parent_id);
		$('.ev_fabu').attr('data-reply-user-id',reply_user_id);
	}
	function pupclose(){
		document.getElementById("bg").style.display="none";
		document.getElementById("popbox").style.display="none" ;
	}
	
//	function myEvent(obj,ev,fn){
//		if(obj.attachEvent){
//			obj.attachEvent('on'+ev,fn);
//		}else{
//			obj.addEventListener(ev,fn,false);
//		}
//	}
//	myEvent(window,'load',function(){
//		var oRTT=document.getElementById('rtt');
//		var pH=document.documentElement.clientHeight;
//		var timer=null;
//		var scrollTop;
//		window.onscroll=function(){
//			scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
//			if(scrollTop>=pH){
//				oRTT.style.display='block';
//			}else{
//				oRTT.style.display='none';
//			}
//			return scrollTop;
//		};
//		oRTT.onclick=function(){
//			clearInterval(timer);
//			timer=setInterval(function(){
//				var now=scrollTop;
//				var speed=(0-now)/0;
//				speed=speed>0?Math.ceil(speed):Math.floor(speed);
//				if(scrollTop==0){
//					clearInterval(timer);
//				}
//				document.documentElement.scrollTop=scrollTop+speed;
//				document.body.scrollTop=scrollTop+speed;
//			}, 30);
//		}
//	});
	$('.ev_form #content').focus(function(){
 		var tmp_val = $(this).val(); 		
 		if(tmp_val == '回两句吧...'){
 			$(this).val(''); 		
 			return false;
 		}
 	});			
 	$('.ev_form #content').blur(function(){
 		var tmp_val = $.trim($(this).val()); 	
 		if(tmp_val == ''){
 			$(this).val('回两句吧...'); 
 			return false;
 		}
 	});
 	