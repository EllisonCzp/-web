$(function($) {

    banner($);
    initMobileTab();
    $('[data-toggle="tooltip"]').tooltip();

});


var banner = function($) {

    var getData = function(callback) {
        if (window.data) {
            callback && callback(window.data);
        } else {
            $.getJSON('js/data.json',
                function(res) {
                    window.data = res;
                    callback && callback(window.data);
                }
            );
        }
    }
    var ready = function() {
        getData(function(data) {
            var isMobile = $(window).width() < 768 ? true : false;
            var pointHTML = template('pointTemplate', {
                list: data
            });
            var imgsHTML = template('imgsTemplate', {
                list: data,
                isM: isMobile
            });
            $('.carousel-indicators').html(pointHTML);
            $('.carousel-inner').html(imgsHTML);
        });

    }
    $(window).on('resize', function() {
        ready()
    }).trigger('resize');


    // 手势切换
    var startX = 0;
    var distanceX = 0;
    var isMove = false;
    $('.wjs_banner').on('touchstart', function(e) {
        startX = e.originalEvent.touches[0].clientX;

    }).on('touchmove', function(e) {
        distanceX = e.originalEvent.touches[0].clientX - startX;
        isMove = true;

    }).on('touchend', function(e) {

        if (isMove && Math.abs(distanceX) > 50) {
            if (distanceX > 0) {
                $('.carousel').carousel('prev');
                console.log('prev');

            } else {
                $('.carousel').carousel('next');
                console.log('next');
            }
        }
        startX = 0;
        distanceX = 0;
        isMove = false;

    })

};

var initMobileTab = function() {

    var $navTabs = $('.wjs_product .nav-tabs');
    var width = 0;
    $navTabs.find('li').each(function(i, item) {
        width += $(item).outerWidth(true);
    });
    $navTabs.width(width);

    var $navTabsParent = $('.nav-tabs-parent');

    $navTabsParent.on('touchmove', function(e) {
        return false;
    });
    new IScroll($navTabsParent[0], {
        scrollX: true,
        scrollY: false
    })

};