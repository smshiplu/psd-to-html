$(document).ready(function(){

	/*DECLARATION*/
	var currentSecName = "";
	var vh = $(window).height();
	
	viewportHeight(vh);
	
	/*STICKY MENU AND SECTION SCROLL(WAYPOINTS)*/
	$('.waypoints').waypoint(function(direction){
		if ( direction == "down" ) {
			$('nav').addClass('sticky');			
		} else {
			$('nav').removeClass('sticky');		
		}
	});

	/*MENU AND SECTION ACTIVE CLASS*/
	$(window).on('scroll',function(){
		
		$('.down-arrow').css({
			"opacity": "0",
			"transition" : "1s"
		});
		
		clearTimeout($.data(this, 'scrollTimer'));
	    $.data(this, 'scrollTimer', setTimeout(function() {
	        // MOUSE STOPED
	        $('.down-arrow').css({
				"opacity": "1",
				"transition" : "1s"
			});
	        console.log("Haven't scrolled in 250ms!");
	    }, 250));

		$('section').each(function(){
		  
			if( $('#home').inView() ) {
		        currentSecName = "home";
		        $('.main-nav li').each(function(){
		        	$(this).removeClass('active');
		        	if( $(this).attr('class') == currentSecName ) {
		        		$(this).addClass('active');
		        	} 
		        });
	        }
		    
		    if( $('#about').inView() ) {
		        currentSecName = "about";
		        $('.main-nav li').each(function(){
		        	$(this).removeClass('active');
		        	if( $(this).attr('class') == currentSecName ) {
		        		$(this).addClass('active');
		        	} 
		        });	        
		    }

		    if( $('#team').inView() ) {
		        currentSecName = "team";
		        $('.main-nav li').each(function(){
		        	$(this).removeClass('active');
		        	if( $(this).attr('class') == currentSecName ) {
		        		$(this).addClass('active');
		        	} 
		        });	        
		    }
		    
		    if( $('#service').inView() ) {
		        currentSecName = "service";
		        $('.main-nav li').each(function(){
		        	$(this).removeClass('active');
		        	if( $(this).attr('class') == currentSecName ) {
		        		$(this).addClass('active');
		        	} 
		        });	        
		    }

		    if( $('#portfolio').inView() ) {
		        currentSecName = "portfolio";
		        $('.main-nav li').each(function(){
		        	$(this).removeClass('active');
		        	if( $(this).attr('class') == currentSecName ) {
		        		$(this).addClass('active');
		        	} 
		        });	        
		    }

		    if( $('#client').inView() ) {
		        currentSecName = "client";
		        $('.main-nav li').each(function(){
		        	$(this).removeClass('active');
		        	if( $(this).attr('class') == currentSecName ) {
		        		$(this).addClass('active');
		        	} 
		        });	        
		    }

		    if( $('#contact').inView() ) {
		        currentSecName = "contact";
		        $('.main-nav li').each(function(){
		        	$(this).removeClass('active');
		        	if( $(this).attr('class') == currentSecName ) {
		        		$(this).addClass('active');
		        	} 
		        });	        
		    }			
		});
	});

	/*MIXITUP PLUGIN (PORTFOLIO SECTION)*/
	var mixitUp = mixitup(".mixitup");

	/*OWL CAROUSEL(CLIENT SECTION)*/
	$(".testimonials").owlCarousel({
		loop:true,
	    margin:0,
	    nav:true,
	    dots:false,
	    responsive:{
	        0:{
	            items:1
	        },
	        600:{
	            items:1
	        },
	        1000:{
	            items:1
	        }
	    }
	});

	$(".client-logo").owlCarousel({
		loop:true,
		margin:30,
	    nav:false,
	    dots:true,
	    responsive:{
	        0:{
	            items:1
	        },
	        600:{
	            items:3
	        },
	        1000:{
	            items:4
	        }
	    }
	});
	

}); /*document.ready*/

/*CHANGE HEADER DOWN ARROW BOTTOM*/
function viewportHeight(vh){
	if( vh > 700 ) {
		document.getElementsByClassName("down-arrow")[0].style.bottom = "5%";
	}

	if( vh > 800 ) {
		document.getElementsByClassName("down-arrow")[0].style.bottom = "10%";
	}

	if( vh > 900 ) {
		document.getElementsByClassName("down-arrow")[0].style.bottom = "20%";
	}
}

$.fn.inView = function(){
 	if(!this.length) 
        return false;
    
    var elementTop = this.offset().top  + 100;
    var elementBottom = elementTop + this.outerHeight();

    var viewportTop = $(window).scrollTop() ;
    var viewportBottom = viewportTop + $(window).height();

    return elementBottom > viewportTop && elementTop < viewportBottom;
};

function openNav() {
	document.getElementById("mobileNav").style.width = "100%";
}

function closeNav() {
	document.getElementById("mobileNav").style.width = "0%";
}