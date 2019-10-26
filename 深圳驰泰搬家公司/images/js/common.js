// 判断浏览器是否支持 placeholder
$(document).ready(function(){
    var doc=document,inputs=doc.getElementsByTagName('input'),supportPlaceholder='placeholder'in doc.createElement('input'),placeholder=function(input){var text=input.getAttribute('placeholder'),defaultValue=input.defaultValue;
    if(defaultValue==''){
        input.value=text}
        input.onfocus=function(){
            if(input.value===text){this.value=''}};
            input.onblur=function(){if(input.value===''){this.value=text}}};
            if(!supportPlaceholder){
                for(var i=0,len=inputs.length;i<len;i++){var input=inputs[i],text=input.getAttribute('placeholder');
                if(input.type==='text'&&text){placeholder(input)}}}});

function addFavorite(){
    var vDomainName=window.location.href;
    var description=document.title;
    try{//IE
        window.external.AddFavorite(vDomainName,description);
    }catch(e){//FF
        window.sidebar.addPanel(description,vDomainName,"");
    }
	
	
}
function wrongMsg(object,msg){
	  $(".wrongMsg").text(msg);
	  object.addClass("wrong");
	}
	
//侧边栏下拉
	$(".lNavTg").next("ul").children("li").each(function(){
	
		var preHref01=location.pathname.split('/')[2];
		var preHref02=location.pathname.split('/')[3];
		var mainhref=location.pathname.split('/')[4];
	
		if(mainhref=="index.html" || mainhref=="index2.html" || mainhref=="index3.html" || mainhref=="index4.html" || mainhref=="index5.html" ){
			var href = preHref01+preHref02;
			//alert('d'+href);
		}
		else{
			
			var href = preHref01+preHref02+mainhref;
			//alert(href);
		}
		
		/* makeshift */
		if(href.match ('personalexpress')){	
			var href = 'personalexpress';
		}			
		var pre01 = $(this).children("a").get(0).getAttribute('href',2).split('/')[2];
		var pre02 = $(this).children("a").get(0).getAttribute('href',2).split('/')[3];
		var mainPath = $(this).children("a").get(0).getAttribute('href',2).split('/')[4];
		var myPath =pre01+pre02+mainPath;
		if(myPath == href){			
			$(this).parent().show();
			$(this).parent().prev().children("p").removeClass("icoOpen").addClass("icoClose");
			$(this).children("a");
			return false;
		}
	});
	
	$(".lNavTg").hover(function(){
		$(this).css("cursor","pointer");
		$(this).children("p").css("text-decoration","none");
	},function(){
		$(this).css("cursor","default");
		$(this).children("p").css("text-decoration","none");
	});
	$(".lNavTg").click(function(){
			if($(this).children("p").attr("class")=="icoClose"){
				$(this).children("p").removeClass("icoClose").addClass("icoOpen");
			}else{
				$(this).children("p").removeClass("icoOpen").addClass("icoClose");
			}
			$(this).next("ul").slideToggle();
	});
	
// header搜索栏focus事件
$(function(){
		$(".search_text").hover(
			function(){
				$(this).css("border", "1px solid #FCA637");
				$(this).css("background", "#fff");
			},
			function(){
				$(this).css("border", "1px solid #E0E0E0");
				$(this).css("background", "#fff");
			}
		);
	});

//国内/国际搬家流程
function setsrTab(name,cursel,n){
for(i=1;i<=n;i++){
var menu=document.getElementById(name+i);
var con=document.getElementById("con_"+name+"_"+i);
menu.className=i==cursel?"flow tab-on":"flow";
con.style.display=i==cursel?"block":"none";
}
}
//回到顶部
$(function() {
	$(window).scroll(function(){
		var scrolltop=$(this).scrollTop();		
		if(scrolltop>=200){		
			$("#elevator_item").show();
		}else{
			$("#elevator_item").hide();
		}
	});		
	$("#elevator").click(function(){
		$("html,body").animate({scrollTop: 0}, 500);	
	});		
});

//nav_menu
$(".nav_all").hover(function(){
	$(this).find(".nav_all_box1").show()
         $(this).addClass("nav_all_on");
}, function(){
	$(this).find(".nav_all_box1").hide()
         $(this).removeClass("nav_all_on");
});

$(".nav_all_box1 dl").hover(function(){
	$(this).find("dd").show()
         $(this).addClass("nav_all_box1_on");
}, function(){
	$(this).find("dd").hide()
         $(this).removeClass("nav_all_box1_on");
});
$(".more").click(function(){
    $(".more-box").slideToggle("slow");
	$(this).toggleClass("more-on");
	return false;
    });


//国内/国际搬家页面
/* 选项卡 */
$(function(){
	$(".block-banner .tab a").mouseover(function(){
		$(this).addClass('on').siblings().removeClass('on');
		var index = $(this).index();
		number = index;
		$('.block-banner .neirong li').hide();
		$('.block-banner .neirong li:eq('+index+')').show();
	});
	
	var auto = 0;  //等于1则自动切换，其他任意数字则不自动切换
	if(auto ==1){
		var number = 0;
		var maxNumber = $('.block-banner .tab a').length;
		function autotab(){
			number++;
			number == maxNumber? number = 0 : number;
			$('.block-banner .tab a:eq('+number+')').addClass('on').siblings().removeClass('on');
			$('.block-banner .neirong ul li:eq('+number+')').show().siblings().hide();
		}
		var tabChange = setInterval(autotab,3000);
		//鼠标悬停暂停切换
		$('.block-banner').mouseover(function(){
			clearInterval(tabChange);
		});
		$('.block-banner').mouseout(function(){
			tabChange = setInterval(autotab,3000);
		});
	  }
});