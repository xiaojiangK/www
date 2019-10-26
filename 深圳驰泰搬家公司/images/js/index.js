//banner
$(".fullSlide").slide({
    titCell: ".hd ul",
    mainCell: ".bd ul",
    effect: "fold",
    autoPlay: true,
    autoPage: true,
    trigger: "click",
    startFun: function(i) {
        var curLi = jQuery(".fullSlide .bd li").eq(i);
        if ( !! curLi.attr("_src")) {
            curLi.css("background-image", curLi.attr("_src")).removeAttr("_src")
        }
    }
});
//banner end

//运单查询
function refreshCc() {
	var ccImg = document.getElementById("checkCodeImg");
	if (ccImg) {
		ccImg.src= ccImg.src + '&' +Math.random();
	}
}
$(function(){
	var smt = $("#bt_submit");
	smt.click(function(){
		var danhao = $('#txtSearch').val();
		var code = $('#txtVcode').val();
		if (danhao == ''){ alert('请输入单号');return false;}
		if (code == ''){ alert('请输入验证码');return false;}
		});
});
$(function(){
		$(".ind_textarea").hover(
			function(){
				$(this).css("border", "1px solid #FCA637");
				$(this).css("background", "#FDFDF5");
			},
			function(){
				$(this).css("border", "1px solid #E0E0E0");
				$(this).css("background", "#fff");
			}
		);
		$(".ind_textarea2").hover(
			function(){
				$(this).css("border", "1px solid #FCA637");
				$(this).css("background", "#FDFDF5");
			},
			function(){
				$(this).css("border", "1px solid #E0E0E0");
				$(this).css("background", "#fff");
			}
		);
	});
//留言点评
$(function(){
	var scrtime;
	$("#quotation").hover(function(){
		clearInterval(scrtime);
	
	},function(){
	
	scrtime = setInterval(function(){
		var $ul = $("#quotation ul");
		var liHeight = $ul.find("li:last").height();
		$ul.animate({marginTop : liHeight + 6 + "px"},1000,function(){
		
		$ul.find("li:last").prependTo($ul)
		$ul.find("li:first").hide();
		$ul.css({marginTop:0});
		$ul.find("li:first").fadeIn(1000);
		});
	},6500);
	
	}).trigger("mouseleave");
});

//本月优惠线路
function AutoScroll(obj){ 
$(obj).find("ul:first").animate({ 
marginTop:"-25px" 
},500,function(){ 
$(this).css({marginTop:"0px"}).find("li:first").appendTo(this); 
}); 
} 
$(document).ready(function(){ 
setInterval('AutoScroll("#repeated_display")',6500); 
});