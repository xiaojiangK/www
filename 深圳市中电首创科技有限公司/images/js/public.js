var public = {};
var sIdTag = '';
var G_ = {};
var wsf = {};
if("undefined" != typeof is_bianji){ 
    if (is_bianji == 1) {
        var Domain=document.domain;
        Domain=Domain.toLowerCase();
        var tmp_arr=Domain.match(/[\w][\w-]*\.(?:com\.cn|net\.cn|org\.cn|com|cn|co|net|org|gov|cc|biz|info|hn|xyz|hk|us|me|mobi|wang|so|top|vip|ltd|red|ru)(\/|$)/);
        Domain=tmp_arr[0];
        document.domain = Domain;
    }
}
// JavaScript Document
/**
 ** 用来得到精确的加、减、乘、除结果
 ** 说明：javascript的四则运算结果会有误差，这个函数返回较为精确的加法结果。
 ** 调用：加：nCount.add(arg1,arg2),
 *  减：nCount.sub(arg1,arg2),
 *  乘：nCount.mul(arg1,arg2),
 *  除：nCount.div(arg1,arg2),
 ** 返回值：arg1和arg2计算后的精确结果
 **/

var nCount = {
    add: function(arg1, arg2) {
        var r1, r2, m, c;
        try {
            r1 = arg1.toString().split(".")[1].length;
        } catch (e) {
            r1 = 0;
        }
        try {
            r2 = arg2.toString().split(".")[1].length;
        } catch (e) {
            r2 = 0;
        }
        c = Math.abs(r1 - r2);
        m = Math.pow(10, Math.max(r1, r2));
        if (c > 0) {
            var cm = Math.pow(10, c);
            if (r1 > r2) {
                arg1 = Number(arg1.toString().replace(".", ""));
                arg2 = Number(arg2.toString().replace(".", "")) * cm;
            } else {
                arg1 = Number(arg1.toString().replace(".", "")) * cm;
                arg2 = Number(arg2.toString().replace(".", ""));
            }
        } else {
            arg1 = Number(arg1.toString().replace(".", ""));
            arg2 = Number(arg2.toString().replace(".", ""));
        }
        return (arg1 + arg2) / m;
    },
    sub: function(arg1, arg2) {
        var r1, r2, m, n;
        try {
            r1 = arg1.toString().split(".")[1].length;
        } catch (e) {
            r1 = 0;
        }
        try {
            r2 = arg2.toString().split(".")[1].length;
        } catch (e) {
            r2 = 0;
        }
        m = Math.pow(10, Math.max(r1, r2)); //last modify by deeka //动态控制精度长度
        n = (r1 >= r2) ? r1 : r2;
        return ((arg1 * m - arg2 * m) / m).toFixed(n);
    },
    mul: function(arg1, arg2) {
        var m = 0,
            s1 = arg1.toString(),
            s2 = arg2.toString();
        try {
            m += s1.split(".")[1].length;
        } catch (e) {}
        try {
            m += s2.split(".")[1].length;
        } catch (e) {}
        return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
    },
    div: function(arg1, arg2) {
        var t1 = 0,
            t2 = 0,
            r1, r2;
        try {
            t1 = arg1.toString().split(".")[1].length;
        } catch (e) {}
        try {
            t2 = arg2.toString().split(".")[1].length;
        } catch (e) {}
        with(Math) {
            r1 = Number(arg1.toString().replace(".", ""));
            r2 = Number(arg2.toString().replace(".", ""));
            return (r1 / r2) * pow(10, t2 - t1);
        }
    }
};
/**
    正则验证(用户名,密码等等...)
    规则:6-20个字符(字母/数字/下划线)
*/
public.yzUsername = function(string) {
    if (string.length == 0) {
        return false;
    }
    if (/^(\w){6,20}$/.test(string)) {
        return true;
    } else {
        return false;
    }
};

// 正则验证邮箱
public.yzEmail = function(email) {
    if (email.length == 0) {
        return false;
    }

    if (/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(email)) {
        return true;
    } else {
        return false;
    }
}

// 获取字符长度
public.getStringLength = function(str) {
    if (str == '') return 0;
    var realLength = 0,
        len = str.length,
        charCode = -1;
    for (var i = 0; i < len; i++) {
        charCode = str.charCodeAt(i);
        if (charCode >= 0 && charCode <= 128) realLength += 1;
        else realLength += 2;
    }
    return realLength;
};


// 电话验证（支持座机和手机）
public.yzTel = function(s) {
    var str = s;
    var reg = /(^(\d{2,4}[-_－—]?)?\d{3,8}([-_－—]?\d{3,8})?([-_－—]?\d{1,7})?$)|(^0?1[35]\d{9}$)/;
    if (reg.test(str) == false) {
        return false;
    } else {
        return true;
    }
};


// 邮编验证
public.yzPostcode = function(s) {
    var str = s;
    var reg = /^[0-9][0-9]{5}$/;
    if (reg.test(str) == false) {
        return false;
    } else {
        return true;
    }
};

//车牌号
public.yzPlateNumber =function(s){
    var str = s;
    var reg = /^([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Za-z]{1}[A-Za-z]{1}[A-Za-z0-9]{4}[A-Za-z0-9挂学警港澳]{1})|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Za-z]{1}[A-Za-z]{1}(([0-9]{5}[DFdf])|([DFdf][A-Za-z0-9][0-9]{4})))$/;//A-HJ-NP-Za-hj-np-z
    if (reg.test(str) == false) {
        return false;
    } else {
        return true;
    }
}

// 判断小数位是否有值，无没有转换成整形
public.yzIsdecimal = function(str) {
    var reg = /(\.00)$/;
    if (reg.test(str) == false) {
        return str;
    } else {
        return parseInt(str);
    }
};
// 验证手机
public.yzMobile = function(tel) {
    var reg = /(^0{0,1}1[0-9]{1}[0-9]{9}$)/;
    if (reg.test(tel)) {
        tel = true;
        return tel;
    } else {
        tel = false;
        return tel;
    }
};

//复制模块
public.getCopyModuleInfo = function(module_set_id,userid) {
    var t=[];
   $.ajax({
        url:'/wap/wapCopyModule.php?username='+user_name+'&action=1&copy_module_set_id='+module_set_id+'&userid='+userid,
        type:'get',
        async: false,
        dataType:"json",
        error: function(a,b,c){
            console.log(11);
        },
        success: function(data){
            if(data){
                t=data;
            }
        }
     })
     return t;
};

// 分类模块更多
public.moreBtn = function(o){
    var tHtml = '<div class="moreBtnAlt"><h2><a href="###" class="delBtnAlt">x</a></h2><div class="moreList"><ul><li class="cur"><a href="###">关注</a></li><li><a href="###">推荐</a></li><li><a href="###">推荐</a></li><li><a href="###">推荐</a></li><li><a href="###">推荐</a></li><li><a href="###">推荐</a></li><li><a href="###">推荐</a></li><li><a href="###">推荐</a></li></ul></div></div>';
    var obj = $(tHtml),winH = $(window).height();
    obj.css({"height":winH+'px',"top":"100%"});
    $("body").append(obj);
    obj.animate({"top":"0"});
    obj.find("li").click(function(){
        $(this).addClass("cur").siblings().removeClass("cur");
    })
    obj.find(".delBtnAlt").click(function(){
        obj.animate({"top":"100%"},function(){
            $(this).remove();
        });
    })
};

// 微信客服二维码
public.wxServer = function(url,txt){
    url ? url = url : url = 'http://img.ev123.com/pic/nopic/150_150.jpg';
    txt ? txt = txt : txt = '请使用手机微信扫描二维码';
    var tHtml = '<div class="wxServerAlt"><div class="altMain"><span class="pic"><img src="'+url+'"></span><h2>'+txt+'</h2></div></div>';
    var obj = $(tHtml);
    $("body").append(obj);
    obj.click(function(){
        obj.remove();
    })
    obj.find(".altMain").click(function(e){
        e.stopPropagation();
    })
};

function showAllzz(tit, jsons) {
    var allZZ = $('<div id="allZZ" class="allzz"><div class="alertDiv"><div class="promptText">回复成功</div><div class="promptBut"><a href="###">继续回复</a><a href="###">关闭</a></div></div></div>'),
        h = $(document).height(),
        ah = $(document).scrollTop() + $(window).height() / 2,
        i = 0;

    allZZ.find(".promptText").html(tit), alertDiv = allZZ.find(".alertDiv");

    if (!jsons) {
        jsons = {
            '关闭': 'javascript:;'
        };
    }

    var x, aArray = "";
    for (var x in jsons) {
        i++;
        aArray += typeof(jsons[x]) === 'string' ? '<a href="' + jsons[x] + '">' + x + '</a>' : '<a href="' + jsons[x].url + '">' + jsons[x].title + '</a>';
    }
    allZZ.find(".promptBut").html(aArray);


    allZZ.find(".promptBut").find("a").css({
        'width': 100 / i + "%"
    }).click(function() {
        allZZ.remove();
    });

    allZZ.css({
        "height": h + "px"
    }).appendTo('body');
    alertDiv.css({
        "margin-top": ah - alertDiv.height() / 2
    });
}


//定时弹窗
function alert_frame(val_text) {
    $("body").append('<div class="alert_frame" id="alert_frame"><div class="alert_frame_bg"></div><div class="alert_frame_c">' + val_text + '</div></div>');
    var time_ = 1000,
        frame_id = $("#alert_frame"),
        text_w = $(".alert_frame_c").outerWidth() / 2,
        text_h = $(".alert_frame_c").outerHeight() / 2;
    $(".alert_frame_c").css({
        "top": "50%",
        "left": "50%",
        "margin-top": -text_h,
        "margin-left": -text_w,
        "z-index":999999
    });
    $(".alert_frame_bg").css("background","none");
    setTimeout(function() {
        $("body").find("#alert_frame").remove();
    }, time_);
}

//在窗口中显示二维码
function showAllewm(tit, wenzi) {
    var allZZ = $('<div id="allZZ" class="allzz"><div class="alertDiv"><div class="promptText"><div class="ewmstyle">回复成功</div><div class="wenzi"></div></div><div class="promptBut"><a href="###" style="width: 100%;">关闭</a></div></div></div>'),
        h = $("body").height(),
        ah = $(document).scrollTop() + $(window).height() / 2,
        i = 0;

    allZZ.find(".ewmstyle").html(tit), allZZ.find(".wenzi").html(wenzi), alertDiv = allZZ.find(".alertDiv");

    allZZ.find(".promptBut").find("a").click(function() {
        allZZ.remove();
    });

    allZZ.css({
        "height": h + "px"
    }).appendTo('body');
    alertDiv.css({
        "margin-top": ah - alertDiv.height() / 2
    });
}
//判断是否为微信
function is_weixn() {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return false;
    } else {
        return true;
    }
}
//加载中遮罩层
function alert_layer() {
    $("body").append('<div class="alert_layer" id="alert_layer"><div class="alert_layer_bg"></div><div class="alert_layer_c"><img src="/images/loading.gif" class="loading_img"></div></div>')
}
//删除遮罩层
function del_layer() {
    $("#alert_layer").remove();
}

//页面分享模块
$(function() {
    $('div.shareModule span').on("click", function() {
        var ua = navigator.userAgent.toLowerCase();
        var is_weixn = (ua.match(/MicroMessenger/i) == "micromessenger") ? 1 : 0;
        if (is_weixn) {
            fJson.weixin()
        } else {
            var tmpClass = $(this).attr('class');
            fJson[tmpClass]();
        }
    });
    $('#closeSpecHtml').click(function() {
        $('#specHtml').hide();
        if ($('#return_top').length > 0) {
            $('#return_top').show();
        }
        if ($('#fixedShopCar').length > 0) {
            $('#fixedShopCar').show();
        }
        if ($('#fixed_nav_but').length > 0) {
            $('#fixed_nav_but').show();
        }
        var buyBtn = $('#inner_nowBuy'),
            addCat = $('#inner_addCat');
        //产品内页购买按钮自定义
        buyBtn.html(define_pro_buy_text);
        addCat.html(define_pro_add_text);
        buyBtn.removeAttr("style");
        addCat.removeAttr("style");
        buyBtn.css('right', '0px');
        addCat.css('right', '90px');
        if ($('#footerMoneyContent').length > 0) {
            $('#footerMoneyContent').hide();
        }
        $('#serverProductBtn').show();

        // 预售
        if (buyBtn.attr('date-presales') == 1){
            var end_time=$("#presalse_end_time").val();
            $(".preSaleBuy a").html('<font>'+end_time+'结束</font> 支付定金');
            $(".preSaleBuy a").attr('date-presales',1);
            $(".preSaleBuy a").attr('pay','success');
            // var html = '<a href="###" class="ActivityRight1 specPresale inner_nowBuy" id="inner_nowBuy" date-presales="1" pay="success"><font>'+end_time+'结束</font> 支付定金</a></div>';
            // $(".preSaleBuy").html(html);
            $(".preSaleBuy").css({'width':'auto','padding':'0px 10px'});
        }
    });
    // 判断系统搜索定位
    $(window).scroll(function(){
        var offTop = $(this).scrollTop();
        if($("#sysSearch").length){
            if(offTop <= 0){
                $("#sysSearch").css("position","absolute");
            }else{
                $("#sysSearch").css("position","fixed");
            }
        }
    })
});

 // 倒计时函数
wsf.countDown = function(j) {
    var r = function(t) {
            var a = t.split(' '),
                ymd = a[0],
                hms = a[1],
                str = ymd.split('-'),
                fix = hms.split(':'),
                year = str[0] - 0,
                month = str[1] - 0 - 1,
                day = str[2] - 0,
                hour = fix[0] - 0,
                minute = fix[1] - 0,
                second = fix[2] - 0,
                time = (new Date(year, month, day, hour, minute, second)).getTime();
            return parseInt(time / 1000);
        },
        o = j.o,
        st = r(j.st),
        et = r(j.et),
        nts = j.nt ? r(j.nt) : (new Date().getTime() / 1000),
        n_underway = function() {
            var y, m, d, h, mi, s, now = nts,
                c = et - now,
                html_;
            nts = nts + 1;
            if (c > 0) {
                d = Math.floor(c / (60 * 60 * 24));
                h = Math.floor((c - d * 24 * 60 * 60) / 3600);
                mi = Math.floor((c - d * 24 * 60 * 60 - h * 3600) / 60);
                s = Math.floor(c - d * 24 * 60 * 60 - h * 3600 - mi * 60);
                h = h < 10 ? '0' + h : h;
                mi = mi < 10 ? '0' + mi : mi;
                s = s < 10 ? '0' + s : s;
                html_ = '<span class="count-time"><i>' + d + '</i><em>天</em><i>' + h + '</i><em>时</em><i>' + mi + '</i><em>分</em><i>' + s + '</i><em>秒</em></span>';
                o.html(html_);
                setTimeout(function() {
                    n_underway();
                }, 1000);
            } else {
                typeof j.efun == 'function' && j.efun();
                // o.html('活动已经结束！');
            }
        },
        b_underway = function() {
            var y, m, d, h, mi, s, now = nts,
                c = st - now,
                html_;
            nts = nts + 1;
            if (c > 0) {
                d = Math.floor(c / (60 * 60 * 24));
                h = Math.floor((c - d * 24 * 60 * 60) / 3600);
                mi = Math.floor((c - d * 24 * 60 * 60 - h * 3600) / 60);
                s = Math.floor(c - d * 24 * 60 * 60 - h * 3600 - mi * 60);
                h = h < 10 ? '0' + h : h;
                mi = mi < 10 ? '0' + mi : mi;
                s = s < 10 ? '0' + s : s;
                html_ = '<span class="count-time"><i>' + d + '</i><em>天</em><i>' + h + '</i><em>时</em><i>' + mi + '</i><em>分</em><i>' + s + '</i><em>秒</em></span>';
                o.html(html_);
                setTimeout(function() {
                    b_underway();
                }, 1000);
            } else {
                n_underway();
                typeof j.nfun == 'function' && j.nfun();
            }
        };
    // 判断状态
    if ((st - nts) > 0) {
        typeof j.sfun == 'function' && j.sfun();
        b_underway();
    } else if ((nts - et) > 0) {
        typeof j.efun == 'function' && j.efun();
        // o.html('活动已经结束！');
    } else {
        n_underway();
        typeof j.nfun == 'function' && j.nfun();
    }
};
//时间戳
function UTCTimeDemo() {
    var now = new Date().getTime();
    var datestr = escape(now * 1000 + Math.round(Math.random() * 1000));
    return datestr;
}
var moduleMoveFun = function(t) {
    var t_id = t.obj; // 滚动对象
    var _time = t._time; // 滚动速度 1-4 快-慢
    var s_way = t.s_way; // 滚动方式 1：横向滚动 2：纵向滚动 3: 触屏左右滑动
    var s_type = t.s_type; // 滚动类型 1：单项滚动 2：连续滚动
    var li_x = t.li_x; // 每行显示数量
    var li_y = t.li_y; // 显示几行
    var list_length = t.list_length; // 展示图片数量
    var num = t.num; // 初始值 0
    // var win_w = $(".exhibition_map").parent().width();
    var win_w = t_id.width();
    var demo_c = t_id.find(".exhibition_demo");
    var set_time = "";
    var touch_s = "",
        touch_m = "",
        touch_e = "";
    var xy = li_x * li_y;
    // var List_num = t_id.find(".demo1 li").length;
    var li_w = Math.ceil(win_w / li_x);
    demo_c.find("li .pic").css({
        "height": li_w - 10,
        "line-height": li_w - 14 + 'px'
    });
    var li_h = demo_c.find("li").outerHeight(),
        ceil_x = Math.ceil(list_length / li_y),
        ceil_y = Math.ceil(list_length / li_x);
    // ceil_x = Math.ceil(list_length/li_y),
    // ceil_y = Math.ceil(list_length/li_x);
    // 滚动速度
    if (s_type == 1) {
        switch (_time) {
            case 1:
                _time = 1000;
                break;
            case 2:
                _time = 2000;
                break;
            case 3:
                _time = 3000;
                break;
            case 4:
                _time = 4000;
                break;
        }
    } else {
        switch (_time) {
            case 1:
                _time = 10;
                break;
            case 2:
                _time = 20;
                break;
            case 3:
                _time = 30;
                break;
            case 4:
                _time = 40;
                break;
        }
    }

    // 添加滚动
    function add_scroll() {
        if (s_way == 1) {
            if (s_type == 1) {
                num += li_w;
                t_id.animate({
                    "scrollLeft": num
                });
            } else {
                num += 1;
                t_id.scrollLeft(num);
            }
        } else {
            if (s_type == 1) {
                num += li_h;
                t_id.animate({
                    "scrollTop": num
                });
            } else {
                num += 1;
                t_id.scrollTop(num);
            }
        }
    }

    function scroll_set(scrollL) {
        var WorH = "",
            scroll_type = "",
            scroll_val = "";
        switch (s_way) {
            case 1:
                scroll_type = t_id.scrollLeft();
                WorH = t_id.find("ul").outerWidth();
                t_id.find("ul").css("float", "left");
                break;
            case 2:
                scroll_type = t_id.scrollTop();
                WorH = t_id.find("ul").outerHeight();
                t_id.find("ul").css("float", "none");
                break;
            case 3:
                // WorH = t_id.find("ul").outerWidth();
                // t_id.find("ul").css("float","left");
                break;
        }
        if (s_way == 1 || s_way == 2) {
            if (scroll_type >= WorH) {
                if (s_way == 1) {
                    num = 0;
                    t_id.scrollLeft(num);
                } else {
                    num = 0;
                    t_id.scrollTop(num);
                }
                t_id.find("ul:first").insertAfter(t_id.find("ul:last"));
                add_scroll();
            } else {
                add_scroll();
            }
        } else {
            /*if(touch_s > touch_e){
                if(t_id.scrollLeft() >= WorH){
                    t_id.scrollLeft(t_id.scrollLeft()-WorH);
                }
                num = t_id.scrollLeft() + t_id.width();
            }else if(touch_s < touch_e){
                if(t_id.scrollLeft() <= 0){
                    t_id.scrollLeft(t_id.scrollLeft()+WorH);
                }
                num = t_id.scrollLeft() - t_id.width();
            }
            t_id.animate({"scrollLeft":num},function(){
                if(touch_s > touch_e && num >= WorH){
                    t_id.scrollLeft(t_id.scrollLeft()-WorH);
                }else if(touch_s < touch_e && num <= 0){
                    t_id.scrollLeft(t_id.scrollLeft()+WorH);
                }
            });*/
            if (touch_s > touch_e) {
                // num = t_id.scrollLeft() + t_id.width();
                num = scrollL + t_id.width();
                t_id.siblings(".touch_dot").children(".cur").next().addClass("cur").siblings().removeClass("cur");
            } else if (touch_s < touch_e) {
                num = scrollL - t_id.width();
                // num = t_id.scrollLeft() - t_id.width();
                t_id.siblings(".touch_dot").children(".cur").prev().addClass("cur").siblings().removeClass("cur");
            }
            // console.log(num);
            t_id.animate({
                "scrollLeft": num
            });
            // t_id.css("overflow","hidden");
        }
    }
    if (s_way == 1 || s_way == 2) {
        set_time = setInterval(scroll_set, _time);
        /*t_id.hover(function() {
            clearInterval(set_time);
        }, function() {
            set_time = setInterval(scroll_set, _time);
        })*/
    } else {
        var sc_l;
        t_id.on("touchstart", function(e) {
                sc_l = t_id.scrollLeft();
                t_id.css("overflow", "auto");
                var _touch = e.originalEvent.targetTouches[0];
                var _x = _touch.pageX;
                touch_s = _x;
            })
            /*t_id.on("touchmove",function(e){
                e.preventDefault();
                // e.stopPropagation();
            })*/
        t_id.on("touchend", function(e) {
            t_id.css("overflow", "hidden");
            var _touch = e.originalEvent.changedTouches[0];
            var _x = _touch.pageX;
            touch_e = _x;
            scroll_set(sc_l);
        })
    }
    if (s_way == 1) {
        if (xy >= list_length) {
            demo_c.find("ul").width(li_w * li_x);
            demo_c.css("width", win_w * 2+10);
        } else {
            demo_c.find("ul").width(li_w * ceil_x);
            demo_c.css("width", demo_c.find("ul").width() * 2);
        }
    } else if (s_way == 2) {
        demo_c.find("ul").width(li_w * li_x);
        demo_c.css("width", win_w);
        if (xy >= list_length) {
            demo_c.height((li_h * li_y) * 2);
            demo_c.find("ul").height(li_h * li_y);
            t_id.css("height", li_h * li_y);
        } else {
            demo_c.height((li_h * ceil_y) * 2);
            demo_c.find("ul").height(li_h * ceil_y);
            t_id.css("height", li_h * li_y);
        }
    } else {
        /*if(xy >= list_length){
            demo_c.find("ul").width(li_w * li_x);
            demo_c.css("width",win_w*2);
        }else{
            demo_c.find("ul").width(li_w * ceil_x);
            demo_c.css("width",demo_c.find("ul").width() * 2);
        }*/
        var dot = "";
        if (xy >= list_length) {
            demo_c.find("ul").width(li_w * ceil_x);
            demo_c.css("width", win_w);
            dot += '<em class="cur"></em>';
        } else {
            var i = 1;
            var dotNum = Math.ceil(ceil_x / li_x);
            var demo_c_w = win_w * dotNum;
            demo_c.find("ul").width(li_w * ceil_x);
            demo_c.css("width", demo_c_w);
            for (i; i <= dotNum; i++) {
                if (i == 1) {
                    dot += '<em class="cur"></em>';
                } else {
                    dot += '<em></em>';
                }
            }
        }
        t_id.parent().append('<div class="touch_dot">' + dot + '</div>');
    }
    demo_c.find("li").width(li_w);
    demo_c.find(".demo2").html(demo_c.find(".demo1").html());
    if (s_way == 1 || s_way == 2) {
        demo_c.find(".demo2").show();
        demo_c.find(".demo2").html(demo_c.find(".demo1").html());
    } else {
        demo_c.find(".demo2").hide();
    }

    // 标题文字居中显示
    demo_c.find("li.img_c").each(function() {
        var t = $(this);
        var P_height = t.find(".text_list_bk").height();
        t.find(".text_list_bk").css("margin-top", -P_height / 2);
    })
};

//点赞公用
wsf.userLike = function(recordId, type, objectId, style, operate, user_name, part, html, location) {
    //没有登录通过cookie验证是否点赞
    var zz_userid = readCookie('zz_userid');
    if (!zz_userid && operate == 'like') {
        var userLikeRecord = readCookie('user_like_record');
        var tmpStr = type + '*' + recordId;
        //已赞过
        if (userLikeRecord.indexOf(tmpStr) != -1) {
            alert_frame('已赞过');
            return false;
        }

        //每日限制100次
        var tmpArr = userLikeRecord.split('#');
        if (tmpArr.length >= 100) {
            alert_frame('每日最多点赞100次');
            return false;
        }
    }
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/Public/UserOperate.php',
        data: {
            username: user_name,
            rid: recordId,
            opt: operate,
            type: type,
            part: part,
            t: Date.parse(new Date())
        },
        success: function(data) {
            if (data.errorcode > 0) {
                alert_frame(data.errormsg);
            } else {
                var obj = $("#" + objectId);
                if(html){
                    obj.html(html.replace('{n}', data.num));
                }else{
                    if (operate == 'browse') {
                        if (location) {
                            obj.html('阅读'+data.num);
                        } else {
                            obj.html(data.num+'阅读');
                        }
                    } else {
                        obj.html(data.errormsg);
                    }
                }

                var styleArr = style.split('#');

                if (operate == 'like' || data.liked)
                {
                    obj.data('opt', "unLike");
                    obj.removeClass(styleArr[0]);
                    obj.addClass(styleArr[1]);
                    if(operate == 'like') alert_frame('点赞成功');
                }
                else if (operate == 'unLike')
                {
                    obj.data('opt', "like");
                    obj.removeClass(styleArr[1]);
                    obj.addClass(styleArr[0]);
                    alert_frame('取消成功');
                }
            }
        }
    });
};

//列表页点赞
wsf.userLikeList = function(recordId, type, obj, style, operate, user_name, part, html, location) {
    //没有登录通过cookie验证是否点赞
    var zz_userid = readCookie('zz_userid');
    if (!zz_userid && operate == 'like') {
        var userLikeRecord = readCookie('user_like_record');
        var tmpStr = type + '*' + recordId;
        //已赞过
        if (userLikeRecord.indexOf(tmpStr) != -1) {
            alert_frame('已赞过');
            return false;
        }

        //每日限制100次
        var tmpArr = userLikeRecord.split('#');
        if (tmpArr.length >= 100) {
            alert_frame('每日最多点赞100次');
            return false;
        }
    }
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/Public/UserOperate.php',
        data: {
            username: user_name,
            rid: recordId,
            opt: operate,
            type: type,
            part: part,
            t: Date.parse(new Date())
        },
        success: function(data) {
            if (data.errorcode > 0) {
                alert_frame(data.errormsg);
            } else {
                obj.find('span').html('&nbsp'+data.num);
                obj.find('em').addClass('cur');
                var styleArr = style.split('#');
                if (operate == 'like' || data.liked)
                {
                    obj.attr('data-opt', "unLike");
                    if(operate == 'like') alert_frame('点赞成功');
                }
                else if (operate == 'unLike')
                {
                    obj.find('em').removeClass('cur');
                    obj.attr('data-opt', "like");
                    alert_frame('取消成功');
                }
            }
        }
    });
};
// 动画加载效果
wsf.loadAnimate = function() {
    var getDom = [];
    $(".load-animate[data-animate-name][data-animate-delay][data-animate-duration]").each(function(i, dom) {
        dom = $(dom);
        dom.is(':visible') && getDom.push({
            'dom': dom,
            'st': dom.attr('style') || '',
            'oTop': dom.offset().top,
            'loaded': false,
            'aName': dom.data('animate-name'),
            'aDelay': dom.data('animate-delay'),
            'aDuration': dom.data('animate-duration'),
            'evContainer': dom.parent().hasClass('ev-tab-container-two') ? 1 : null
        });
    });
    var addAnimate = function(s, h) {
        if (getDom.length > 0) {
            $.map(getDom, function(v, i) {
                if (!v.loaded && ((v.oTop > s && v.oTop < s + h) || (v.oTop < s && v.oTop + v.dom.height() > s)) || (!v.loaded && v.oTop == 0)) {
                    if ($.browser && $.browser.msie && $.browser.msie < 9) {
                        v.dom.removeClass('load-animate');
                        v.loaded = true;
                    } else {
                        v.dom.addClass('animated ' + v.aName).css({
                            'animation-delay': v.aDelay,
                            'animation-duration': v.aDuration
                        });
                        setTimeout(function() {
                            v.dom.removeClass('load-animate');
                        }, v.aDelay.slice(0, v.aDelay.length - 1) * 1000);
                        setTimeout(function() {
                            v.dom.attr('style', v.st).removeClass('animated ' + v.aName);
                        }, v.aDelay.slice(0, v.aDelay.length - 1) * 1000 + v.aDuration.slice(0, v.aDuration.length - 1) * 1000 + 10);
                        v.loaded = true;
                        if (v.evContainer) {
                            v.dom.attr('data-loadAnimate', 1).data('loadAnimate', 1);
                        }
                    }
                }
            });
        }
    };
    var window_ = window;
    $(window_).on({
        'scroll.loadAnimate': function() {
            addAnimate($(this).scrollTop(), $(this).height());
        }
    });
    addAnimate($(window_).scrollTop(), $(window_).height());
};
// $('#shareModule span').live("click",function(){
//  var ua = navigator.userAgent.toLowerCase();
//   var is_weixn = (ua.match(/MicroMessenger/i)=="micromessenger") ? 1 : 0;
//   if(is_weixn){
//     fJson.weixin()
//   }else{
//      var tmpClass = $(this).attr('class');
//      fJson[tmpClass]();
//   }

// });

// 将实体转换为字符
function decodeHtmlEntity(str) {
    return str.replace(/&#(\d+);/g, function(match, dec) {
        return String.fromCharCode(dec);
    });
}

/**
 * 验证小数,默认为2位
 *
 * @param number
 * @param decimals
 * @returns {boolean}
 */
function checkNumber(number, decimals) {
    var is_number = false;

    decimals = !decimals ? 2 : decimals;

    var reg = new RegExp("^\\d{1,10}(\\.\\d{1,"+ decimals +"})?$");

    if(reg.test(number) !== false) {
        is_number=true;
        return is_number;
    }else{
        is_number =false;
        return is_number;
    }
}

// 公告特效
/*function NoticeModule(id,axis,speed,type){
    var scroll = 0;
        tId = $("#"+id),
        tLi = tId.find("li"),
        liW = tLi.width(),
        liH = tLi.height();
    switch(speed){
        case "slowly":
            speed = 150;
            break;
        case "slow":
            speed = 100;
            break;
        case "normal":
            speed = 60;
            break;
        case "quick":
            speed = 30;
            break;
        case "quickly":
            speed = 5;
            break;
    }
    if(tLi.length < 2){
        tId.find("ul").append("<li>"+tLi.html()+"</li>");
    }
    if(axis == "left"){
        tLi.css({"float":"left","width":liW+"px"});
        tId.find("ul").width(tLi.length*liW);
    }
    tId.parent().height(liH);
    var date = setInterval(function(){
        scroll++;
        if(axis == "left"){
            //tId.find("ul").css("margin-left",-scroll+'px');
            if(scroll >= liW){
                tId.find("ul li:first").insertAfter(tId.find("ul li:last"));
                scroll = 0;
                tId.find("ul").scrollLeft(0);
            }else{
                tId.find("ul").scrollLeft(scroll);
            }
        }else{
            //tId.find("ul").css("margin-top",-scroll+'px');
            if(scroll >= liH){
                tId.find("ul li:first").insertAfter(tId.find("ul li:last"));
                scroll = 0;
                tId.parent().scrollTop(0);
            }else{
                tId.parent().scrollTop(scroll);
            }
        }
    },speed);

}*/
//模块移动函数 主要是拖拽版的单模块内容移动效果
(function($){
  $.fn.extend({
    "move2Module" : function(options){
      return this.each(function(){
        var defaultO = {
          axis : "top",
          speed : "slow",
          type : "flow",
          hand : false
        };
        var O = $.extend(defaultO,options);
        var speed = 100;
        if(O.type == "flow")
        {
          switch(O.speed){
            case "slowly":
              speed = 150;
            break;
            case "slow":
              speed = 100;
            break;
            case "normal":
              speed = 60;
            break;
            case "quick":
              speed = 30;
            break;
            case "quickly":
              speed = 5;
            break;
          }
        }else if(O.type == "single")
        {
          switch(O.speed){
            case "slowly":
              speed = 5000;
            break;
            case "slow":
              speed = 4000;
            break;
            case "normal":
              speed = 3000;
            break;
            case "quick":
              speed = 2000;
            break;
            case "quickly":
              speed = 1000;
            break;
          }
        }
        var _this = $(this),
            lilength = _this.find("ul li").length,
            movepx = 0,
            times=null,
            thisPar = $(this).parent();
        thisPar.height(_this.find("li:first").outerHeight());
        var thisParH = thisPar.height(),
            thisParW = thisPar.width(),
            firstChild = _this.children().first();
        if(O.axis == "top" || O.axis == "bottom"){
         var thisH = _this.height();
        }else if(O.axis == "left" || O.axis == "right"){
          if(_this.hasClass("proListmodule_1")){
            firstChild.children().width(thisParW);
          }
          var thisW = firstChild.width();
          _this.find("ul,li").css("float","left");
          _this.find("li").css("min-width",thisParW);
          // _this.find("li").width(thisParW);
          _this.find("ul").width(firstChild.width()*lilength);
          _this.width(firstChild.width()*2+10);
          // _this.width(firstChild.width()*2+10);
          }
          var clone = $(firstChild.clone());
        //向上
        if(O.axis == "top")
        {
          movepx = 0;
          _this.append(clone);
          times=setInterval(moveT,speed);
          /*_this.bind("mouseout",function(){
              times = setInterval(moveT,speed);
          });
          _this.bind("mouseover",function(){
            clearInterval(times);
          });*/
        }
        //向下
        if(O.axis == "bottom")
        {
          movepx = -(thisH+(thisH - thisParH));
          _this.css({"margin-top":-thisH}).append(clone);
            times=setInterval(moveB,speed);
            /*_this.bind("mouseout",function(){
              times = setInterval(moveB,speed);
            });
          _this.bind("mouseover",function(){
              clearInterval(times);
          });*/
        }
        //向左
        if(O.axis == "left")
        {
          movepx = 0;
          _this.css({"margin-left":0}).append(clone);
            times=setInterval(moveL,speed);
            /*_this.bind("mouseout",function(){
              times = setInterval(moveL,speed);
            });
          _this.bind("mouseover",function(){
              clearInterval(times);
          });*/
        }
        //向右
        if(O.axis == "right")
        {
          movepx = -(thisW);
          _this.css({"margin-left":movepx}).append(clone);
            times=setInterval(moveR,speed);
           /* _this.bind("mouseout",function(){
              times = setInterval(moveR,speed);
            });
          _this.bind("mouseover",function(){
              clearInterval(times);
          });*/
        }
        //下移动函数
        function moveB()
        {
          if(thisH!=firstChild.height()){
            thisH = firstChild.height();
          }
          var mt = parseInt(_this.css("margin-top"));
          var itemH = firstChild.children().outerHeight();
          if(O.type=="flow")
          {
            if(mt<0){
              _this.css("margin-top",movepx);
              movepx++;
            }else{
              movepx=-thisH;
              _this.css("margin-top",movepx);
            }
          }else if(O.type == "single"){
            if(mt<0){
                _this.animate({"margin-top":mt+itemH},500);
            }else{
                _this.css("margin-top",-thisH);
                _this.animate({"margin-top":-(thisH-itemH)},500);
            }
          }
        }
        //上移动函数
        function moveT()
        {
          if(thisH!=firstChild.height()){
            thisH = firstChild.height();
          }
          var itemH = firstChild.children().outerHeight();
          var mt = Math.abs(parseInt(_this.css("margin-top")));
          if(O.type == "single"){
            if(mt<thisH){
                _this.animate({"margin-top":-(mt+itemH)},500);
            }else{
                _this.css("margin-top",0);
                _this.animate({"margin-top":-(itemH)},500);
            }
          }else if(O.type == "flow"){
            if(mt<thisH){
              _this.css("margin-top",-movepx);
              movepx++;
            }else{
              movepx=0;
              _this.css("margin-top",-movepx);
            }
          }
        }
        //左移动
        function moveL()
        {
          if(thisParW!=_this.parent().width()){
            if(_this.hasClass("proListmodule_1")){
              thisParW = _this.parent().width();
              firstChild.children().width(thisParW);
              clone.remove();
              clone = $(firstChild.clone());
              _this.css({"margin-left":0}).append(clone);
              thisW = firstChild.width();
              _this.width(firstChild.width()*2);
            }
          }
          thisW = _this.find("ul").width();
          var itemW = firstChild.children().outerWidth();
          var ml = Math.abs(parseInt(_this.css("margin-left")));
          if(O.type == "single"){
            if(ml<thisW){
              _this.animate({"margin-left":-(ml+itemW)},500);
            }else{
              _this.css("margin-left",0);
              _this.animate({"margin-left":-(itemW)},500);
            }
          }else if(O.type == "flow"){
            if(ml<thisW){
              _this.css("margin-left",-movepx);
              movepx++;
            }else{
              movepx=0;
              _this.css("margin-left",-movepx);
            }
          }
        }

        //右移动
        function moveR()
        {
          if(thisParW!=_this.parent().width()){
            if(_this.hasClass("proListmodule_1")){
              thisParW = _this.parent().width();
              firstChild.children().width(thisParW);
              clone.remove();
              clone = $(firstChild.clone());
              _this.css({"margin-left":-firstChild.width()}).append(clone);
              thisW = firstChild.width();
              _this.width(firstChild.width()*2);
            }
          }
          var itemW = firstChild.children().outerWidth();
          var ml = parseInt(_this.css("margin-left"));
          if(O.type == "single"){
            if(ml<0){
              _this.animate({"margin-left":ml+itemW},500);
            }else{
              _this.css("margin-left",-thisW);
              _this.animate({"margin-left":-(thisW-itemW)},500);
            }
          }else if(O.type == "flow"){
            if(ml<0){
              _this.css("margin-left",movepx);
              movepx++;
            }else{
              movepx=0;
              _this.css("margin-left",movepx);
            }
          }
        }

      });
    }
  });
})(jQuery);

// 3D焦点图效果
function swiper3DBanner(j) {
    this.box = document.querySelector(j.dom);
    this.bannerH = $(j.dom).height();
    this.picList = this.box.querySelector('.banner-pic-3d');
    this.children = this.picList.querySelectorAll('li');
    this.navList = this.box.querySelector('#banner_nav');
    this.count = this.children.length;
    this.autoPlay = null;
    this.autoTime = j.autoTime || 3000;
    var x0, y0, quen, lock = 0,
        css = ['transform:translate3d(0,0,10px) scale3d(1,1,1);z-index:3;visibility:visible;', 'transform:translate3d(-100px,0,6px) scale3d(0.8,0.8,1);z-index:2;visibility:visible;opacity:0.6;', 'transform:translate3d(100px,0,6px) scale3d(0.8,0.8,1);z-index:2;visibility:visible;opacity:0.6;', 'transform:translate3d(-200px,0,2px) scale3d(0.667,0.667,1);z-index:1;visibility:visible;', 'transform:translate3d(200px,0,2px) scale3d(0.667,0.667,1);z-index:1;visibility:visible;'];
    var startT = function(e) {
        x0 = e.targetTouches[0].pageX;
        y0 = e.targetTouches[0].pageY;
        lock = 0;
        if(this.autoPlay){
            clearInterval(this.autoPlay);
            this.autoPlay = null;
        }
    }.bind(this);
    var MoveT = function(e) {
        if (lock == 1) return;
        var x = e.targetTouches[0].pageX,
            y = e.targetTouches[0].pageY,
            offsetX = x - x0;
        if (offsetX >= 50) {
            this.quen.unshift(this.quen.pop());
            lock = 1;
            swap();
        } else if (offsetX <= -50) {
            this.quen.push(this.quen.shift());
            lock = 1;
            swap();
        }
    }.bind(this);
    var autoPlay = function(){
        var This = this;
        This.autoPlay = setInterval(function(){
        This.quen.push(This.quen.shift());
        swap();
        }, This.autoTime);
    }.bind(this);
    var swap = function() {
        var count = this.count,
            This = this,
            quen = [].concat(This.quen),
            last = count - 1,
            NewList = new Array(count),
            num = 0,
            odd = 1;
        while (num < 3 && count > 0) {
            var curVal = odd ? quen.shift() : quen.pop();
            if(num == 0){
                var iEle = This.navList.querySelectorAll('span');
                for(var x = 0; x < iEle.length; x++){
                    if(x == curVal){
                        iEle[x].setAttribute('class','cur');
                        This.box.style.backgroundColor = This.children[x].getAttribute('bcolor');
                    }else{
                        iEle[x].removeAttribute('class');
                    }
                }
            }
            NewList[curVal] = css[num++];
            odd = !odd;
        }
        for (var i = 0; i < count; i++) {
            this.children[i].style.cssText = NewList[i] || 'visibility: hidden';
            this.children[i].style.height = this.bannerH + 'px';
            this.children[i].getElementsByTagName('a')[0].style.backgroundSize = '100% 100%';
        }
        if(!this.autoPlay){
            autoPlay();
        }
    }.bind(this);
    this.init = function() {
        this.picList.style.height = this.bannerH + 'px';
        this.quen = function(len) {
            var attr = [];
            for (var i = 0; i < len; i++) {
                attr[i] = i;
            }
            return attr;
        }(this.count);
        var s = this.quen;
        for (var i = 0; i < this.count; i++) {
            var  iEle= document.createElement('span');
            if(i == 0){
                iEle.setAttribute('class','cur');
            }
            var imgurl = this.children[i].getAttribute('bigpic');
            var a = this.children[i].querySelectorAll('a');
            a[0].style.backgroundImage = 'url('+imgurl+')';
            this.children[i].style.visibility = 'hidden';
            this.navList.appendChild(iEle);
            this.navList.setAttribute('class','banner-nav-1');
        };
        swap();
        picList.addEventListener('touchstart', startT);
        picList.addEventListener('touchmove', MoveT);
    };
    var list = document.querySelector(j.dom);
    var picList = list ? list.querySelector('.banner-pic-3d') : null;
    picList && this.init();
}

// 默认播放背景音乐
function audioAutoPlay(id){
    var audio = document.getElementById(id),
        play = function(){
        audio.play();
        document.removeEventListener("touchstart",play, false);
    };
    audio.play();
    document.addEventListener("WeixinJSBridgeReady", function () {//微信
       play();
    }, false);
    document.addEventListener('YixinJSBridgeReady', function() {//易信
              play();
        }, false);
    document.addEventListener("touchstart",play, false);
}

/*新执行方法*/
$(function(){
    wsf.loadAnimate();
    // 背景音乐
    if($("#webMusic").length){
        audioAutoPlay('webMusic');
    }
    $(".webMusic").click(function(){
        var t = $(this);
        if(t.hasClass("playMusic")){
            t.find("audio")[0].pause();
            t.removeClass("playMusic");
        }else{
            t.find("audio")[0].play();
            t.addClass("playMusic");
        }
    })
    $("#alert_login_div").on("focus","input",function(){
        var tid = $("#alert_login_div");
        var sTop = $(window).scrollTop();
        tid.css({"position":"absolute","top":sTop+20});
    })
    $("#alert_login_div").on("blur","input",function(){
        var tid = $("#alert_login_div");
        tid.css({"position":"fixed","top":"20px"});
    })
});

//APP一键转售(安卓)
function android_share_pic(con,pic,type){
    if (type) {
        var str = pic;
    } else {
        var str='{"desc":"'+con+'","imgurls":['+pic+']}';
    }
    android.shareImgList(str);  
}
 
//APP一键转售(苹果)
function ios_share_pic(pic, type){
    if (type) {
        location.href='ev123:shareImage:'+pic;
    } else {
        location.href='ev123:shareImage:['+pic+']';
    }
}