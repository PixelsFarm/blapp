jQuery(function() {
(function($) {

    var ua = window.navigator.userAgent
    var $b = $('body')

    if (ua.indexOf("MSIE") >= 0) $b.addClass('isIEold')
    else if (ua.indexOf('Trident') >= 0) $b.addClass('isIE11')
    else if (ua.indexOf('Edge') >= 0) $b.addClass('isIEedge')
    else if (ua.search("Chrome") >= 0) $b.addClass('isChrome')
    else if (ua.search("Firefox") >= 0) $b.addClass('isFirefox') 
    else if (ua.search("Safari") >= 0 && ua.search("Chrome") < 0) $b.addClass('isSafari')
    else if (ua.search("Opera") >= 0) $b.addClass('isOpera')

})(jQuery);
});