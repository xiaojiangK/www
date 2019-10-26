$(function (){

	var clientWidth = document.documentElement.clientWidth;
	// 游览器改变大小时更新状态
	$(window).resize(function() {
		clientWidth = document.documentElement.clientWidth;
		navbar();
		classify();
		stick();
		$('.navbar-collapse').css('left',-clientWidth);
	});

	// 导航栏下拉
	navbar();
	var flag3 = true;
	function navbar(){
		if (clientWidth >= 768) {
			$('.nav li').each(function() {
				$(this).on('mouseover',function (){
					$(this).find('.dropdown-menu').show();
					$('.mask').css({'background':'rgba(0,0,0,0.5)','z-index':'9'});
					$(this).siblings().find('a').css('color','#e5e5e5');
				});
				$(this).on('mouseout',function (){
					$(this).find('.dropdown-menu').hide();
					$('.mask').css({'background':'rgba(0,0,0,0)','z-index':'-9'});
					$(this).siblings().find('a').css('color','#5E5A61');
				});
			});
		}else{
			$('.nav li').each(function() {
				$(this).on('click',function (){
					if (flag3) {
						$(this).find('.dropdown-menu').show();
						$('.mask').css({'background':'rgba(0,0,0,0.5)','z-index':'9'});
						$(this).siblings().find('a').css('color','#e5e5e5');
					}else{
						$(this).find('.dropdown-menu').hide();
						$('.mask').css({'background':'rgba(0,0,0,0)','z-index':'-9'});
						$(this).siblings().find('a').css('color','#5E5A61');
					}
					flag3 = !flag3;
				});
			});
		}
	}

	// 移动端导航切换
	var flag2 = true;
	$('.navbar-collapse').css('left',-clientWidth);
	$('.navbar-toggle').on('click',function (){
		if (flag2) {
			$(this).find('i').removeClass('glyphicon-menu-hamburger').addClass('glyphicon-remove');
			$('.navbar-collapse').css('left','15px');
			$('.mask').on('click', function() {
				$(this).css({'background':'rgba(0,0,0,0)','z-index':'-9'});
				$('.navbar-collapse').css('left',-clientWidth);
				$('.navbar-toggle').find('i').removeClass('glyphicon-remove').addClass('glyphicon-menu-hamburger');
				$('.dropdown-menu').hide();
				flag2 = true;
				flag3 = true;
			});
		}else{
			$(this).find('i').removeClass('glyphicon-remove').addClass('glyphicon-menu-hamburger');
			$('.navbar-collapse').css('left',-clientWidth);
			$('.mask').css({'background':'rgba(0,0,0,0)','z-index':'-9'});
			$('.dropdown-menu').hide();
		}
		flag2 = !flag2;
	});

	// 搜索框展开
	var flag = true;
	$('.search_btn').on('click',function (){
		var width = -($('.search').innerWidth());
		if (flag) {
			$(this).removeClass('glyphicon-search').addClass('glyphicon-remove');
			$('.search').css('right','0');
		}else{
			$(this).removeClass('glyphicon-remove').addClass('glyphicon-search');
			$('.search').css('right',width);
		}
		flag = !flag;
	});

	// 切换首页产品排列方式
	$('.array i').eq(0).on('click', function() {
		$('.list-product img').removeClass('justify');
		$('.list-product li').removeClass('justify-li');
		$(".list-product li div").removeClass('info');
		$('.justify-title').hide();
		$('.th').show();
		$('.array i').css({'opacity' : '0.2','filter' : 'alpha(opacity:20)'});	
		$(this).css({'opacity' : '1','filter' : 'alpha(opacity:100)'});	
	});
	$('.array i').eq(1).on('click', function() {
		$('.list-product img').addClass('justify');
		$('.list-product li').addClass('justify-li');
		$(".list-product li div").addClass("info");
		$('.justify-title').show();
		$('.th').hide();
		$('.array i').css({'opacity' : '0.2','filter' : 'alpha(opacity:20)'});	
		$(this).css({'opacity' : '1','filter' : 'alpha(opacity:100)'});	
	});

	// 产品分类手风琴
	var panel = $('.panel');
	$(panel).each(function (index){
		$(this).on('shown.bs.collapse', function () {
			$(this).find('.panel-title i').text('-');
		})
		$(this).on('hidden.bs.collapse', function () {
			$(this).find('.panel-title i').text('+');
		})
	});

	// 滚动滚动条产品分类置顶
	var filter = $('.list-filter');
	var top = $(filter).offset().top-65;	// 65则是main的top值
	// 滚动滚动条更新状态
	$(window).scroll(function() {
		stick();
	});	
	stick();

	function stick(){
		var height = $(filter).innerHeight();
		var left = $('.met-product .container').offset().left;
		var productH = $('.list-product').innerHeight()+$('.list-product').offset().top-65;
		
		if (clientWidth >= 992) {
			// 滚动条上面距离大于filter的top值 以及 小于内容height+top-filter的height 则置顶
			if ($(window).scrollTop() > top && $(window).scrollTop() < productH - height) {
				$(filter).css({
					'position': 'fixed',
					'left': left,
					'top': '75px',
					'z-index' : '8'
				});
				$('.list-product').css('left',$(filter).innerWidth());
			}else{
				$(filter).css({
					'position': 'relative',
					'left' : '0',
					'top': '0',
				});
				$('.list-product').css('left','0');
			}
		}else{
			$(filter).css('top','')
			$('.list-product').css('left','0');
		}
	}

	// 首页图片链接
	$('.picture-link img').hover(function() {
		$(this).css({
			'transform' : 'scale(1.3)',
			'-webkit-transform' : 'scale(1.3)',
			'-moz-transform' : 'scale(1.3)',
			'-ms-transform' : 'scale(1.3)',
			'-o-transform' : 'scale(1.3)',
		});
	}, function() {
		$(this).css({
			'transform' : 'scale(1)',
			'-webkit-transform' : 'scale(1)',
			'-moz-transform' : 'scale(1)',
			'-ms-transform' : 'scale(1)',
			'-o-transform' : 'scale(1)',
		});
	});

	// 移动端分类收缩
	classify();
	function classify(){
		if (clientWidth <= 991) {
			var flag5 = true;
			$('.list-filter').css('left',-clientWidth);
			$('.product-head .btn').on('click',function (){
				if (flag5) {
					$('.list-filter').css('left','0');
				}else{
					$('.list-filter').css('left',-clientWidth);
				}
				flag5 = !flag5;
			});
		}else{
			$('.list-filter').css('left','0');
		}
	}

});

// 产品详情页幻灯片
function carousel(){
	var img = $('.msg-pro .picture img');
	var timer = null;
	var iNow = 0;

	auto(); 

	$('.carousel').hover(function() {
		clearInterval(timer);
	}, function() {
		auto();
	});

	$('.msg-pro .prev').on('click', function() {
		if (iNow == 0) {
			iNow = img.length-1;
		}else{
			iNow --;
		}
		for (var i=0; i<img.length; i++){
			$(img).eq(i).css({
				opacity: '0',
				filter: 'aplha(opacity:0)'
			});
		}
		$(img).eq(iNow).css({
			opacity: '1',
			filter: 'aplha(opacity:100)'
		});;
	});
	$('.msg-pro .next').on('click', function() {
		if (iNow == img.length-1) {
			iNow = 0;
		}else{
			iNow ++;
		}
		for (var i=0; i<img.length; i++){
			$(img).eq(i).css({
				opacity: '0',
				filter: 'aplha(opacity:0)'
			});
		}
		$(img).eq(iNow).css({
			opacity: '1',
			filter: 'aplha(opacity:100)'
		});;
	});
	function auto(){
		timer = setInterval(function (){
			if (iNow == img.length-1) {
				iNow = 0;
			}else{
				iNow ++;
			}
			for (var i=0; i<img.length; i++){
				$(img).eq(i).css({
					opacity: '0',
					filter: 'aplha(opacity:0)'
				});
			}
			$(img).eq(iNow).css({
				opacity: '1',
				filter: 'aplha(opacity:100)'
			});
		},3000);
	}
}  