// JavaScript Document
//µ¼º½_function
$(function(){
	var NMore = $("#NMore"),nav = $("#nav"),Nzz = $("#Nzz");
	if(nav.length){
		var topH = nav.offset().top+nav.height();
		if(NMore.hasClass("NMore_1001") || NMore.hasClass("NMore_1003")){
				NMore.css("top",topH);
		}else{
				NMore.css("top",0);
		}
	}
	$(window).on('touchstart',function(e){
		if(NMore.attr("state") == 'close' && !NMore.hasClass("NMore_1001")){
			NMore.hide();
		}
	});
	$("#nav .navMoreBut,#fixed_nav_but,#search_nav").click(function(e){
		var state = NMore.attr("state");
		if(!NMore.hasClass("NMore_1001")){
			NMore.removeAttr("style");
		}
		if(state== "open"){
			cNav(NMore);
		}else{
			oNav(NMore);
		}
		return false;
	});
	function cNav(obj){
		obj.attr("state","close");
		if(obj.hasClass("NMore_1002") || obj.hasClass("NMore_1004")){
			Nzz.css({"display":"none"});
		}else if(obj.hasClass("NMore_1005") || obj.hasClass("NMore_1006") || obj.hasClass("NMore_1007") || obj.hasClass("NMore_1008") || obj.hasClass("NMore_1009") || obj.hasClass("NMore_1010") || obj.hasClass("NMore_1011") || obj.hasClass("NMore_1012") || obj.hasClass("NMore_1013")){
			var webBody = $("#webBody,.main");
			if(is_wap_view){
				$("body").removeAttr("style");
			}
			webBody.removeClass("NMoreEffect");
			// webBody.attr("state","close");
			obj.find("span").removeAttr("style");
			if(obj.hasClass("NMore_1009") || obj.hasClass("NMore_1010") || obj.hasClass("NMore_1013")){
				// obj.find("li em").removeAttr("style");
				obj.find("li em").css("transition-delay",'0s');
			}else if(obj.hasClass("NMore_1011") || obj.hasClass("NMore_1012")){
				obj.find("li").removeAttr("style");
			}
		}else if(obj.hasClass("NMore_1014")){
			var nMore = $("#fixed_nav_but");
			obj.removeAttr("style");
		}
	}
	function oNav(obj){
		if(obj.hasClass("NMore_1002") || obj.hasClass("NMore_1004")){
			var w = $(document).width();
			var h = $(document).height()
			Nzz.css({"display":"block"});
		}else if(obj.hasClass("NMore_1005") || obj.hasClass("NMore_1006") || obj.hasClass("NMore_1007") || obj.hasClass("NMore_1008") || obj.hasClass("NMore_1009") || obj.hasClass("NMore_1010") || obj.hasClass("NMore_1011") || obj.hasClass("NMore_1012") || obj.hasClass("NMore_1013")){
			var	liNum = obj.find("li").length,
				sDate = 0,
				iDate = liNum*0.08;
			var webBody = $("#webBody,.main");
			if(is_wap_view){
				$("body").css({"position":"fixed","width":"100%"});
			}
			obj.find("li").each(function(){
				var t = $(this);
				sDate += 0.08;
				t.find("span").css("transition-delay",sDate+'s');
				if(obj.hasClass("NMore_1009")){
					t.find("em").css("transition-delay",iDate+'s');
					iDate -= 0.08;
				}else if(obj.hasClass("NMore_1010") || obj.hasClass("NMore_1013")){
					t.find("em").css("transition-delay",sDate+'s');
				}else if(obj.hasClass("NMore_1011") || obj.hasClass("NMore_1012")){
					t.css("transition-delay",sDate+'s');
				}
			})
			// webBody.attr("state","open");
			webBody.addClass("NMoreEffect");
		}else if(obj.hasClass("NMore_1014")){
			var nMore = $("#fixed_nav_but"), left = parseInt(nMore.css("left")), top = parseInt(nMore.css("top")), height = parseInt(obj.height());
			obj.css({left:left+'px',top:top-height-28+'px'})
		}
		setTimeout(function(){
			obj.attr("state","open");
		})
	}
	
	Nzz.click(function(){
		if(NMore.attr("state") == 'open'){
			cNav(NMore);
		}
	});
	NMore.click(function(){
		if(NMore.attr("state") == 'open'){
			cNav(NMore);
		}
	});
	$("#back_top").click(function(){
		$(document).find("body").animate({"scrollTop":0},1000);
	});
});
