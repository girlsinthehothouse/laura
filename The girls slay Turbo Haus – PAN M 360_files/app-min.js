
( function ( $, d , w ) {
    
    "use-strict";

    var ready = (callback) => {
        if (document.readyState != "loading") callback();
        else document.addEventListener("DOMContentLoaded", callback);
    }
      
    ready( () => {

        const mobileNavigation = d.getElementById("mobile-navigation-wrapper");
        const masterHeader = d.getElementById("masthead");
        const menu_mobile = d.querySelector(".hamburger");
        const searchButton = d.getElementById("search-send");
        const searchText = d.getElementById("s");
        const body = d.body;
        const checboxeInfolettre = d.querySelectorAll(".gfield_checkbox label");
        let searchTextMaxWidth, searchTextInterval;
        let spotify = d.querySelector(".wp-block-embed-spotify .wp-block-embed__wrapper iframe");
        var windoWidth;
        var lastScrollY = 0;

        function reportWindowSize()
        {
            windoWidth = w.innerWidth || e.clientWidth || g.clientWidth;
            searchTextMaxWidth = w.getComputedStyle(searchText).maxWidth;
            if( windoWidth > 1086 ) {
                menu_mobile.classList.remove("is-active");
                body.classList.remove("mobile-navigation-is-active");
                mobileNavigation.classList.remove("mobile-navigation-is-active");
            }
        }

        function reportWindowScroll()
        {
            lastScrollY = window.scrollY;
                window.requestAnimationFrame(function() {
                    // console.log("lastScrollY", lastScrollY );
                    if ( lastScrollY > 116 ) {
                        masterHeader.classList.add('sticky-header');
                    } else {
                        masterHeader.classList.remove('sticky-header');
                    }
                   
                });
        }    
        
        function setSearchMaxWidth(maxWidth){
            searchText.style.maxWidth = maxWidth;
            searchTextMaxWidth = maxWidth
        }

        menu_mobile.addEventListener("click", event => {
            event.preventDefault();
            if( menu_mobile.classList.contains("is-active")) {
                event.target.closest(".hamburger").classList.remove("is-active");
                body.classList.remove("mobile-navigation-is-active");
                mobileNavigation.classList.remove("mobile-navigation-is-active");
                return;
            }
            event.target.closest(".hamburger").classList.add("is-active");
            body.classList.add("mobile-navigation-is-active");
            mobileNavigation.classList.add("mobile-navigation-is-active");
        });

        [].forEach.call(checboxeInfolettre, function(checkbox) {
            // do whatever
            const parent = checkbox.parentElement;
            console.log(this)
            checkbox.addEventListener("click", event => {
                parent.classList.toggle('selected')
            })
        });

        searchButton.addEventListener("click", event => {
            clearTimeout(searchTextInterval);

            if( searchTextMaxWidth == "0px") {
                event.preventDefault();
                setSearchMaxWidth("135px")
                searchTextInterval = setTimeout( setSearchMaxWidth, 4000, "0px");
                return;
            }
            
            if( searchText.value == "" ) {
                event.preventDefault();
                return;
            }
        });
        
        searchText.addEventListener("input", (event) => {
            // console.log("searchTextInterval",searchTextInterval);
            console.log("yop");
            clearTimeout(searchTextInterval);
            searchTextInterval = null;
            if( event.target.value == "" ) {
                searchTextInterval = setTimeout( setSearchMaxWidth, 4000, "0px");
            }
        })

        if(spotify != null) {
            spotify.setAttribute("width","100%");
        }

        w.addEventListener(
            'resize', event => {
                reportWindowSize();
            }
        );

        w.addEventListener(
            'scroll', event => {
                reportWindowScroll();
            }
        );
        reportWindowSize();
        reportWindowScroll();
    });
    
})(jQuery, document , window);
