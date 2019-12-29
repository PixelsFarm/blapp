jQuery(function() {
    (function($) {

    trace ("carousel.js");
    var $c = $(".b-carousel .c-list")
    $c.css("position","relative")
    var $lis = $c.find('.c-list__item')
    var ang = 360/$lis.length
    var ag = 0
    var tout 
    var radH = $c.width()*.25
    var radV = $c.height()*.01

    var porTrans = 25
    var maxS = 1
    var minS = .5
    var cx = $c.width()*.5
    var cy = $c.height()*.2
    var animando = false
    var posDots 

    function actualizar () {

        radH = $c.width()*.25
        radV = $c.height()*.01

        cx = $c.width()*.5
        cy = $c.height()*.2
        $lis.each(function(i,o) {
            var $o = $(o)
            posicionar ($o,i)
        })
    }
    $(window).resize (function() {
       // clearTimeout(tout)
       // tout = setTimeout (function() {
            actualizar()
        //},100)
    })

    inicializarItems ($lis)
    actualizarDots()

    $c.prop("pos",ag)

    $('.b-carousel .c-button-play').click(function(e) {
        var mul = -1
        if ($(this).hasClass("c-button-play--next")) mul = 1
        rotar(ang*mul)
    })

    $('.c-dots__dot').click(function(e) {
        //$('.c-dots__dot').removeClass('active')
        //$(this).addClass('active')

        var $t      = $(this)
        var curr    = posDots
        var newcurr = $t.index()
        var dif     = newcurr - curr

        /*trace('----')
        trace('current: '+ curr)
        trace('new current: '+ newcurr)
        trace(ang * dif)*/

        rotar(ang * dif)
    })

    function rotar (ang) {
        if (animando) return
        var pos = $c.prop("pos")
        animando = true
        $c.stop().animate ({pos:pos+ang},{
            duration:1000,
            step:function(a,b,c) {
                $c.prop("pos",a)
                ag = a 
                $lis.each(function(i,o) {
                    var $o = $(o)
                    posicionar ($o,i)
                })
            },
            complete: function () {
                animando = false
                actualizarDots()
            }
        })
    }

    function actualizarDots() {
        var a = ag%360
        a = a<0 ? a+360 : a
        posDots = Math.round(a/ang)

        $('.c-dots__dot').removeClass('active')
        $('.c-dots__dot').eq(posDots).addClass('active')
    }

    function inicializarItems ($l) {
        $l.each(function(i,o) {
            var $o = $(o)
            $o.css({
                "position":"absolute",
                "transform-origin":"center",

            })
            posicionar ($o,i)
        })

    }

    function posicionar ($e,pos) {
        var mpi =(Math.PI / 180)

        var angle = ((ang*pos)+ag)%360
        var radians = (mpi * angle) 

        var posy = ((Math.cos(radians)* radV))+radV
        var maxy = radV*2
        var escala = .5+((posy/maxy)*.5)
        var z = Math.round((posy/maxy)*10)
        var blur =( 1-escala)*10
        $e.css({
            "top":(cy+(posy-radV))+"px",
            "left":(cx+(Math.sin(radians)* radH))+"px",
            "z-index":z,
            "transform":"translate(-50%,-"+(porTrans*escala)+"%)scale("+escala+")",
            "filter": "brightness("+escala+")blur("+blur+"px)"
        })
        $e.attr("data-angle", angle)
    }


    })(jQuery);
});

function trace(str) {
    if (console.log) {
        console.log(str);
    }
}