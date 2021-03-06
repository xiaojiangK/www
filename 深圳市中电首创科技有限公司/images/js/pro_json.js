//根据条件输出列表内容
var filtrateFun = {
	//排序列表输出
	addSortList : function() {
		var x,sList="",sLi = "",sDt = "",curVal = "",j = proF.sort;
		if(proF.clickVal.sort[0]){
			curVal = proF.clickVal.sort[0];
		}else if(proF.getback.sort[0]){
			curVal = proF.getback.sort[0];
		}else{
			curVal = "all";
		}
		for(x in j){
			var curCss = curVal == x ? "cur" : "";
			var dataUrl = j[x]['url'],dataId = j[x]['id'],name = j[x]['name'],attrCss = j[x]['class'];
			if(x == "all"){
				sDt = '<dt data-id="'+ dataId +'" class="'+ curCss +'" data-url="'+ dataUrl +'"><i class="icon-img icon-'+ attrCss +'"></i><strong>'+ name +'</strong><em><s></s></em></dt>';
			}
			sLi += '<li data-id="'+ dataId +'" class="'+ curCss +'" data-url="'+ dataUrl +'"><strong>'+ name +'</strong><em><s></s></em></li>';
		}
		sList = '<dl>'+ sDt +'<dd><ul>'+ sLi +'</ul></dd></dl>';
		return sList;
	},
	addPinList : function() {
	},
	addPriceList : function() {
	},
	addFiltrateList : function(big,middle,small){	//筛选列表输出函数
		var l = arguments.length,
			x = "",sList = "",sDt = "",sLi = "",curVal = "";
		if(l == 0){		//筛选一级列表输出
			var j = proF.filtrate;
			for(x in j){
				var btext = "全部"
				if(proF.clickVal.filtrate[x][0]){
					var l_big = proF.clickVal.filtrate[x][0];
					if (l_big && x == 'pClass') {
						l_big = l_big;
					}
					if(proF.clickVal.filtrate[x][1] && proF.clickVal.filtrate[x][1] !="all"){
						var l_small = proF.clickVal.filtrate[x][1];
						if (l_small && x == 'pClass') {
							l_small = l_small;
						}
						if(typeof(j[x]['sub'][l_big]['sub']) == 'object'){
							if(j[x]['sub'][l_big]['sub'][l_small]){
								btext = j[x]['sub'][l_big]['sub'][l_small]['name'];
							}
						}else{
							btext = j[x]['sub'][l_big]['name'];
						}
					}else{
						if(typeof(j[x]['sub']) == 'object'){
							if(j[x]['sub'][l_big]){
								btext = j[x]['sub'][l_big]['name'];
							}
						}
					}
				}else if(proF.getback.filtrate[x][0]){
					var l_big = proF.getback.filtrate[x][0],l_small = proF.getback.filtrate[x][1];
						if(l_big === 0 || l_big == undefined){
							l_big = "all";
						}
						if(l_small === 0 || l_small == undefined){
							l_small = "all";
						}
					if(l_small != "all"){
						if(typeof(j[x]['sub'][l_big]['sub']) == 'object'){
							if(j[x]['sub'][l_big]['sub'][l_small]){
								btext = j[x]['sub'][l_big]['sub'][l_small]['name'];
							}
						}
					}else{
						if(typeof(j[x]['sub']) == 'object'){
							if(j[x]['sub'][l_big]){
								btext = j[x]['sub'][l_big]['name'];
							}
						}
					}
				}
				var url = j[x]['url'] ? j[x]['url'] : "";
				sLi += '<li data-id="'+j[x]["id"]+'" data-url="'+url+'"><strong>'+j[x]["name"]+'</strong><em><s></s></em><b>'+btext+'</b></li>';
			}
			sList = '<dl><dd><ul>'+sLi+'<ul></ul></dd></dl>';
			return sList;
		}
		if(l == 1){	//筛选二级列表输出
			var j = proF.filtrate[big]["sub"];
			if(proF.clickVal.filtrate[big][0]){
				curVal = proF.clickVal.filtrate[big][0];
			}else if(proF.getback.filtrate[big][0]){
				curVal = proF.getback.filtrate[big][0];
			}else{
				curVal = "all";
			}
			if(big == 'pBrand' || big == 'pPrice'){
				var pp = true;
			}
			if(typeof(j) == 'object'){
				for(x in j){

					var url       = j[x]['url'] ? j[x]['url'] : "";
					var	id        = j[x]["id"],name = j[x]["name"];
					var	cur       = curVal == id ? "cur" : "";
					var target    = j[x]['url_yemian'];
					var exitsArr  = (big == 'pBrand' && j[x]['exits_pro']) ? j[x]['exits_pro'] : '';
					if(pp){
						class_id = parseInt(j[x]['class_id']);
						class_id = isNaN(class_id) ? 0 : class_id;
						var clickClassId = parseInt(proF.clickVal.filtrate.pClass[0]);
						clickClassId = isNaN(clickClassId) ? 0 : clickClassId;
						if (big == 'pBrand') {
							var is_true = ( (class_id == 0 && clickClassId == 0)|| (clickClassId == class_id && class_id!=0) || (class_id == 0 && $.inArray(clickClassId.toString(),exitsArr) != -1)) ? true : false;
						} else {
							if($.inArray(clickClassId.toString(),j['class']) != -1){
								var is_true = (clickClassId == class_id) ? true : false;
							}else{
								var is_true = (class_id == 0) ? true : false;
							}
						}
						if(x != "all"){
							if(is_true && x != 'class'){
								sLi += '<li class="'+cur+'" data-id="'+id+'" data-url="'+url+'" data-target="'+target+'"><strong>'+name+'</strong><em><s></s></em><small></small></li>';
							}
						}else{
							sDt = '<dt class="'+cur+'" data-id="'+id+'" data-url="'+url+'" data-target="'+target+'"><i></i><strong>'+name+'</strong><em><s></s></em></dt>';
						}
					}else{
						if(x != "all"){
							sLi += '<li class="'+cur+'" data-id="'+id+'" data-url="'+url+'" data-target="'+target+'"><strong>'+name+'</strong><em><s></s></em><small></small></li>';
						}else{
							sDt = '<dt class="'+cur+'" data-id="'+id+'" data-url="'+url+'" data-target="'+target+'"><i></i><strong>'+name+'</strong><em><s></s></em></dt>';
						}
					}
				}
				sList = '<dl>'+sDt+'<dd><ul>'+sLi+'<ul></ul></dd></dl>';
				return sList;
			}
		}
		if(l == 2){		//筛选三级列表输出
			var j = proF.filtrate[big]["sub"][middle]["sub"];
			if(proF.clickVal.filtrate[big][1]){
				curVal = proF.clickVal.filtrate[big][1];
			}else if(proF.getback.filtrate[big][1]){
				curVal = proF.getback.filtrate[big][1];
			}else{
				curVal = "all";
			}
			if(typeof(j) == "object"){
				for(x in j){
					var url = j[x]['url'] ? j[x]['url'] : "";
					var	id = j[x]["id"],
						name = j[x]["name"];
					var cur = id == curVal ? "cur" : "";
					var target = j[x]['url_yemian'];
					if(x != "all"){
						sLi += '<li class="'+cur+'" data-id="'+id+'" data-url="'+url+'" data-target="'+target+'"><strong>'+name+'</strong><em><s></s></em><small></small></li>';
					}else{
						sDt = '<dt class="'+cur+'" data-id="'+id+'" data-url="'+url+'" data-target="'+target+'"><i></i><strong>'+name+'</strong><em><s></s></em></dt>';
					}
				}
				sList = '<dl>'+sDt+'<dd><ul>'+sLi+'<ul></ul></dd></dl>';
				return sList;
			}
		}
	}
};

// tab选择
function specTab(o,obj){
	var t = $(o), tVal = t.attr("data-val");
	if(t.hasClass("cur")){
		t.removeClass("cur");
		$(".priceInfo").hide();
	}else{
		$(".priceInfo").show();
		t.addClass("cur").siblings().removeClass("cur");
		$("#"+obj).show().siblings().hide();
	}
	// $(".priceC").find('input').attr('checked', false);
	// $(".priceC").find('dd').removeClass("cur");
}

$(function(){
	//得到dom元素
		var filtrateBut = $("#filtrateBut"),
			wrap = $("#filtrateListWrap"),
			sortList = $("#sortfiltrateList"),
			firstClassify = $("#firstClassify"),
			secondClassify = $("#secondClassify"),
			thirdClassify = $("#thirdClassify"),
			resetBut = $("#filtrateResetBut"),
			enterBut = $("#filtrateEnterBut");
		//给dom元素绑定事件
		filtrateBut.on({
			click : function(){
				var curBut = $(this),dataId = curBut.data("id"),open = curBut.data("open");
				//根据单击添加内容列表
				switch(dataId){
					case "sortList" :
						if(sortList.data("add") != 1){
							sortList.html(filtrateFun.addSortList());
							sortList.data("add",1);
						}
					break;
					case "firstClassify" :
						if(firstClassify.data("add") != 1){
							firstClassify.prepend(filtrateFun.addFiltrateList());
							firstClassify.data("add",1);
						}
					break;
				}

				//判断是否打开
				if(open == 1){
					curBut.data("open",0);
					wrap.animate({height:0},300,function(){
						wrap.find("div.filtrate-list").hide();
					});
				}else{
					wrap.find("div.filtrate-list").hide().css({"left":0});
					thirdClassify.data("open",0);
					switch(dataId){
						case "sortList" :
							sortList.show();
						break;
						case "firstClassify" :
							firstClassify.show();
						break;
					}
					wrap.animate({height:330},300);
					curBut.data("open",1);
					// curBut.data("open",1).addClass("open-select");
					// curBut.siblings().data("open",0);
				}
			}
		},"li");
		//给排序列表添加单击事件
		sortList.on({
			click : function(){
				var cLi = $(this),
					dataUrl = cLi.data("url"),
					dataId = cLi.data("id"),
					curVal="";
				if(proF.clickVal.sort[0]){
					curVal = proF.clickVal.sort[0];
				}else if(proF.getback.sort[0]){
					curVal = proF.getback.sort[0];
				}
				if(curVal != dataId){
					cLi.addClass("cur").siblings().removeClass("cur");
					proF.clickVal.sort[0] = dataId;
					window.location = dataUrl;
				}
			}
		},"li,dt");
		//给筛选列表添加单击事件
		firstClassify.on({
			click : function(){
				var cLi = $(this),
					dataId = cLi.data("id"),
					dataTarget = cLi.data("target"),
					dataUrl = cLi.data("url");
				proF.filtrate.clickClass = dataId;
				if(!dataUrl){
					if(typeof(proF.filtrate[dataId]['sub']) == "object"){
						secondClassify.html(filtrateFun.addFiltrateList(dataId));
						firstClassify.animate({left:"-100%"},300);
						secondClassify.css({"display":"block","left":"100%"}).animate({left:"0"},300);
					}
				}else{
					if(dataTarget == 2){
						window.open(dataUrl);
					}else if(dataTarget == 1){
						window.location = dataUrl;
					}
				}
			}
		},"li");
		//给二级列表添加单击事件
		secondClassify.on({
			click : function(){
				var cLi = $(this),
					dataId = cLi.data("id"),
					dataUrl = cLi.data("url"),
					dataTarget = cLi.data("target"),
					curText = cLi.find("strong").text(),
					bigVar = proF.filtrate.clickClass,
					subJ = proF.filtrate[bigVar]['sub'][dataId]['sub'];
				if(proF.clickVal.filtrate[bigVar][0] != dataId){
					proF.clickVal.filtrate[bigVar][0] = dataId;
					proF.clickVal.filtrate[bigVar][1] = "all";
				}
				if(!dataUrl){
					if(typeof(subJ) == "object"){
						var dd = secondClassify.find("dd"),
							t = cLi.index()*cLi.outerHeight(),
							h = secondClassify.height(),
							st = dd.scrollTop();
						thirdClassify.html(filtrateFun.addFiltrateList(bigVar,dataId));
						if(thirdClassify.data("open") != 1){
								thirdClassify.css({"display":"block","left":"100%"}).animate({left:"40%"},300,function(){
									thirdClassify.data("open",1);
									secondClassify.find("dd").addClass("open");
								});

							}
							cLi.addClass("cur").siblings("li").removeClass("cur");
							dd.animate({scrollTop:t},300);
					}else{
						cLi.addClass("cur").siblings().removeClass("cur");
						firstClassify.animate({left:"0"},300);
						secondClassify.animate({left:"100%"},300);
						thirdClassify.animate({left:"100%"},300).data("open",0);
						firstClassify.find("li").each(function(){
							var that = $(this);
							if(that.data("id") == bigVar){
								that.find("b").text(curText);
							}
						})
					}
				}else{
					if(dataTarget == 2){
						window.open(dataUrl);
					}else if(dataTarget == 1){
						window.location = dataUrl;
					}
				}
			}
		},"li,dt");
	//给三级列表添加单击事件
		thirdClassify.on({
			click : function(){
				var cLi = $(this),
					curText = cLi.find("strong").text(),
					dataId = cLi.data("id"),
					dataUrl = cLi.data("url"),
					bigVar = proF.filtrate.clickClass,
					dataTarget = cLi.data("target");
				cLi.addClass("cur").siblings().removeClass("cur");

				proF.clickVal.filtrate[bigVar][1] = dataId;
				if(!dataUrl){
					if(dataId == "all"){
						if(proF.clickVal.filtrate[bigVar][0]){
							var l_big_id = proF.clickVal.filtrate[bigVar][0];
							curText = proF.filtrate[bigVar]['sub'][l_big_id]["name"];
						}
					}
					firstClassify.animate({left:"0"},300);
					secondClassify.animate({left:"100%"},300);
					thirdClassify.animate({left:"100%"},300,function(){
							thirdClassify.data("open",0);
							secondClassify.find("dd").removeClass("open");
						});
					firstClassify.find("li").each(function(){
						var that = $(this);
						if(that.data("id") == bigVar){
							that.find("b").text(curText);
						}
					})
				}else{
					if(dataTarget == 2){
						window.open(dataUrl);
					}else if(dataTarget == 1){
						window.location = dataUrl;
					}
				}
			}
		},"li,dt")
	//重置按钮绑定事件
	resetBut.on({
		click : function(){
			var chooseUrl = $("#choose_url").val();
			chooseUrl = changeURLArg(chooseUrl, 'status', 0);
			chooseUrl = changeURLArg(chooseUrl, 'price', 0);
			chooseUrl = changeURLArg(chooseUrl, 'manu_id', 0);
			$("#choose_url").val(chooseUrl);
			for(x in proF.clickVal.filtrate){
				if(x != "clickClass"){
					for(var i = 0; i<proF.clickVal.filtrate[x].length;i++){
						if (x != 'u_u_id') {
							proF.clickVal.filtrate[x][i] = "";
						}
					}
				}
			}
			firstClassify.find("li").each(function(){
				$(this).find("b").text("全部");
			});
		}
	});
	//确定按钮绑定事件
	enterBut.on({
		'click' : function(){
			var k;
			var tmpParam   = '?style='+proF.pStyle;
			var tmpId      = sub_id = big_id = 0;
			var orderStyle = parseInt(proF.getback.sort);
			orderStyle     = isNaN(orderStyle) ? 0 : orderStyle-1;
			var sortArr    = ['default','bid','_bid'];
			var chooseUrl     = $("#choose_url").val();
			var isShai = 0;
			// if(sortArr[orderStyle]){
			// 	tmpParam  += '&sort='+sortArr[orderStyle];
			// }
			// if (proF.clickVal.filtrate.u_u_id) {
			// 	tmpParam  += '&u_u_id='+proF.clickVal.filtrate.u_u_id;
			// }
			for (k in proF.clickVal.filtrate){
				if(k != "clickClass"){
					if(proF.clickVal.filtrate[k][0]!=0){
						if (typeof proF.clickVal.filtrate[k][0] == 'string') {
							proF.clickVal.filtrate[k][0];
						}
						if(isNaN(proF.clickVal.filtrate[k][0])){
							var tmpId_arr=proF.clickVal.filtrate[k][0].split('p_');
							tmpId=tmpId_arr[1];
						}else{
							tmpId = parseInt(proF.clickVal.filtrate[k][0]);
						}
						tmpId     = isNaN(tmpId) ? 0 : tmpId;
						if (tmpId) {
							isShai = 1;
						}
						if(k == 'pClass'){
							big_id     = isNaN(tmpId) ? 0 : tmpId;
							proF.clickVal.filtrate[k][1];
							if(isNaN(proF.clickVal.filtrate[k][1])){
								var subId_arr=proF.clickVal.filtrate[k][1].split('p_');
								var sub_id=subId_arr[1];
							}else{
								var sub_id = parseInt(proF.clickVal.filtrate[k][1]);
							}
							//var sub_id = parseInt(proF.clickVal.filtrate[k][1]);
							sub_id     = isNaN(sub_id) ? 0 : sub_id;
						}else if(k == 'pBrand'){
							// tmpParam += '&manu_id='+tmpId;
							if (chooseUrl.indexOf('manu_id') >= 0) {
								chooseUrl = changeURLArg(chooseUrl, 'manu_id', tmpId);
							} else {
								chooseUrl = chooseUrl + '&manu_id=' + tmpId;
							}
						}else if(k == 'pPrice'){
							// tmpParam += '&price='+tmpId ;
							if (chooseUrl.indexOf('price') >= 0) {
								chooseUrl = changeURLArg(chooseUrl, 'price', tmpId);
							} else {
								chooseUrl = chooseUrl + '&price=' + tmpId;
							}
						}else if(k == 'pState'){
							// tmpParam += '&status='+tmpId ;
							if (chooseUrl.indexOf('status') >= 0) {
								chooseUrl = changeURLArg(chooseUrl, 'status', tmpId);
							} else {
								chooseUrl = chooseUrl + '&status=' + tmpId;
							}
						}
					}
				}
			}
			//筛选显示被选中状态
			if (chooseUrl.indexOf('isShai') >= 0) {
				chooseUrl = changeURLArg(chooseUrl, 'isShai', isShai);
			} else {
				chooseUrl = chooseUrl + '&isShai=' + isShai;
			}
			var url ="/"+proF.username+"/wap_pro/"+proF.channel_id+"_"+big_id+"_"+sub_id+"_0.html"+chooseUrl;
			location.href = url;
		}
	});

	// 价格-规格选择
	$(".priceC").on("click","dd",function(){
		$(this).addClass("cur").siblings().removeClass("cur");
		/*if($(this).hasClass("cur")){
			$(this).find("input").attr("checked",false);
			$(this).removeClass("cur");
		}else if($(this).siblings().hasClass("cur")){
			alert("只能选择一个");
		}else{
			$(this).find("input").attr("checked",true);
			$(this).addClass("cur");
		}*/
		/*if($(this).hasClass("cur")){
			$(this).find("input").attr("checked",false);
			$(this).removeClass("cur");
		}else{
			$(this).find("input").attr("checked",true);
			$(this).addClass("cur");
		}*/
	})

	// 价格-确定
	$(".okBtn").click(function(){
		var dataVal = "",
		    dataId  = "",
		    dataGuiGe = "",
			textCur = $(".priceC .cur"),
			titId = $(".priceTit .cur"),
			localUrl = $("#re_url").val();
		// if(textCur.length){
			$(".priceC dl").each(function(){
				var t = $(this);
				if (t.css('display') == 'block') {
					$(this).find('dd').each(function() {
						dataGuiGe = $(this).parent('dl').attr("data-id");
						if($(this).hasClass("cur")){
							dataId += $(this).attr("data-id") + ",";
							if(dataVal == ''){
								dataVal += $(this).attr("data-val");
							}else{
								dataVal += ","+$(this).attr("data-val");
							}
						} else {
							dataId += '';
						}
					});
				}
			});
			if (dataId) {
				dataId = dataId.substring(0, dataId.length-1);
			}
			if (localUrl.indexOf('guige_'+dataGuiGe) >= 0) {
				localUrl = changeURLArg(localUrl, 'guige_'+dataGuiGe, dataId);
			} else {
				localUrl = localUrl + '&guige_' + dataGuiGe + '=' + dataId;
			}
			$(".priceInfo").hide();
			$("#priceList li").removeClass("cur");
			window.location.href = localUrl;
		// } else {
		// 	alert('请选择相应的规格参数');
		// 	return false;
		// }
	});

	// 价格-重置
	$(".resetBtn").click(function(){
		$(".priceC dl").each(function(){
			var m = $(this);
			if (m.css('display') == 'block') {
				$(this).find('dd').removeClass('cur');
				$(this).find('input').attr('checked', false);
			}
		});
	});

	/* 
	* url 目标url 
	* arg 需要替换的参数名称 
	* arg_val 替换后的参数的值 
	* return url 参数替换后的url 
	*/ 
	function changeURLArg(url,arg,arg_val){ 
	    var pattern=arg+'=([^&]*)'; 
	    var replaceText=arg+'='+arg_val; 
	    if(url.match(pattern)){ 
	        var tmp='/('+ arg+'=)([^&]*)/gi'; 
	        tmp=url.replace(eval(tmp),replaceText); 
	        return tmp; 
	    }else{ 
	        if(url.match('[\?]')){ 
	            return url+'&'+replaceText; 
	        }else{ 
	            return url+'?'+replaceText; 
	        } 
	    } 
	    return url+'\n'+arg+'\n'+arg_val; 
	}

	//更改检索名称
	if ($("#choose_url")) {
		var chooseUrl     = $("#choose_url").val();
		if (chooseUrl) {
			if (chooseUrl.match('sort=bid')) {
				$("#filtrateBut .sortList").find('strong').html('新品');
			} else if (chooseUrl.match('sort=_bid')) {
				$("#filtrateBut .sortList").find('strong').html('评论');
			} else if (chooseUrl.match('sort=default')) {
				$("#filtrateBut .sortList").find('strong').html('综合');
			}
		}
	}
});
