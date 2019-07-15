window.onload = function() {

    var left = document.querySelector('.jd_cateLight');
    var right = document.querySelector('.jd_cateRight');

    left.addEventListener('touchmove', function(e) {
        e.preventDefault();
    });
    right.addEventListener('touchmove', function(e) {
        e.preventDefault();
    });

    new IScroll(left, {
        scrollX: false,
        scrollY: true
    });
    new IScroll(right, {
        scrollX: false,
        scrollY: true
    });
}