
    // 页面动画
    new WOW().init();

    // 页面滚动
    var pageiNow = 0;
    // 限制页面滚动距离、首页PC底部高度
    function bom_translate(){
        $('.footer_index').css('height',$('.footer_index .container').innerHeight() + 30);
        var translate = -(mySwiper.getTranslate());
        var footHeight = $(window).innerHeight() - $('.footer_index').innerHeight();
        var totalHeight = $(window).innerHeight() * ($('.page-pagination .swiper-pagination-bullet').length - 1);
        var iNow = totalHeight - footHeight;

        if (translate >= iNow) {
            mySwiper.setTransition(250);
            mySwiper.setTranslate(-iNow);

            // 底部向上滚动
            if(document.addEventListener){
                document.addEventListener('DOMMouseScroll',scrollFunc,false);
            }
            window.onmousewheel=document.onmousewheel=scrollFunc;//IE/Opera/Chrome

            function scrollFunc(ev){
                e = ev || window.event;  
                if (e.wheelDelta) {  //判断浏览器IE，谷歌滑轮事件               
                    if (e.wheelDelta > 0) { 
                        //当滑轮向上滚动时执行的代码段 
                        mySwiper.slideToLoop(9);
                    }  
                } else if (e.detail) {  //Firefox滑轮事件  
                    if (e.detail < 0) { 
                        //当滑轮向上滚动时执行的代码段   
                        mySwiper.slideToLoop(9);
                    }  
                }
            }

        }else{
            document.body.removeEventListener('scrollFunc', function (event) {
                event.preventDefault();
            },false);
            window.onmousewheel=document.onmousewheel=null;
        }

    }
    
    var mySwiper = new Swiper('.page-container', {
        direction: 'vertical',
        slidesPerView: 1,
        spaceBetween: 0,
        mousewheel: true,
        pagination: {
            el: '.page-pagination',
            clickable: true,
        },
        on:{
            slideChangeTransitionEnd:function (){
                
                // 动画
                $('.title_box').eq(mySwiper.activeIndex-1).show().addClass('animated fadeInDown');
                $('.box').eq(mySwiper.activeIndex-1).show().addClass('animated fadeInUp');

                // 底部高度以及限制滚动距离
                bom_translate();

                // 我们的名字 数字动态
                if (mySwiper.activeIndex == 1 && pageiNow == 0) {
                    var num  = $('.we_box strong');
                    var timer = null;
                    var arr = [];
                    var iNow = [0,0,0,0];
                    for (var i = 0; i < num.length; i++) {
                        arr.push({
                            num: Number.parseFloat($(num).eq(i).text()),    // 数字
                            sign: $(num).eq(i).text().replace(/[0-9]/ig,"") // 符号
                        });
                    }

                    timer = setInterval(function (){
                        for (var i = 0; i < num.length; i++) {
                            if (iNow[i] < arr[i].num) {
                                iNow[i]++;
                                $(num).eq(i).html(iNow[i] + arr[i].sign);
                            }
                            if(i == 2 && iNow[i] <= arr[i].num){
                                iNow[i]+=8;
                            }else if(iNow[i] > arr[i].num){
                                clearInterval(timer);
                            }
                        }
                    },20);

                    pageiNow ++;

                }
            }
        },
    });


    // 页面分页器文字
    var arrText = ['Ba','我','他','掘','优','运','服','团','行','留','底'];
    var paginationBox = $('.page-pagination');

    page();

    function page(){
        var pagination = $('.page-pagination .swiper-pagination-bullet');
        for (var i = 0; i < pagination.length; i++) {
            $(pagination).eq(i).html(arrText[i]);
        } 
        // 最后添加一个返回顶部按钮
        $(paginationBox).append('<span onclick="backtop()" class="pagination-bullet iconfont top">&#xe6b6;</span>');
    }


    // banner
    var swiper = new Swiper('.banner-container', {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        autoplay: true,
        pagination: {
            el: '.banner-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    // banner高度自适应
    $('.banner-container .swiper-slide').css('height',$(window).innerHeight());
    $(window).resize(function() {
        bom_translate();
        $('.banner-container .swiper-slide').css('height',$(window).innerHeight());
        page();
        if ($(window).innerWidth() <= 767) {
        	carousel('.case_box',1,0.8);
        	carousel('.advantage_box',1,0.6);
        	carousel('.operate_box',3,0.8);
        	carousel('.team_box',1,0.8);
        }
    });

   	if ($(window).innerWidth() <= 767) {
    	carousel('.case_box',1,0.8);
    	carousel('.advantage_box',1,0.6);
    	carousel('.operate_box',3,0.8);
    	carousel('.team_box',1,0.8);
    }

    // 首页移动端轮播
    function carousel(box,num,scale){
    	var clientWidth = $('body').innerWidth() * scale;
    	var oUl = $(box).find('ul');
    	var aLi = $(box).find('li');
    	var oNext = $(box).find('.next');
    	var oPrev = $(box).find('.prev');
    	var iNow = 0;

    	if (num == 3) {
    		for (var i = 0; i < aLi.length; i++) {
	    		$(aLi).eq(i).css('width',clientWidth/2);
	    	}
    	}else{
	    	for (var i = 0; i < aLi.length; i++) {
	    		$(aLi).eq(i).css('width',clientWidth);
	    	}
	    }
    	$(oUl).css('width',clientWidth * (aLi.length+1));

    	$(window).resize(function() {
    		if ($(window).innerWidth() <= 767) {
                clientWidth = $('body').innerWidth() * scale;
    			if (num == 3) {
		    		for (var i = 0; i < aLi.length; i++) {
			    		$(aLi).eq(i).css('width',clientWidth/2);
			    	}
		    	}else{
			    	for (var i = 0; i < aLi.length; i++) {
			    		$(aLi).eq(i).css('width',clientWidth);
			    	}
			    }
				$(oUl).css({
                    'width': clientWidth * (aLi.length+1),
                    'margin-left': 0
                });
    		}else{
    			for (var i = 0; i < aLi.length; i++) {
		    		$(aLi).eq(i).css('width','');
		    	}
    			$(oUl).css({
    				'margin-left':0,
    				'width': '100%'
    			});
    		}
    	});

    	$(oNext).on('click', function (){
    		next();
    	});

    	$(oPrev).on('click', function (){
    		prev();
    	});

    	function next(){
    		if (iNow == aLi.length-num) {
    			iNow = 0;
    		}else{
    			iNow ++;
    		}
    		$(oUl).css('margin-left',- iNow * clientWidth);
    	}

    	function prev(){
    		if (iNow == 0) {
    			iNow = aLi.length-num;
    		}else{
    			iNow --;
    		}
    		$(oUl).css('margin-left',- iNow * clientWidth);
    	}

    }

    // 回到底部
    $('#top').on('click', function (){
	  $('.page-pagination span').eq(0).trigger('click');
      $('body, html').animate({scrollTop: 0});
    });

    function backtop(){
        $('.page-pagination span').eq(0).trigger('click');
    }

    // 计算二级导航宽度
    if (document.documentElement.clientWidth <= 767) {
        var aLi = $('.classify li');
        $('.classify ul').css('width',($(aLi).innerWidth()+30) * aLi.length);
    }
    $(window).resize(function (){
        if (document.documentElement.clientWidth <= 767) {
            var aLi = $('.classify li');
            $('.classify ul').css('width',($(aLi).innerWidth()+30) * aLi.length);
        }else{
            $('.classify ul').css('width','');
        }
    });