window.onload = function() {
    //   1.搜索框
    search();
    //   2.轮播图
    banner();
    //   3.倒计时
    downTime();
};

var search = function() {
    // 默认固定顶部背景透明
    // 页面滚动改变透明度

    var searchBox = document.querySelector('.jd_search');
    var banner = document.querySelector('.jd_banner');
    var height = banner.offsetHeight;

    // 滚动事件
    window.onscroll = function() {
        var scrollTop = document.documentElement.scrollTop;
        var opacity = 0;
        if (scrollTop < height) {
            opacity = scrollTop / height * 0.85;
        } else {
            opacity = 0.85;
        }

        searchBox.style.background = 'rgba(210, 21, 35,' + opacity + ')';
    }

};
var banner = function() {
    // 1.自动轮播且无缝（定时器 过渡）
    // 2.点随着图片的改变而改变 根据索引切换
    // 3.轮播图随着手指滑动 利用touch事件
    // 4.滑动结束 滑动距离小于屏幕的3分之1 吸附回去 过渡
    // 5.滑动结束 滑动距离大于屏幕的3分之1 上一张/下一张 根据滑动方向 过渡

    // 获取轮播图对象
    var banner = document.querySelector('.jd_banner');
    // 每张图片的宽度
    var imgWidth = banner.offsetWidth;
    // 获取图片容器对象
    var imgBox = banner.querySelector('ul:first-child');
    // 圆点容器对象
    var dotBox = banner.querySelector('ul:last-child');
    // 所有的圆点
    var dotObj = dotBox.querySelectorAll('li');

    // 加过渡
    var addTransition = function() {
        imgBox.style.transition = 'transform .2s';
        imgBox.style.webkitTransition = 'transform .2s';
    };
    // 清除过渡
    var removeTransition = function() {
        imgBox.style.transition = 'none';
        imgBox.style.webkitTransition = 'none';
    };
    // 做位移
    // var setTransform = function(translateX) {
    //     imgBox.style.transform = 'translateX(' + translateX + 'px)';
    //     imgBox.style.webkitTransform = 'translateX(' + translateX + 'px)';

    // };
    var setTransform = function(translateX, e) {
        imgBox.style.transform = 'translateX(' + translateX + 'px)';
        imgBox.style.webkitTransform = 'translateX(' + translateX + 'px)';
    };
    // 设置点
    var setDot = function(index) {
        index--;
        dotObj.forEach(function(item) {
            item.removeAttribute('class');
        })
        dotObj[index].className = 'active';
    }


    // 程序核心 index
    var index = 1; //默认1 因为前面还有一张图
    // 定时器
    var time = setInterval(function() {
        index++;
        // 加过渡 做位移
        addTransition();
        setTransform(-index * imgWidth);

    }, 1000);
    // 需要等到最后一张的动画结束后 瞬间定位到第一张
    imgBox.addEventListener('transitionend', function() {
        // 自动滚动的无缝
        // 是否为最后一张
        if (index >= 9) {
            index = 1;
        } // 滑动的时候也需要无缝
        else if (index <= 0) {
            index = 8;
        }

        // 清除过渡
        removeTransition();
        // 瞬间定位
        setTransform(-index * imgWidth);

        // 点的状态
        setDot(index);
    });
    // 滑动效果
    // 存储开始时的x坐标
    var startX = 0;
    // 移动的距离
    var distanceX = 0

    var isMove = false;
    imgBox.addEventListener('touchstart', function(e) {
        e.stopPropagation();
        e.preventDefault();
        clearInterval(time);
        // 记录x坐标
        startX = e.touches[0].clientX;
    });
    imgBox.addEventListener('touchmove', function(e) {
        e.stopPropagation();
        e.preventDefault();
        // 记录移动的x坐标
        var moveX = e.touches[0].clientX;
        // 计算手指移动的距离
        distanceX = moveX - startX;
        // 元素移动的位置 = 手指移动的距离 + 元素原始的位置
        var translateX = distanceX + -index * imgWidth;
        // 清除过渡
        removeTransition();
        // 做位移
        setTransform(translateX);
        isMove = true;

    });
    imgBox.addEventListener('touchend', function(e) {
        if (isMove) {
            if (Math.abs(distanceX) < imgWidth / 3) {
                addTransition();
                setTransform(-index * imgWidth);
            } else {
                if (distanceX > 0) {
                    index--;
                } else {
                    index++;
                }
                addTransition();
                setTransform(-index * imgWidth);
            }
        }
        startX = 0;
        distanceX = 0;
        isMove = false;

        clearInterval(time);

        time = setInterval(function() {
            index++;
            // 加过渡 做位移
            addTransition();
            setTransform(-index * imgWidth);

        }, 1000);

    });
};
var downTime = function() {
    var time = 2 * 60 * 60;
    var spanTime = document.querySelectorAll('.time span');
    // console.log(spanTime);

    var timer = setInterval(function() {
        time--;
        var h = Math.floor(time / 3600);
        var m = Math.floor(time / 60 % 60);
        var s = time % 60;

        spanTime[0].innerHTML = Math.floor(h / 10);
        spanTime[1].innerHTML = h % 10;
        spanTime[3].innerHTML = Math.floor(m / 10);
        spanTime[4].innerHTML = m % 10;
        spanTime[6].innerHTML = Math.floor(s / 10);
        spanTime[7].innerHTML = s % 10;
    }, 1000)
};