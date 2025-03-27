(function(d,w,$) {
    
    'use-strict';

    var is_mobile = false;
    let wWidth = window.innerWidth;

    function ismobile(wW) {
        
        if( wW > 1024 ) {
            
            is_mobile = false;
            document.body.classList.add('desktop');
            document.body.classList.remove('mobile');
            
        } else {

            is_mobile = true;
            document.body.classList.add('mobile');
            document.body.classList.remove('desktop');    
        
        }
    }

    function ajax_ads_panm(el,adsId) {
        // console.log("adsId",adsId)
        var data = {
            'action'    : 'outputHtml',
            'nonce'     : adspanm.nonce,
            'pubId'     : adsId,
            'is_mobile' : is_mobile
        };

        // We can also pass the url value separately from ajaxurl for front end AJAX implementations
        $.post(adspanm.ajaxurl, data, function(response) {
            // alert('Got this from the server: ' + response);
            el.html(response);
        });
    }

    $(document).ready( function($) {
        if( wWidth < 1024 ) {
            is_mobile = true;
        }

        $(".panm-ads-render").each( function( index ) {
            const _me = $(this);
            ajax_ads_panm(_me, _me.data("ads-id"));
        });
        $(w).on("resize", function() {
            wWidth = window.innerWidth;
            ismobile(wWidth);
        }).resize();

    });

})(document,window,jQuery)