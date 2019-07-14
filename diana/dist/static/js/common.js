/* 
     * common.js v2.0.0 (2019-07-11 11:25:14)',
     * User: acongm',
     * description: 戴妃学院公众号项目',
     * Licensed under the ISC license',
*/
// 回到顶部动画
(function (global) {
    $.fn.scrollTo = function (options) {
        var defaults = {
            toT: 0,    //滚动目标位置
            durTime: 100,  //过渡动画时间
            delay: 30,     //定时器时间
            callback: null   //回调函数
        };
        var opts = $.extend(defaults, options),
            timer = null,
            _this = this,
            curTop = _this.scrollTop(),//滚动条当前的位置
            subTop = opts.toT - curTop,    //滚动条目标位置和当前位置的差值
            index = 0,
            dur = Math.round(opts.durTime / opts.delay),
            smoothScroll = function (t) {
                index++;
                var per = Math.round(subTop / dur);
                if (index >= dur) {
                    _this.scrollTop(t);
                    window.clearInterval(timer);
                    if (opts.callback && typeof opts.callback == 'function') {
                        opts.callback();
                    }
                    return;
                } else {
                    _this.scrollTop(curTop + index * per);
                }
                console.log(curTop);
            };
        timer = window.setInterval(function () {
            smoothScroll(opts.toT);
        }, opts.delay);
        return _this;
    };
    $(".back-top").on('click', function () {
        $("#container").scrollTop(0);
    })
    $("#container").scroll(function () {               //滚动时触发
        var top = $("#container").scrollTop();
        if (top > 100) {
            $(".back-top").show();
        } else {
            $(".back-top").hide();
        }

    })
}(window))


//评论弹出窗
$(function () {
    $(".back-top").on('click', function () {
        $("#container").scrollTop(0);
    })
    $("#container").scroll(function () {               //滚动时触发
        var top = $("#container").scrollTop();
        if (top > 100) {
            $(".back-top").show();
        } else {
            $(".back-top").hide();
        }
    })
    //底部导航菜单
    $('.weui-tabbar__item').on('click', function () {
        $(this).addClass('weui-bar__item_on').siblings('.weui-bar__item_on').removeClass('weui-bar__item_on');
    });

    var $iosDialog1 = $('#iosDialog1')
    var audio = document.querySelector('#video');

    $('#dialogs').on('click', '.weui-dialog__btn', function () {
        $(this).parents('.js_dialog').fadeOut(200);
        $('.weui-tabbar').show()
        //兼容安卓暂停播放
        audio.play();
        $("#video").css({"display": "block"});
    });

    $('#showIOSDialog1').on('click', function () {
        $iosDialog1.fadeIn(200);
        $('.weui-tabbar').hide()
        $('.weui-textarea').focus();
        //兼容安卓暂停播放
        audio.pause();
        $("#video").css({"display": "none"});
    });

    /*var $recordDialog = $('#recordDialog')
    $('#dialogs,#dialogs1').on('click', '.weui-dialog__btn', function(){
        $(this).parents('.js_dialog').fadeOut(200);
    });
    
    $('#showRecordDialog').on('click', function(){
        $recordDialog.fadeIn(200);
    });*/

    //关闭弹窗
    $(".ten-modal .close").click(function () {
        $(".modal-bg,.ten-modal,.tip-arrow").hide()
    });

    //关闭
    $('.share-modal .close').click(function () {
        $('.modal-bg').hide();
        $('.share-modal').hide();
    })


    $('.weui-navbar__item').on('click', function () {
        //选项卡切换效果
        $(this).addClass('weui-bar__item_on').siblings('.weui-bar__item_on').removeClass('weui-bar__item_on');
        //选项内容切换
        var panelActive = $(this).attr("data-panel");
        $("#" + panelActive).addClass("active").siblings().removeClass("active")
    });

    //分享弹窗 20170703 S
    $('.btn-ticket').on('click', function () {
        shareModal();
    })

    function shareModal() {
        $('.modal-bg').show();
        $('.share-modal').show();
        //关闭
        $('.share-modal-close').click(function () {
            $('.modal-bg').hide();
            $('.share-modal').hide();
        })
    }

    //分享弹窗 20170703 E
    // 关闭立即关注
    $(document).on('click', ".header-attention .close", function () {
        $(".header-attention").remove();
    })
});

//收缩推广图文
$(".close-content").click(function () {
    var _this = $(".close-content");
    if (_this.hasClass("close-content-on")) {
        _this.removeClass("close-content-on")
        $(".spred-content").hide()
    } else {
        _this.addClass("close-content-on")
        $(".spred-content").show()
    }
});

//绑定手机
function setTel() {
    $('.page-info').hide();
    $('.page-tel').show();
}

function bindTel() {
    $('.page-tel').hide();
    $('.page-info').show();
}


/*
*禁止浏览器缩放
* */
document.addEventListener('touchstart',function (event) {
    if(event.touches.length>1){
        event.preventDefault();
    }
console.log(event.touches.length)
})
var last_touch_end=0;
document.addEventListener('touchend',function (event) {
    var now=(new Date()).getTime();
    if(now-last_touch_end<=300){
        event.preventDefault();
    }
console.log(now-last_touch_end)
    last_touch_end=now;
},false);


// 立即关注模块显示
var html = '<div class="header-attention">'
    + '<div class="item logo">'
    + '<img src="static/images/logo.png" alt="">'
    + '</div>'
    + '<div class="item slogan">'
    + '<p><strong>戴妃学院</strong></p>'
    + '<p>每天十分钟，成就精彩人生</p>'
    + '</div>'
    + '<i class="iconfont icon-handoright handoright"></i>'
    + '<div class="item attention" onclick="attentionFn()"></div>'
    + '<div class="item close">×</div>'
    + '</div>';

function attention(isAttention, prepend) {
    if (!isAttention) {
        $('.header-box').prepend(html);
    }
}

// 弹窗显示函数
function modal_fn(id, modal, more) {
    $(id).on('click', function () {
        console.log(id)
        console.log(modal)
        console.log(more)
        $(modal).show();
        $('.modal-bg').show();
        if (more) {
            $(more).show();
        }

    })
}

//关注公众号
var attentionFn = function () {
    $(".modal-bg,#attention").show();
    $(".header-attention").remove();
}

//tage_nav
$(".tage_nav").click(function () {
    $(this).addClass("active").siblings().removeClass("active");
    $("." + $(this).attr("data-namelist")).addClass("active").siblings().removeClass("active");
})
$(".mall-nav>a").click(function () {
    $("." + $(this).attr("data-mall")).addClass("active").siblings().removeClass("active");
})

var outerHeight = function (cla) {
    var obj = $(cla);
    return ~~obj.height() + ~~obj.css('padding-top') + ~~obj.css('padding-bottom') + ~~obj.css('margin-top') + ~~obj.css('margin-bottom');
}
var scrollFn = function () {
    var _scrollTop = 0;
    var _tag_num = 0;
    var _flag1 = true;
    var _list1 = "#panel_1",
        _list2 = "#panel_2",
        _list3 = "#panel_3";
    var panel_1_h = outerHeight(_list1),
        panel_2_h = outerHeight(_list2),
        panel_3_h = outerHeight(_list3);
    if (arguments.length > 0) {
        for (var i = 0; i < arguments.length; i++) {
            _tag_num += ~~outerHeight(arguments[i]);
        }

    } else {
        _tag_num = 0;

    }
    if ((arguments.length !== 0 && _tag_num !== 0) || (arguments.length === 0 && _tag_num === 0)) {
        $(".container").scroll(function () {
            _scrollTop = $(this).scrollTop();

            if (_flag1 && _scrollTop > _tag_num) {
                $("body").append($(".weui-navbar"))
                $("body>.weui-navbar").addClass("weui-navbar_")
                _flag1 = false;
            }
            if (!_flag1 && _scrollTop < _tag_num) {
                $(".weui-tab").prepend($("body>.weui-navbar"))
                $(".weui-navbar").removeClass("weui-navbar_")
                // $(".weui-tab>.center").style("padding-top","50px")
                _flag1 = true;
            }
            if ($(_list1).length) {
                var panel_1_top = $(_list1).offset().top;
            }
            if ($(_list2).length) {
                var panel_2_top = $(_list2).offset().top;
            }
            if ($(_list3).length) {
                var panel_3_top = $(_list3).offset().top;
            }
            if (panel_1_top < panel_1_h / 3 && panel_1_top > -panel_1_h / 3) {
                $(".weui-navbar .weui-navbar__item").eq(0).addClass("weui-bar__item_on").siblings().removeClass("weui-bar__item_on")
            }
            if (panel_2_top < panel_2_h / 3 && panel_2_top > -panel_2_h / 3) {
                $(".weui-navbar .weui-navbar__item").eq(1).addClass("weui-bar__item_on").siblings().removeClass("weui-bar__item_on")
            }
            if (panel_3_top < panel_3_h / 3 && panel_3_top > -panel_3_h / 3) {
                $(".weui-navbar .weui-navbar__item").eq(2).addClass("weui-bar__item_on").siblings().removeClass("weui-bar__item_on")
            }
        })
    }
}


$(function () {
    var flag = false;
    var tabbar_ind = -1;
    $(".weui-tabbar__item-box").click(function () {
        if ($(this).attr("data-click") === "active") {
            flag = false;
            // $(this).siblings().removeAttr("data-click");
            $(this).removeAttr("data-click");
            $(this).children(".flbox").fadeOut(100).removeClass("weui-active")
        } else {
            tabbar_ind = $(this).index();
            flag = true;
            $(this).attr("data-click", "active");
            $(this).addClass("weui-active").children(".flbox").fadeIn(100);
            $(this).siblings().removeClass("weui-active");
            $(this).siblings().attr("data-click", "");
        }
    })
    $(".container").bind("click", function (even) {
        if (flag) {
            $(tabbar__item).eq(tabbar_ind).trigger("click");
        }
        event.stopPropagation();
    })
    var tabbar__item = $(".weui-tabbar .weui-tabbar__item-box");
    $(".container").scroll(function () {
        if (flag) {
            $(tabbar__item).eq(tabbar_ind).trigger("click");
        }
    })
})