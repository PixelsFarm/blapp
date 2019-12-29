jQuery(function() {
(function($) {

    trace('equal-height-partners.js')

    var $w   = $(window)
    var $itm = $('.b-partner')
    var arr  = []

    if ('ontouchstart' in document.documentElement || !$itm.length) return
    __equalize()

    $w.resize(function(e) {
        __reset()
        __equalize()
    })

    function __equalize() {
        trace('equalizar')

        $itm.each(function(i,o) {
           var $o = $(o)
           arr.push($o.outerHeight(true)) 
        })

        $itm.css('min-height', Math.max.apply(Math,arr))
        $itm.find('> a').css('min-height', Math.max.apply(Math,arr))
        $itm.css('opacity', 1)
    }

    function __reset() {
        arr = []
        $itm.css('min-height', '')
        $itm.find('> a').css('min-height', '')
    } 

    function trace(str) {
        console.log ? console.log(str) : null
    }

})(jQuery);
});