//������������б�����
var filtrateFun = {
	//�����б����
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
	addFiltrateList : function(big,middle,small){	//ɸѡ�б��������
		var l = arguments.length,
			x = "",sList = "",sDt = "",sLi = "",curVal = "";
		if(l == 0){		//ɸѡһ���б����
			var j = proF.filtrate;
			for(x in j){
				var btext = "ȫ��"
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
		if(l == 1){	//ɸѡ�����б����
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
		if(l == 2){		//ɸѡ�����б����
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

// tabѡ��
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
	//�õ�domԪ��
		var filtrateBut = $("#filtrateBut"),
			wrap = $("#filtrateListWrap"),
			sortList = $("#sortfiltrateList"),
			firstClassify = $("#firstClassify"),
			secondClassify = $("#secondClassify"),
			thirdClassify = $("#thirdClassify"),
			resetBut = $("#filtrateResetBut"),
			enterBut = $("#filtrateEnterBut");
		//��domԪ�ذ��¼�
		filtrateBut.on({
			click : function(){
				var curBut = $(this),dataId = curBut.data("id"),open = curBut.data("open");
				//���ݵ�����������б�
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

				//�ж��Ƿ��
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
		//�������б���ӵ����¼�
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
		//��ɸѡ�б���ӵ����¼�
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
		//�������б���ӵ����¼�
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
	//�������б���ӵ����¼�
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
	//���ð�ť���¼�
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
				$(this).find("b").text("ȫ��");
			});
		}
	});
	//ȷ����ť���¼�
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
			//ɸѡ��ʾ��ѡ��״̬
			if (chooseUrl.indexOf('isShai') >= 0) {
				chooseUrl = changeURLArg(chooseUrl, 'isShai', isShai);
			} else {
				chooseUrl = chooseUrl + '&isShai=' + isShai;
			}
			var url ="/"+proF.username+"/wap_pro/"+proF.channel_id+"_"+big_id+"_"+sub_id+"_0.html"+chooseUrl;
			location.href = url;
		}
	});

	// �۸�-���ѡ��
	$(".priceC").on("click","dd",function(){
		$(this).addClass("cur").siblings().removeClass("cur");
		/*if($(this).hasClass("cur")){
			$(this).find("input").attr("checked",false);
			$(this).removeClass("cur");
		}else if($(this).siblings().hasClass("cur")){
			alert("ֻ��ѡ��һ��");
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

	// �۸�-ȷ��
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
		// 	alert('��ѡ����Ӧ�Ĺ�����');
		// 	return false;
		// }
	});

	// �۸�-����
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
	* url Ŀ��url 
	* arg ��Ҫ�滻�Ĳ������� 
	* arg_val �滻��Ĳ�����ֵ 
	* return url �����滻���url 
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

	//���ļ�������
	if ($("#choose_url")) {
		var chooseUrl     = $("#choose_url").val();
		if (chooseUrl) {
			if (chooseUrl.match('sort=bid')) {
				$("#filtrateBut .sortList").find('strong').html('��Ʒ');
			} else if (chooseUrl.match('sort=_bid')) {
				$("#filtrateBut .sortList").find('strong').html('����');
			} else if (chooseUrl.match('sort=default')) {
				$("#filtrateBut .sortList").find('strong').html('�ۺ�');
			}
		}
	}
});
