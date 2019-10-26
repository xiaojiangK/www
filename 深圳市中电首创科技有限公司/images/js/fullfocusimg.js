//jquery focusImg 
//qwguo	qwguo@sohu.com
//copyright www.ev123.com

(function($){
  $.fn.extend({
	focusImg : function(options){
	  return this.each(function(){
		var Opts = {
		  uistyle : "style-1",
		  fnclass : "inOut",
		  evtype : "click",
		  usertime : 6
		};
		Opts = $.extend(Opts,options);
		var full = $(this),
			fWidth = full.parent().width(),
			fHeight = full.parent().height(),
			uistyle = Opts.uistyle,
			fnclass = Opts.fnclass,
			pUl = full.children("ul"),
			pLi = pUl.find("li"),
			bNav = $("<div></div>"),
			times = null,
			an = true,
			y = 0,
			change = function(e){//ͼƬ��ַ����
			  var curli = e,bigpic = curli.attr("bigpic"),bcolor = curli.attr("bcolor");
			  curli.css({"background-color":bcolor,"background-image":"url("+bigpic+")"});
			  curli.attr("change","true");
			},
			eventfn = function(obj,fobj){//�¼�ģʽ
			  obj.find(fobj).each(function(e){
				$(this).bind(Opts.evtype,function(){
				  eval(fnclass+"(e)");
				});
			  });
			};
		switch(Opts.fnclass){
		  case 'inOut':
			(function(){
			  pUl.addClass('banner-pic-1').css({"height":fHeight});
			  pLi.each(function(){
			  $(this).css({"height":fHeight});
			  });
			})();
		  break;
		  case 'LMove':
			(function(){
			  full.css({"height":fHeight+"px"});
			  pUl.addClass('banner-pic-2').css({"width":pLi.length*fWidth+"px","height":fHeight+"px"});
			  pLi.each(function(){
				  $(this).css({"width":fWidth+"px","height":fHeight});
			  });
			})();
		  break;
		  case 'TMove':
			(function(){
			  full.css({"height":fHeight+"px"});
			  pUl.addClass('banner-pic-3').css({"height":pLi.length*fHeight+"px"});
			  pLi.each(function(){
			  $(this).css({"height":fHeight});
			  });
			})();
		  break;
		}
		switch (Opts.uistyle){
		  case "style-1" :
			var ban = $("<div class='b-nav'></div>");
			pLi.each(function(e){
			  ban.append("<span></span>");
			})
			full.append(bNav.attr("class","banner-nav-1").html(ban));
			eventfn(ban,"span");
		  break;
		  case "style-2" :
			var ban = $("<div class='b-nav'></div>");
			pLi.each(function(e){
			  ban.append("<span>"+(e+1)+"</span>");
			})
			full.append(bNav.attr("class","banner-nav-2").html(ban));
			eventfn(ban,"span");
		  break;
		  case "style-3" :
			var ban = $("<div class='b-nav'></div>");
			pLi.each(function(){
			  var smallurl = $(this).attr("smallpic") ? $(this).attr("smallpic") : $(this).attr("bigpic");
			  var s = $("<span></span>").html("<img src="+smallurl+" />");
			  ban.append(s);
			});
			full.append(bNav.attr("class","banner-nav-3").html(ban));
			eventfn(ban,"span");
		  break;
		}
	  
		var inOut = function(e){
		  var curli = pLi.eq(e);
		  if(curli.attr("change")=="false"){
			change(curli);
		  }
		  var ospan = bNav.find("span.cur");
		  var o = ospan.index();
		  if(e!=o){
			if(an){
			  an = false;
			  ospan.removeClass("cur");
			  bNav.find("span:eq("+e+")").addClass("cur");
			  pLi.eq(o).css({"z-index":3}).animate({"opacity":0},1000,function(){
				an = true;
				$(this).css({"opacity":1,"z-index":1});
			  });
			  curli.css({"display":"block","z-index":2});
			  y=y+1
			  if(y>=pLi.length){
				y = 0;
			  }
			}
		  }
		};
		
		var LMove = function(e){
		  var fullW = full.parent().width(),fullH = full.parent().height();
		  var curli = pLi.eq(e);
		  if(curli.attr("change")=="false"){
			change(curli);
		  }
		  var ospan = bNav.find("span.cur");
		  var o = ospan.index();
		  if(an){
			an = false;
			ospan.removeClass("cur");
			bNav.find("span:eq("+e+")").addClass("cur");
			pUl.animate({"left":"-"+e*fullW},200,function(){
			  an = true;
			  y=y+1
			  if(y>=pLi.length){
				y = 0;
			  }
			});
		  }
		};
		
		var TMove = function(e){
		  var fullH = full.height();
		  var curli = pLi.eq(e);
		  if(curli.attr("change")=="false"){
			change(curli);
		  }
		  var ospan = bNav.find("span.cur");
		  var o = ospan.index();
		  if(an){
			an = false;
			ospan.removeClass("cur");
			bNav.find("span:eq("+e+")").addClass("cur");
			pUl.animate({"top":"-"+e*fullH},200,function(){
			  an = true;
			  y=y+1
			  if(y>=pLi.length){
				y = 0;
			  }
			});
		  }
		};
		pUl[0].ontouchstart = function(sev){
			 clearInterval(times);
			var ttouch = sev.touches[0];
			var tx = Number(ttouch.pageX);
			pUl[0].ontouchmove = function(mev){
				document.body.preventDefault();
					var mtouch = mev.touches[0];
					var mx = Number(mtouch.pageX);
				if (mx - tx < 0) {
						eval(Opts.fnclass+"(y)");
				}else{
						//obj.getElementsByTagName("ul")[0].style.marginLeft = "0px";
					}
				}
				//return false;
		}
		pUl[0].ontouchend = function(eev){
				var etouch = eev.touches[0];
				var ex = Number(etouch.pageX);
				alert(ex);
				times = setInterval(function(){
				eval(Opts.fnclass+"(y)");
				},(Opts.usertime)*1000);
			}
		times = setInterval(function(){
		  eval(Opts.fnclass+"(y)");
		},(Opts.usertime)*1000);
		full.mouseenter(function(){
		  clearInterval(times);
		});
		full.mouseleave(function(){
		  times = setInterval(function(){
			eval(Opts.fnclass+"(y)");
		  },(Opts.usertime)*1000);
		});
		eval(Opts.fnclass+"(y)");
	  });
	}
  });
})(jQuery);
