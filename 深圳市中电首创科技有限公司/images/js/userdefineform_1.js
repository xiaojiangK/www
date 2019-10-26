function checkIDCard(num)
{
    if (num == 111111111111111) {
        return false;
    }
    num = num.toUpperCase();
    //���֤����Ϊ15λ����18λ��15λʱȫΪ���֣�18λǰ17λΪ���֣����һλ��У��λ������Ϊ���ֻ��ַ�X��
    if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num))) {
        return false;
    }

    //У��λ����ISO 7064:1983.MOD 11-2�Ĺ涨���ɣ�X������Ϊ������10��
    //����ֱ�����������ں�У��λ
    var len, re;
    len = num.length;
    if (len == 15) {
        re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
        var arrSplit = num.match(re);

        //������������Ƿ���ȷ
        var dtmBirth = new Date('19' + arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4]);
        var bGoodDay;
        bGoodDay = (dtmBirth.getYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
        if (!bGoodDay) {
            return false;
        }
        else {
            //��15λ���֤ת��18λ
            //У��λ����ISO 7064:1983.MOD 11-2�Ĺ涨���ɣ�X������Ϊ������10��
            var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
            var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
            var nTemp = 0, i;
            num = num.substr(0, 6) + '19' + num.substr(6, num.length - 6);
            for (i = 0; i < 17; i++) {
                nTemp += num.substr(i, 1) * arrInt[i];
            }
            num += arrCh[nTemp % 11];
            return true;
        }
    }
    if (len == 18) {
        re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);
        var arrSplit = num.match(re);

        //������������Ƿ���ȷ
        var dtmBirth = new Date(arrSplit[2] + "/" + arrSplit[3] + "/" + arrSplit[4]);
        var bGoodDay;
        bGoodDay = (dtmBirth.getFullYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
        if (!bGoodDay) {
            return false;
        }
        else {
            //����18λ���֤��У�����Ƿ���ȷ��
            //У��λ����ISO 7064:1983.MOD 11-2�Ĺ涨���ɣ�X������Ϊ������10��
            var valnum;
            var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
            var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
            var nTemp = 0, i;
            for (i = 0; i < 17; i++) {
                nTemp += num.substr(i, 1) * arrInt[i];
            }
            valnum = arrCh[nTemp % 11];
            if (valnum != num.substr(17, 1)) {
                return false;
            }
            return true;
        }
    }
    return false;
}

function getCity(type, id, version){
    var provinceCode = $('#province_'+id).val();
    if (version) {
        $('#province_'+id).parent().parent().siblings(".city, .district").hide();
    }
    var url = "/dom/ajax_form.php?ajax=3&code=" + provinceCode + "&fieldId=" + id + "&type=" + type;
    $.get(url,function(data){
        if(data){
            $('#city_'+ id).empty();
            $('#city_'+ id).append(data);
            $('#district_'+ id).empty();
            var def_city=$('#city_'+ id).find("option:selected").text();
            $('#city_'+ id).siblings('span').html(def_city);
            getDistrict(id,version);
            if (version) {
                $('#city_'+ id).siblings("span").html('��ѡ�����');
                $('#province_'+id).parent().parent().siblings('.city').css('display','block');

                
            }
        }
    });
}

function getDistrict(id, version){
    var cityCode = $('#city_'+id).val();
    var url = "/dom/ajax_form.php?ajax=4&cityCode=" + cityCode + "&fieldId=" + id;
    if (version) {
        $('#city_'+id).parent().parent().siblings(".district").hide();
    }
    $.get(url, function(data){
        $('#district_'+ id).empty();
        $('#district_'+ id).append(data);
         var def_dis=$('#district_'+ id).find("option:selected").text();
            $('#district_'+ id).siblings('span').html(def_dis);
        if (version) {
            $('#district_'+ id).siblings("span").html('��ѡ������');
            $('#city_'+id).parent().parent().siblings('.district').css('display','block');
        } else {
            getPC(id);
        }
    });
}

function getPCD(id){
    var province = $('#province_'+id+' option:selected').html();
    var city = $('#city_'+id+' option:selected').html();
    var district = $('#district_'+id+' option:selected').html();
    $('#field_'+id).val(province + '#' + city + '#' + district);
}

function getP(id){
    var province = $('#province_'+id+' option:selected').html();
    $('#field_'+id).val(province);
}

function getPC(id){
    var province = $('#province_'+id+' option:selected').html();
    var city = $('#city_'+id+' option:selected').html();
    $('#field_'+id).val(province + '#' + city);
}

$(function() {
    $("body").on("change", ".checkboxDynamicValue", function() {
        var id = parseInt($(this).data("id"));
        if (!id) {
            return false;
        }

        $('#field_'+id).val("");

        var name = 'checkbox_'+id+'[]';
        if ($("input[name='"+name+"']:checked").length === 0) {
            return false;
        }

        var str = '';
        $("input[name='"+name+"']:checked").each(function(){
            str ? str += '#*#'+ $(this).val() : str = $(this).val();
        });
        $('#field_'+id).val(str);
        return false;
    });
});

function getCheckboxVal(id){
    $('#field_'+id).val("");

    var name = 'checkbox_'+id+'[]';
    if ($("input[name='"+name+"']:checked").length === 0) {
        return false;
    }

    var str = '';
    $("input[name='"+name+"']:checked").each(function(){
        str ? str += '#*#'+ $(this).val() : str = $(this).val();
    });
    $('#field_'+id).val(str);
    return false;
}

function auto_check(oParam) {
    var checkArr = [];
    var paramLength = oParam.length;
    for (var i=0; i<paramLength; i++) {
        (function(n){
            var _this = oParam[n];
            if (_this['type'] == 2) {
                //$('#field_'+_this['id']+' option:first').attr("selected","selected");
                $('#field_'+_this['id']).on('change',function(){
                    var _thisVal = $.trim($('#field_'+_this['id']).val());

                    if (_this['required'] == 1 && _thisVal == '') {
                        $('#error_'+_this['id']).html('<span class="caution">����Ϊ�գ�</span>');
                        return false;
                    } else {
                        $('#error_'+_this['id']).html('');
                        return true;
                    }
                })
            } else if (_this['type'] == 3) {
                    checkArr[_this['id']] = $("input[name='checkbox_"+ _this['id'] +"[]']");
                    for (var j=0; j<checkArr[_this['id']].length; j++) {
                        (function(m){
                            $(checkArr[_this['id']][m]).on('click',function(){
                                if (_this['required'] == 1 && $("input[name='checkbox_"+ _this['id'] +"[]']:checked").length === 0) {
                                    $('#error_'+_this['id']).html('<span class="error">��ѡ��һ����Ŀ��</span>');
                                } else {
                                    $('#error_'+_this['id']).html('');
                                }
                            })
                            return false;
                        })(j);
                    }
            } else if (_this['type'] == 5 || _this['type'] == 6) {
                if (parseInt(_this['isCur']) === 1) {
                    $('#district_'+_this['id']+' option:first').attr("selected","selected");
                }
                $('#province_'+_this['id']).on('change',function(){
                    var _thisVal = $.trim($('#province_'+_this['id']).val());
                    if (_this['required'] == 1 && _thisVal == '') {
                        showCityMsg(1, _this['id']);
                    } else {
                        showCityMsg(false, _this['id']);
                    }
                });
                $('#city_'+_this['id']).on('change',function(){
                    var _thisVal1 = $.trim($('#city_'+_this['id']).val());
                    if (_this['required'] == 1 && _thisVal1 == '') {
                        showCityMsg(2, _this['id']);
                    } else {
                        showCityMsg(false, _this['id']);
                    }
                })
                if (_this['type'] == 5){
                    $('#district_'+_this['id']).on('change',function(){
                        var _thisVal2 = $.trim($('#district_'+_this['id']).val());
                        if (_this['required'] == 1 && _thisVal2 == '') {
                            showCityMsg(3, _this['id']);
                        } else {
                            showCityMsg(false, _this['id']);
                        }
                    })
                }
            } else {
                $('#field_'+_this['id']).on('blur',function(){
                    var _thisVal = $.trim($('#field_'+_this['id']).val());
                    if (_this['required'] == 1 && _thisVal == '') {
                        $('#error_'+_this['id']).html('<span class="caution">����Ϊ�գ�</span>');
                        return false;
                    } else {
                        if ($.trim(_this['fun']) && (_this['required'] == 1 || _thisVal)) {
                            if (eval(_this['fun']+ '("'+ _thisVal +'")') === false) {
                                $('#error_'+_this['id']).html('<span class="error">'+_this['msg']+'</span>');
                                return false;
                            } else {
                                $('#error_'+_this['id']).html('');
                                return true;
                            }
                        } else if ($.trim(_this['regex']) && (_this['required'] == 1 || _thisVal)) {
                            if (paramRegexp(_this['regex'], _thisVal) === false) {
                                $('#error_'+_this['id']).html('<span class="error">'+_this['msg']+'</span>');
                                return false;
                            } else {
                                $('#error_'+_this['id']).html('');
                                return true;
                            }
                        } else {
                            $('#error_'+_this['id']).html('');
                            return true;
                        }
                    }

                })
            }
        })(i);
    }
}

function defineFormSublime(iFormId, type) {
    if($("#HourWorkBox input").length == 3){
        if (!hourCheckTime()) {
            return false;
        }
    }

    if($("#roomOrderHtml input").length == 5){
        if (!checkRoomFrom()) {
            return false;
        }
    }


    if (!type) {
        if ($('#form-sublimt-box-'+ iFormId).data("hyid")) {
            if ($(".ev_t_product_yy_c ul li").length < 1) {
                showAllzz("ԤԼ��Ŀ����Ϊ�գ�");
                return false;
            }
        }
    }

    var
        param = userDefineFromParam(iFormId),
        iCountError = 0,
        checkArr = [];

    for (var i=0; i<param.length; i++) {
        (function(n){
            var _this = param[n];
            if (_this['type'] == 2) {
                if ($('#field_'+_this['id']).triggerHandler('change') === false) {
                    iCountError++;
                    if (iCountError == 1) {
                        $('#field_'+_this['id']).focus();
                    }
                }
            } else if (_this['type'] == 3) {
                checkArr = $("input[name='checkbox_"+ _this['id'] +"[]']:checked");
                if (_this['required'] == 1 && checkArr.length < 1) {
                    $('#error_'+_this['id']).html('<span class="caution">����Ϊ�գ�</span>��');
                    iCountError++;
                    if (iCountError == 1) {
                        $("input[name='checkbox_"+ _this['id'] +"[]']").focus();
                    }
                }
            } else if (_this['type'] == 4) {
                var _thisVal = $("input[name='field_"+ _this['id'] +"']:checked").length;
                if (_this['required'] == 1 && _thisVal < 1) {
                    $('#error_'+_this['id']).html('<span class="caution">����Ϊ�գ�</span>��');
                    iCountError++;
                    if (iCountError == 1) {
                        $("input[name='field_"+ _this['id'] +"']").focus();
                    }
                } else {
                    $('#error_'+_this['id']).html('');
                }
            } else if (_this['type'] == 5 || _this['type'] == 6) {
                var iCountCityError = 0;
                if (_this['type'] == 5) {
                    var _thisVal2 = $('#district_'+_this['id']).val();
                    if (_this['required'] == 1 && _thisVal2 == '') {
                        iCountError++;
                        iCountCityError++;
                        if (iCountError == 1) {
                            $('#field_'+_this['id']).focus();
                        }
                        showCityMsg(3, _this['id']);
                    }
                }
                var _thisVal1 = $('#city_'+_this['id']).val();
                if (_this['required'] == 1 && _thisVal1 == '') {
                    iCountError++;
                    iCountCityError++;
                    if (iCountError == 1) {
                        $('#field_'+_this['id']).focus();
                    }
                    showCityMsg(2, _this['id']);
                }
                var _thisVal = $('#province_'+_this['id']).val();
                if (_this['required'] == 1 && _thisVal == '') {
                    iCountError++;
                    iCountCityError++;
                    if (iCountError == 1) {
                        $('#field_'+_this['id']).focus();
                    }
                    showCityMsg(1, _this['id']);
                }
                if (parseInt(iCountCityError) === 0) {
                    showCityMsg(false, _this['id']);
                }
            } else {
                if ($('#field_'+_this['id']).triggerHandler('blur') === false) {
                    iCountError++;
                    if (iCountError == 1) {
                        $('#field_'+_this['id']).focus();
                    }
                }
            }
        })(i);
    }

    if (parseInt(iCountError) > 0) {
        return false;
    } else {
        if (typeof is_formsubmit != 'undefined') {
            if (!is_formsubmit) {
                return false;
            }
        }

        if ($("#formPrice"+ iFormId).length > 0) {
            var price = $("#formPrice"+ iFormId).val();
            var minPrice = $("#formPrice"+ iFormId).data('minprice');
            var currencyrate = $("#formPrice"+ iFormId).data('currencyrate');

            if (!price || checkNumber(price, 4) === false) {
                $("#error_price_"+ iFormId).html('<span class="caution">��������Ч��4λС����</span>');
                $("#formPriceShow"+ iFormId).html("");
                return true;
            }

            var price = parseFloat(price);
            if (!price || price < minPrice) {
                $("#error_price_"+ iFormId).html('<span class="caution">���������'+ minPrice +'�����֣�</span>');
                $("#formPriceShow" + iFormId).html("");
                return true;
            }

            $("#error_price_"+ iFormId).html("");
            var showPrice = price / currencyrate;
            showPrice = showPrice.toFixed(3);
            showPrice = showPrice.substring(0, showPrice.lastIndexOf('.')+3);

            $("#formPriceShow"+ iFormId).html(showPrice);
        }

        $('#form-sublimt-box-'+ iFormId).html('����Ŭ���ύ��... ');
        $('#isSubmit').val(1);
        $('#form_'+iFormId).submit();
    }
}

function paramRegexp(regexpString, string) {
    if ($.trim(regexpString)=='' || $.trim(string)=='') {
        return false;
    }
    if(string.match(eval(regexpString))){
        return true;
    }else{
        return false;
    }
}

function showCityMsg (error, id) {
    if (error === false) {
        $('#error_'+ id).html('');
        return true;
    } else {
        var city_error_msg = '';
        if (error == 1) {
            city_error_msg  = 'ʡ����Ϊ�գ�';
        } else if (error == 2) {
            city_error_msg  = '�в���Ϊ�գ�';
        } else if (error == 3) {
            city_error_msg  = '������Ϊ�գ�';
        }
        $('#error_'+ id).html('<span class="caution">'+ city_error_msg +'</span>');
        return false;
    }
}

// ˢ����֤��
function refreshYzm(obj, iFormId)  {
    var date = new Date();
    $(obj).attr("src","/include/captcha/captcha-id.php?id="+ iFormId +"&datete="+ date.getTime());
}

