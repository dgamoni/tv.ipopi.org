(function($) {
	"use strict";
    $(document).ready(function() { 
	
		$("#menu .trigger").click(function() {
			$("body").toggleClass("active-menu")
		});
	
		$(".about-trigger").click(function() {
			$(this).addClass("active"),
			$("body").addClass("active")
		});
	
		$(".about-con .close").click(function() {
			$(".about-trigger").removeClass("active"),
			$("body").removeClass("active")
		});
	
		$("#embed_code_trigger").click(function() {
			$('#embed_code').slideToggle( 300, function() {
					$('#embed_code textarea').select();
			  });
			return false;
		});
	
		$('#embed_code textarea').click(function() {
			$(this).select();
		});
        
    });
    $(window).load(function() { 
		$('.bxslider').bxSlider({
			mode: 'vertical',
			slideMargin: 1,
			minSlides: 3,
			maxSlides: 3,
			slideWidth: 313,
			infiniteLoop: false,
			hideControlOnEnd: true,
			touchEnabled: false
	  	});
        
    });
})(jQuery);