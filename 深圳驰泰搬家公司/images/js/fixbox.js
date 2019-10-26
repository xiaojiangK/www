//    $('#single-posts').fixbox({});//��ʼ��
//    $("#single-posts").fixbox("show");//�ⲿ���ò����ķ���


(function ($, window, document, undefined) {
    var $win = $(window);
    var $document = $(document);
    /**
     * @constructor FixBox
     * ����һ���µĵ� FixBox ��.
     * @param {Object} element DOMԪ��.
     * @param {Object} options ������� .
     * @type {Object}
     * @example new FixBox( this , options)
     * */
    var FixBox = function (element, options) {
        this.initialize('fixbox', element, options);
    };
    /**
     * This is a property of class FixBox
     */
    FixBox.prototype = {
        constructor:FixBox,
        /**
         * ��ʼ��
         * @classDescription ��ʼ��
         * @param {String} type ��������
         * @param {Object} element ������������DOMԪ��.
         * @param {Object} options ������� .
         */
        initialize:function (type, element, options) {
            var _this = this;
            this.type = type;
            this.$element = $(element);
            this.options = this.options || this.getOptions(options);
            this.winH = $win.height();
            this.winW = $win.width();
            if (this.options.isFixdeHeight) {
                this.fixedBoxH = this.$element.outerHeight(true);
            }
            this.offsetT = this.$element.offset().top;
            this.resizeWindow();
            this.documentH = $document.height();
            $win.bind("resize", function () {
                _this.resizeWindow();
            });
        },

        /**
         * ��ʼ�� ���ò��� ���ز���MAP
         * @param {Object} options ������� .
         * @return {Object} ���ò���
         */
        getOptions:function (options) {
            options = $.extend({}, $.fn[this.type].defaults, this.$element.data(), options || {});

            return options;
        },
        //resize Window�ͳ�ʼ����ʱ��ʹ��
        resizeWindow:function () {
            var options = this.options;
            var _this = this;
            this.winH = $win.height();
            this.winW = $win.width();
            if (this.winW >= options.pagewidth) {
                this.doFix();
                $win.unbind("." + options.scrollEventName);
                $win.bind("scroll." + options.scrollEventName, function () {
                    _this.doFix();
                });
            } else {
                $win.unbind("." + options.scrollEventName);
                this.$element.css("position", "static");
            }
        },
        //����
        doFix:function () {
            var $element = this.$element;
            var options = this.options;
            var distanceToBottom = options.distanceToBottom;
            var distanceToTop = options.distanceToTop;
            if (!this.options.isFixdeHeight) {
                this.fixedBoxH = $element.outerHeight(true);
            }
            var fixedBoxH = this.fixedBoxH;
            var offsetT = this.offsetT;
            var fixedBoxPositionB = fixedBoxH + this.offsetT;//$fixedBox�ĵײ�λ�� =fixedBox�߶�+fixedBox��offset().top
            var winH = this.winH;
            if (!options.isFixdeDocHeight) {
                this.documentH = $document.height();
            }
            var documentH = this.documentH;
            //console.log(fixedBoxPositionB+distanceToBottom-options.threshold)

            var scrollNum = fixedBoxPositionB - winH;
            var winST = $win.scrollTop();
            //Ԫ�ظ߶� С�� ���ڼ�ȥ�붥���Ĺ̶�����

            if (fixedBoxH < (winH - distanceToTop)) {
                //��ȥ�ĸ߶� ���� ��ʼ��ʱԪ�ص�topλ��
                if (winST > offsetT) {
                    //console.log(winH - distanceToBottom < fixedBoxH+distanceToTop)
                    if (winST >= ( documentH - distanceToBottom - fixedBoxH)) {
                        //if(this.winH-245<fixedBoxH+40){
                        $element.css({
                            "position":"fixed",
                            "top":-(winST + distanceToBottom + fixedBoxH - documentH)
                        });
                        //}
                    } else {
                        $element.css({
                            "position":"fixed",
                            "top":distanceToTop
                        });
                    }
                } else {
                    $element.css("position", "static");
                }
            }
            //Ԫ�ظ߶� ���� ���ڼ�ȥ�붥���Ĺ̶�����
            else {
                if (winST > scrollNum) {
                    if (winST > ( documentH - winH - distanceToBottom)) {
                        $element.css({
                            "position":"fixed",
                            "top":-(winST + distanceToBottom + fixedBoxH - documentH)
                        });
                    } else {
                        $element.css({
                            "position":"fixed",
                            "top":winH - fixedBoxH
                        });
                    }
                } else {
                    $element.css("position", "static");
                }
            }
        }
    };
    $.fn.fixbox = function (option) {
        var argumentsAry = [];
        for (var i = 0, len = arguments.length; i < len; i++) {
            argumentsAry.push(arguments[i]);
        }
        var newarg = argumentsAry.slice(1);
        return this.each(function () {
            var $this = $(this),
                data = $this.data('fixbox'),
                options = typeof option == 'object' && option;
            if (!data) {
                data = new FixBox(this, options);
                $this.data('fixbox', data);
            }
            //��� option���ַ���������������������
            if (typeof argumentsAry[0] == 'string') {
                data[argumentsAry[0]].apply(data, newarg);
            }
        });
    };
    $.fn.fixbox.Constructor = FixBox;

    $.fn.fixbox.defaults = {
        distanceToTop:0, // �ڵ��ϱߵ�ҳ�涥���ľ���
        distanceToBottom:0,//��ײ��������ʱ��ֹͣ���棬��ʵ����fixed��λ��ֻ�Ǹı�top��ֵ
        isFixdeHeight:true,//����Ԫ���ǲ��ǹ̶��߶�
        isFixdeDocHeight:true,//document�ǲ��ǹ̶��߶�
        pagewidth:1000,//ҳ���ȣ������ڿ�� С�� ҳ���� ��ʱ�� Ԫ�ز��ڸ��档
        threshold:0, //��ֵ,һ��С�ڵ���Ԫ�ص�margin-topֵ����Ҫ����̶���λ�������߶ȴ��ڷǹ̶���λ����ʱ��,�����Ͳ��̶���λ��
        scrollEventName:"followScroll"// scroll�¼�������Ԫ�ز���Ҫ�����ʱ�򣬿��Խ����Ӧ��scroll�¼�
    };
})(window.jQuery, window, document);