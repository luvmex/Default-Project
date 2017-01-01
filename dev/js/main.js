var CELYN = window.CELYN || {};


CELYN.smoothScroll = function(){
	$(function() {
		$('a[href*="#"]:not([href="#"])').click(function() {
			if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
				var target = $(this.hash);
				target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
				if (target.length) {
					$('html, body').animate({
						scrollTop: target.offset().top
					}, 850, 'easeInOutExpo');
				return false;
				}
			}
		});
	});
};

CELYN.imageLoad = function(){
	$(function() {
	    $('img').lazyload({
	        effect: 'fadeIn'
	    });
	});
};

CELYN.pageTransition = function(){
	var $animsition = $('.page-intro');
		$animsition
			.animsition({
				loading: true,
				loadingParentElement: 'body',
				loadingClass: 'page-loading',
		});
};

CELYN.disableHover = function(){
    var body = document.body,
        timer;

    window.addEventListener('scroll', function() {
      clearTimeout(timer);
      if(!body.classList.contains('disable-hover')) {
        body.classList.add('disable-hover')
      }
      
      timer = setTimeout(function(){
        body.classList.remove('disable-hover')
      },500);
    }, false);
};

///////////////////////////////////

CELYN.fullHeight = function(){
	var winH = window.innerHeight ? window.innerHeight:$(window).height();
	var winW = $(window).width();
	$(".fullHeight").each(function(){
		$(this).css({'height': winH +'px'});
	});
};

CELYN.elementHeight = function(){
	var winH = window.innerHeight ? window.innerHeight:$(window).height();
	var winW = $(window).width();
	var elementHeight = $('.elementHeight').width();
	$('.elementHeight').css({'height': elementHeight});
};


CELYN.scrollDown = function(){

    var scroll = $(window).scrollTop();
    var headerOffset = $('header').offset();
	var mainOffset = $('main').offset();
    var headerHeight = $('header').height();
    var values = (scroll - headerOffset.top)/headerHeight;
	var scrollnext = $('#scrolldown');

    //Scroll down
    if( scroll > headerOffset.top ) {
      	scrollnext.css({'opacity': 1 - (values*1.5), 'bottom': 30 - (values*60)});
		if (scroll > mainOffset.top ) {
			scrollnext.css({'opacity':'0','bottom':'0px'});
		}
    } else {
		scrollnext.css({'opacity':'1','bottom':'30px'});
	}

};


CELYN.scrollTop = function(){
	$('#scrolltop').click(function(){
		$('html, body').animate({scrollTop : 0}, 850, 'easeInOutExpo');
		return false;
	});
};


$(window).load(function() {
});


$(document).ready(function() {

	CELYN.fullHeight();
	CELYN.elementHeight();
	CELYN.scrollTop();


	// Nav scroll
	var startScroll;
	var lastScrollTop = 0;
	var scrollOver = 5;
	var navbarHeight = $('nav').outerHeight();
	
	$(window).scroll(function(event) {  


    	CELYN.disableHover();
    	CELYN.scrollDown();


    	//nav scroll
		var startScroll = true;  

		setInterval(function() {
		    if (startScroll) {
		        hasScrolled();
		        startScroll = false;
		    }
		}, 250);

		function hasScrolled() {
		    var st = $(this).scrollTop();
		    if(Math.abs(lastScrollTop - st) <= scrollOver)
		        return;
		    if (st > lastScrollTop && st > navbarHeight){
		        $('nav').css({'top':'-100px'});
		    } else {
		        if(st + $(window).height() < $(document).height()) {
		            $('nav').css({'top':'0px'});
		        }
		    }
		    if(st >= 300){
		    	$("nav").addClass("navScroll");
		    	$('#scrolltop').css({'bottom':'50px', 'opacity':'1'});
		    } else {
		    	$("nav").removeClass("navScroll");
		    	$('#scrolltop').css({'bottom':'-50px','opacity':'0'});
		    }
		    lastScrollTop = st;
		};



	});

	CELYN.smoothScroll();
	CELYN.imageLoad();
	CELYN.pageTransition();
});



