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


$(window).load(function() {
});


$(document).ready(function() {

	$(window).scroll(function(event) {  

    	CELYN.disableHover();

	});

	CELYN.smoothScroll();
	CELYN.imageLoad();
	CELYN.pageTransition();
});



